// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // 👈 cookie HttpOnly
    if (!token) return res.status(401).json({ message: "No autorizado" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    (req).user = decoded; // guardamos el usuario en el request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
