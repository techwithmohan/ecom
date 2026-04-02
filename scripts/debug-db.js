const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function debug() {
  console.log('--- DB Debugger ---');
  console.log('Current Config from .env.local:');
  console.log(`- Host: ${process.env.MYSQL_HOST}`);
  console.log(`- Port: ${process.env.MYSQL_PORT}`);
  console.log(`- User: ${process.env.MYSQL_USER}`);
  console.log(`- Database: ${process.env.MYSQL_DATABASE}`);
  console.log(`- Password: ${process.env.MYSQL_PASSWORD ? '********' : '(empty)'}`);

  console.log('\n--- Attempting Connection ---');
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });
    console.log('✅ Connection to server SUCCESSFUL!');
    
    try {
      await connection.changeUser({ database: process.env.MYSQL_DATABASE });
      console.log(`✅ Connection to database "${process.env.MYSQL_DATABASE}" SUCCESSFUL!`);
    } catch (dbError) {
      console.log(`❌ FAILED to select database "${process.env.MYSQL_DATABASE}".`);
      console.log(`Error: ${dbError.message}`);
    }
    
    await connection.end();
  } catch (error) {
    console.log('❌ CONNECTION FAILED!');
    console.log(JSON.stringify(error, null, 2));
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\nTip: MySQL is not responding on this address/port. If local, check XAMPP. If remote, check Host/Port and Whitelist your IP.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\nTip: User/Password is wrong.');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\nTip: The hostname could not be found. Check if the Host is correct.');
    }
  }
}

debug();
