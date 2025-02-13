import path from "node:path";
import type { Request } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `task-${timestamp}-${uniqueId}${extension}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});
