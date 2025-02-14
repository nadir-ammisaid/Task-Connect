import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { database } from "../../database";

const authActions = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const [users] = await database.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
      );

      const user = users[0];

      if (!user || !(await argon2.verify(user.password, password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.APP_SECRET as string,
        { expiresIn: "7d" },
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async signup(req: Request, res: Response) {
    const { firstname, lastname, email, password, role } = req.body;

    try {
      // Vérifier si l'email existe déjà
      const [existingUsers] = await database.query(
        "SELECT id FROM user WHERE email = ?",
        [email],
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hasher le mot de passe
      const hashedPassword = await argon2.hash(password);

      // Insérer le nouvel utilisateur
      const [result] = await database.query(
        `INSERT INTO user (firstname, lastname, email, password, role)
         VALUES (?, ?, ?, ?, ?)`,
        [firstname, lastname, email, hashedPassword, role],
      );

      // Créer l'entrée correspondante dans la table customer/tasker selon le rôle
      const userId = result.insertId;
      if (role === "customer" || role === "both") {
        await database.query("INSERT INTO customer (user_id) VALUES (?)", [
          userId,
        ]);
      }
      if (role === "tasker" || role === "both") {
        await database.query("INSERT INTO tasker (user_id) VALUES (?)", [
          userId,
        ]);
      }

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authActions;
