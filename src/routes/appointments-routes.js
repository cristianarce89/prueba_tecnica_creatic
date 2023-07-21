import { Router } from "express";
import { getAppointments , addAppointments } from "../controllers/appointments-crontrollers";

const router = Router();

router.get("/", getAppointments);
router.post("/", addAppointments);

export default router;