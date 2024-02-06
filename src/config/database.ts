import mysql from "mysql2/promise";
import { environments } from "./environment";

const pool = mysql.createConnection({
  host: environments.DB_HOST,
  password: environments.DB_PASSWORD,
  port: environments.DB_PORT,
  database: environments.DB_DATABASE,
  user: environments.DB_USER,
  timezone: "UTC-5"
});

const connect = async () => {
  return await pool;
};

export default connect;
