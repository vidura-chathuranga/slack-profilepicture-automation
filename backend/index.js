import express from "express";
import indexRoutes from "./src/routes/index.routes.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  console.log(`${req.method} ===> ${req.url}`);
  next();
});

app.use("/api", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server and run on port ${PORT}`);
});
