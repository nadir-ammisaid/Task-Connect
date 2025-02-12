import type { RequestHandler } from "express";

// Import access to data
import taskRepository from "./taskRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
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

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image || null,
      status: "open" as const,
      customer_id: 1, // Temporary
      category_id: 1, // Temporary
    };

    // Create the item
    const insertId = await taskRepository.create(newTask);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
