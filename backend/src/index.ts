import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api") 

app.listen(3000, () => {
  console.log("Server started on port ok 3000");
});
