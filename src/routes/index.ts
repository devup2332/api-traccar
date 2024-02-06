import { Router } from "express";
import { GENERAR_PARADEROS_CONTROLLER } from "../controllers/generarParaderos.controller";

const router = Router();

router.get("/generarParaderos", GENERAR_PARADEROS_CONTROLLER);
router.get("/paraderos", GENERAR_PARADEROS_CONTROLLER);

export default router;
