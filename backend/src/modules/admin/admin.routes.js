import { Router } from "express";
import { listUsers } from "./admin.controller.js";
import { adminProtect, protect } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/users", protect, adminProtect, listUsers);

export default router;