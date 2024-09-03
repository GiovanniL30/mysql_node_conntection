import connection from "../connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;

function generateToken(userid) {
  if (!process.env.TOKEN_KEY) {
    throw new Error("TOKEN_KEY environment variable is not defined");
  }
  return jwt.sign({ userid }, process.env.TOKEN_KEY, { expiresIn: "1h" });
}

export const loginController = (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  connection.query(query, [userName], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Username does not exist" });
    }

    const user = results[0];
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    console.log(user.userId);
    const token = generateToken(user.userId);
    const { password, ...userInfo } = user;

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json(userInfo);
  });
};

export const registerController = (req, res) => {
  const { firstName, lastName, password, userName } = req.body;

  if (!firstName || !lastName || !password || !userName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  connection.query(
    "SELECT COUNT(*) as userCount FROM users WHERE userName = ?",
    [userName],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result[0].userCount > 0) {
        return res.status(409).json({ message: "Username already exists" });
      }

      bcrypt.hash(password, saltRounds, (err, hashPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res
            .status(500)
            .json({ message: "Error creating new account" });
        }

        connection.query(
          "SELECT COUNT(*) as userCount FROM users",
          (err, result) => {
            if (err) {
              console.error("Error retrieving user count:", err);
              return res
                .status(500)
                .json({ message: "Error creating new account" });
            }

            const newId = result[0].userCount + 1;

            const insertQuery =
              "INSERT INTO users (userId, firstName, lastName, password, userName) VALUES (?, ?, ?, ?, ?)";
            connection.query(
              insertQuery,
              [newId, firstName, lastName, hashPassword, userName],
              (err) => {
                if (err) {
                  console.error("Error inserting new user:", err);
                  return res
                    .status(500)
                    .json({ message: "Error creating new account" });
                }

                res.status(201).json({
                  message: "User created successfully",
                  userId: newId,
                });
              }
            );
          }
        );
      });
    }
  );
};
