import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api");

app.listen(PORT, () => {
  console.log("Server started on port ok 3000");
});
