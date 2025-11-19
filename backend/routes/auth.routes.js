import {
  login,
  register,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;
