import {
  getUsers,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
