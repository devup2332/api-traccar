import { Request, Response } from "express";

export const LOGIN_USER = async (Request: Request, Response: Response) => {
  return Response.json({
    message: "User Logged",
    status: 200,
    token: "dsadas",
  });
};
