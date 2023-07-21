import { Router } from "express";
import { getAppointments , addAppointments, getAppointment, getAppointmentAvailable } from "../controllers/appointments-crontrollers";

const router = Router();

router.get("/", getAppointments);
router.post("/", addAppointments);
router.post("/:id", getAppointment);
router.post("/:id/book", getAppointmentAvailable);

export default router;