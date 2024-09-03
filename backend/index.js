import express from "express";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { authenticateCookie } from "./middleware/authenticateCookie.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", authRoute);

app.get("/products", authenticateCookie, (req, res) => {
  res.status(200).json({ ...req.user });
});

const PORT = process.env.PORT || 1099;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
