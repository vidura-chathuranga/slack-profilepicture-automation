import express from "express";
import { WebClient } from "@slack/web-api";

import "dotenv/config";
import setPFP from "./api/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", () => {
  console.log("welcome to Slack profile picture changer");
});

app.get("/api", async (req, res) => {
  await setPFP();
  res.send("Started changing your PFP!");
});

app.get("*", (req, res) => {
  console.log("No URL found");
});

app.listen(PORT, () => {
  console.log(`Server and run on port ${PORT}`);
});
