import { Router } from "express";
import { GENERAR_PARADEROS_CONTROLLER } from "../controllers/generarParaderos.controller";
import { GET_PARADEROS } from "../controllers/getParaderos";

const router = Router();

router.get("/generarParaderos", GENERAR_PARADEROS_CONTROLLER);
router.get("/paraderos", GET_PARADEROS);

export default router;
