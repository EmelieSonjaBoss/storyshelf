/**
 * @module middleware/authMiddleware
 * @description Middleware functions to protect routes using JSON Web Tokens (JWT).
 */

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Extend the Request interface to include `user`.
 */
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

/**
 * Middleware to verify a JWT token stored in cookies.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};


/**
 * Middleware to allow only admin users.
 * Requires a valid token and that `is_admin` is true.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
export const verifyAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    res.status(401).json({ message: "Access denied." });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    if (!decoded.is_admin) {
      res.status(403).json({ message: "Admin access required." });
      return;
    }

    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token." });
  }
};