import {
  login,
  register,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import validateToken from "../middlewares/validate-token.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", validateToken, getMe);
router.post("/logout", logout);

export default router;
