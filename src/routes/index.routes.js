import express from "express";
import { changePP, getCurrentPP } from "../controllers/ppController.js";

const router = express.Router();

router.get("/change", changePP);
router.get("/current",getCurrentPP)
export default router;
