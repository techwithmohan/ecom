import mysql from 'mysql2/promise';

let pool;

export const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

export const query = async (sql, params) => {
  const db = await getConnection();
  const [results] = await db.execute(sql, params);
  return results;
};
