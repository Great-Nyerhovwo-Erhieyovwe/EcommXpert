import { error } from 'console';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Missing token" });

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded user to request
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};