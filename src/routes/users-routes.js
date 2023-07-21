import { Router } from "express";
import { getUsers, addUser, getUser, updateUser } from "../controllers/users-controllers";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;