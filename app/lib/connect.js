import mysql from 'mysql2/promise';

import { config } from 'dotenv'

config()

// Function to create a new database connection
export async function getConnection() {
  // console.log("DB connected...")
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}

// Function to execute a query
export async function query(sql, params = []) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  await connection.end(); // Close the connection after query execution
  return results;
}
