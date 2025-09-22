import express from 'express';
import fetch from 'node-fetch'; // o global fetch en Node 18+
import jwt from 'jsonwebtoken';
import { pool } from '../config/databaseConfig.js';
import { config } from 'dotenv';
config();

const auth = express.Router();

// Login con google
auth.post('/google', async (req, res) => {
  const { code } = req.body; // ahora recibimos el code del frontend
  console.log(code);

  if (!code) return res.status(400).json({ message: 'Code es requerido' });

  try {
    // 1. Intercambiar code por tokens con Google
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const tokens = await tokenRes.json();
    /* console.log(tokens); */

    if (tokens.error) {
      return res.status(400).json({ message: tokens.error_description || 'Error intercambiando code' });
    }

    // tokens: access_token, expires_in, refresh_token, scope, token_type, id_token
    const { id_token, refresh_token, access_token } = tokens;

    // 2. Decodificar id_token para obtener info del usuario
    const base64Payload = id_token.split('.')[1];
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
    const { sub: google_id, email, name, picture } = payload;

    // 3. Guardar/actualizar usuario en DB
    const user = await pool.query(
      `INSERT INTO users (google_id, name, email, picture, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (google_id) DO UPDATE
       SET name = $2, email = $3, picture = $4
       RETURNING *`,
      [google_id, name, email, picture]
    );

    // 4. Guardar refresh_token en DB si viene (solo la primera vez)
    if (refresh_token) {
      await pool.query(
        `UPDATE users SET refresh_token = $1 WHERE google_id = $2`,
        [refresh_token, google_id]
      );
    }

    // 5. Crear JWT interno
    const tokenJWT = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 6. Enviar JWT al frontend
    res.cookie("jwt", tokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });
    res.json({ user: user.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error autenticando con Google' });
  }
});

// Refresh del token
auth.post("/refresh", async (req, res) => {
  try {
    const { jwt: oldJwt } = req.cookies;
    if (!oldJwt) return res.status(401).json({ message: "No hay token" });

    let payload;
    try {
      payload = jwt.verify(oldJwt, process.env.JWT_SECRET, { ignoreExpiration: true });
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userRes = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [payload.id]
    );
    if (userRes.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    let refreshToken = userRes.rows[0].refresh_token;

    // Opcional: renovar info con Google usando el refresh_token guardado en DB
    // Aquí podrías pedir nuevo id_token con el refresh_token de Google.

    // Generar nuevo JWT interno
    const newJwt = jwt.sign(
      { id: userRes.rows[0].id, email: userRes.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", newJwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ user: userRes.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en refresh" });
  }
});


export default auth;
