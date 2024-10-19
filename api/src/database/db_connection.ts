import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import fs from "fs";
import path from "path";

const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "p3",
  multipleStatements: true
});

async function setup_db(): Promise<void> {
  try {
    const generatedScript = fs.readFileSync(path.join(__dirname, '..', '..', 'src/database/queries.sql')).toString();
    
    await pool.query(generatedScript);

    console.log("Successfully connected to MySQL.");
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default setup_db;
export { pool };
