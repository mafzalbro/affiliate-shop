import mysql from 'mysql2/promise';

// Function to create a new database connection
export async function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'affiliate_shop',
  });
}

// Function to execute a query
export async function query(sql, params = []) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  await connection.end(); // Close the connection after query execution
  return results;
}
