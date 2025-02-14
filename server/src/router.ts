import express from "express";
import { upload } from "./config/multerConfig";
import { authenticateUser } from "./modules/auth/authMiddleware";
import authActions from "./modules/auth/authActions";
import categoryActions from "./modules/category/categoryActions";
import taskActions from "./modules/task/taskActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
router.post("/api/login", authActions.login);
router.post("/api/signup", authActions.signup);

router.get("/api/tasks", taskActions.browse);
router.get("/api/tasks/:id", taskActions.read);
router.post(
  "/api/tasks",
  authenticateUser,
  upload.single("image"),
  taskActions.add,
);

router.get("/api/categories", categoryActions.browse);

/* ************************************************************************* */

export default router;
