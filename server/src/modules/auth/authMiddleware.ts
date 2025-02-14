import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface User {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      role: string;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
