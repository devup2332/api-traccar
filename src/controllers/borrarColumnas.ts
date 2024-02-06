import { Request, Response } from "express";
import connect from "../config/database";

export const BORRAR_COLUMNAS = async (Request: Request, Response: Response) => {
  const conn = await connect();
  const [response] = await conn.query(
    "UPDATE paraderos_info SET hora_llegada = NULL, estado = NULL, diferencia_horas = NULL",
  );
  return Response.json({
    status: 200,
    paraderos: response,
  });
};
