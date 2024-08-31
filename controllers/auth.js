import connection from "./connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function generateToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: "1h" });
}

export const loginController = (req, res, next) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Username does not exist" });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(username);
    const { password, ...userInfo } = user;

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json(userInfo);
  });
};

export const registerController = (req, res, next) => {
  // Implement registration logic here
};
