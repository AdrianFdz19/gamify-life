// auth/userController.js
import { pool } from "../config/databaseConfig.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // viene del middleware
    const userRes = await pool.query(
      `SELECT id, name, email, picture, google_id, refresh_token, level, xp, created_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ user: userRes.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo perfil de usuario" });
  }
};
