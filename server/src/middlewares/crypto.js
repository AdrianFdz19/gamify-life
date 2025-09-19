import crypto from 'crypto';
import { config } from 'dotenv';
config();

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.REFRESH_TOKEN_KEY, 'utf-8'); // 32 bytes

export function encryptToken(token) {
  const iv = crypto.randomBytes(16); // vector de inicialización aleatorio
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  // guardamos IV junto con el token cifrado
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptToken(encryptedToken) {
  const [ivHex, encrypted] = encryptedToken.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
