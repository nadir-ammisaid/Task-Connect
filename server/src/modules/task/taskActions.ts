import type { RequestHandler } from "express";
import type { MulterRequest } from "../../types/multer";

// Import access to data
import taskRepository from "./taskRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tasks
    const tasks = await taskRepository.readAll();

    // Respond with the items in JSON format
    res.json(tasks);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const taskId = Number(req.params.id);
    const task = await taskRepository.read(taskId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const task = {
      id: Number(req.params.id),
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      category_id: Number(req.body.category_id),
    };

    const affectedRows = await taskRepository.update(task);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const multerReq = req as MulterRequest;
    const imagePath = multerReq.file
      ? `/uploads/${multerReq.file.filename}`
      : null;

    // Extract the task data from the request body
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      image: imagePath,
      status: "open" as const,
      customer_id: 1, // Temporaire : sera remplacé par req.user.id après mise en place de l'authentification
      category_id: req.body.category_id,
    };

    // Create the task
    const insertId = await taskRepository.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted task
    res.status(201).json({ insertId, imagePath });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const affectedRows = await taskRepository.delete(taskId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
