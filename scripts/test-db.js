const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('--- Database Connection Test ---');
  console.log(`Connecting to ${process.env.MYSQL_HOST} as ${process.env.MYSQL_USER}...`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('✅ SUCCESS: Connected to MySQL database!');
    
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log(`✅ SUCCESS: Basic query executed. Solution: ${rows[0].solution}`);

    const [tables] = await connection.execute('SHOW TABLES');
    console.log('Found tables:', tables.map(t => Object.values(t)[0]).join(', ') || 'None');

    await connection.end();
  } catch (error) {
    console.error('❌ ERROR: Could not connect to the database.');
    console.error(`Message: ${error.message}`);
    console.error('\nTips:');
    console.log('1. Make sure your MySQL server is running.');
    console.log('2. Check that the credentials in .env.local are correct.');
    console.log(`3. Ensure the database "${process.env.MYSQL_DATABASE}" exists.`);
  }
}

testConnection();
