import { Request, Response } from "express";
import connect from "../config/database";

export const GET_PARADEROS = async (Request: Request, Response: Response) => {
  const conn = await connect();
  const [response] = await conn.query("SELECT * FROM paraderos_info");
  return Response.json({
    status: 200,
    paraderos: response,
  });
};
