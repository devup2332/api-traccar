import { Request, Response } from "express";
import connect from "../config/database";
import moment, { Moment } from "moment";

export const GENERAR_PARADEROS_CONTROLLER = async (
  Request: Request,
  Response: Response,
) => {
  const conn = await connect();

  console.log(`====> FETCHING EVENTS AND ZONES`);
  const [eventos] = await conn.query(`
    SELECT * FROM tc_events WHERE type = "geofenceEnter"
`);

  const [paraderos] = await conn.query(`
    SELECT * FROM paraderos_info
`);
  // console.log({ paraderos, eventos });
  const newZones: string[] = [];
  for (const e of eventos as any) {
    const { eventtime, geofenceid, id } = e;
    // console.log({ eventtime });
    const idMax = Math.max(
      ...(eventos as any)
        .filter((e: any) => e.geofenceid === geofenceid)
        .map((e: any) => e.id),
    );
    if (geofenceid === 8) {
      if (idMax < id) continue;
      const initalDate = moment(eventtime)
        .subtract(5, "hours")
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      console.log(`====> WRITING IN paraderos_info FIRST COLUMN`);
      await conn.query(
        `UPDATE paraderos_info SET hora_estimada = ?,hora_llegada = ? WHERE id=? `,
        [initalDate, initalDate, geofenceid],
      );
      let index = 0;
      let backup = "";
      for (const p of paraderos as any) {
        const { id } = p;
        let m: Moment | null = null;
        if (index === 0) {
          m = moment(eventtime)
            .add((paraderos as any)[index + 1]?.intervalo || 0, "minutes")
            .subtract(5, "hours");
        } else {
          m = moment(backup)
            .add((paraderos as any)[index + 1]?.intervalo || 0, "minutes")
            .subtract(5, "hours");
        }

        const d = m?.toISOString().slice(0, 19).replace("T", " ")!;
        backup = d;
        newZones.push(d);

        console.log(`====> WRITING IN paraderos_info geofenceid = 8`);
        await conn.query(
          `UPDATE paraderos_info SET hora_estimada = "${d}" WHERE id=${id + 1} `,
        );

        index++;
      }
    } else {
      const idMax = Math.max(
        ...(eventos as any)
          .filter((e: any) => e.geofenceid === 8)
          .map((e: any) => e.id),
      );
      if (idMax > id) continue;
      const d = moment(eventtime)
        .subtract(5, "hours")
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
      // console.log({ eventtime, newZones });
      const d1 = new Date(eventtime).getTime();
      const d2 = new Date(
        moment(newZones[geofenceid - 9]).toISOString(),
      ).getTime();
      const result = Math.round((d1 - d2) / 1000 / 60);
      let status: any = "";
      if (result <= 0) status = "a tiempo";
      if (result > 0 && result < 20) status = "tarde";
      if (status === null) continue;

      console.log(
        `====> WRITING IN paraderos_info geofenceid = ${geofenceid} | ${result} | ${status} | ${d1} - ${d2}`,
      );
      await conn.query(
        `UPDATE paraderos_info SET hora_llegada = ?,estado = ?,diferencia_horas = ? WHERE id=? `,
        [d, status, result / 60, geofenceid],
      );
    }
  }
  console.log(`====> REFETCHING DATABASE DATA`);

  const newInfo = await conn.query(`
    SELECT * FROM paraderos_info
`);
  const res = (newInfo as any).filter((n: any) => n.estado);
  return Response.json({
    message: "Ok",
    data: res[res.length - 1] || [],
    newInfo,
  });
};
