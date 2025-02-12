import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import categoryActions from "./modules/category/categoryActions";
// Define item-related routes
import taskActions from "./modules/task/taskActions";

router.get("/api/tasks", taskActions.browse);
router.get("/api/tasks/:id", taskActions.read);
router.post("/api/tasks", taskActions.add);

router.get("/api/categories", categoryActions.browse);

/* ************************************************************************* */

export default router;
