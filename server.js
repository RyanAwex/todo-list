import express from "express";
import homeRoute from "./routes/home.js";
import { fileURLToPath } from "url";
import path from "path";

const { dirname } = path;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", homeRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
