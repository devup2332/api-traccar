import { Router } from "express";
import { GENERAR_PARADEROS_CONTROLLER } from "../controllers/generarParaderos.controller";
import { GET_PARADEROS } from "../controllers/getParaderos";
import { BORRAR_COLUMNAS } from "../controllers/borrarColumnas";

const router = Router();

router.get("/generarParaderos", GENERAR_PARADEROS_CONTROLLER);
router.get("/paraderos", GET_PARADEROS);
router.delete("/borrarDatos", BORRAR_COLUMNAS);

export default router;
