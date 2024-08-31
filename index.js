import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 1099;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
