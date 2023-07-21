import { Router } from "express";
import { getUsers, addUser, getUser } from "../controllers/users-controllers";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUser);

export default router;