import express from "express";
import { WebClient } from "@slack/web-api";

import "dotenv/config";
import setPFP from "./api/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", (req, res, next) => {
  console.log("welcome to Slack profile picture changer");
});

app.use("/api", async (req, res, next) => {
  await setPFP();
  res.send("Started changing your PFP!");
});

app.get("*", (req, res, next) => {
  console.log("No URL found");
});

app.listen(PORT, () => {
  console.log(`Server and run on port ${PORT}`);
});
