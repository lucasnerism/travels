import { Router } from "express";
import { getPassengers } from "../controllers/passengers.controller.js";

const router = Router();

router.get('/passengers/travels', getPassengers);

export default router;