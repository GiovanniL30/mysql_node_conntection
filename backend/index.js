import express from "express";
import authRoute from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authRoute);

const PORT = process.env.PORT || 1099;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
