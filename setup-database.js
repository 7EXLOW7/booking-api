const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

const dbName = process.env.DB_NAME || 'booking_db';

async function setupDatabase() {
  const adminPool = new Pool(poolConfig);

  try {
    console.log('Database Setup\n');

    console.log('1. Creating database if not exists');
    try {
      await adminPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully\n`);
    } catch (err) {
      if (err.code === '42P04') {
        console.log(`Database "${dbName}" already exists\n`);
      } else {
        throw err;
      }
    }

    await adminPool.end();

    const dbPool = new Pool({
      ...poolConfig,
      database: dbName,
    });

    console.log('2. Creating tables');
    const setupSql = fs.readFileSync(path.join(__dirname, 'setup-database.sql'), 'utf8');
    await dbPool.query(setupSql);
    console.log('Tables created successfully\n');

    console.log('3. Adding test data');
    const testDataSql = fs.readFileSync(path.join(__dirname, 'test-data.sql'), 'utf8');
    await dbPool.query(testDataSql);
    console.log('Test data added successfully\n');

    await dbPool.end();

    console.log('Database setup completed');
    console.log('\nYou can now start the server with: npm run dev');
  } catch (error) {
    console.error('\nSetup failed');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database credentials in .env file are correct');
    console.error('3. User has permissions to create databases');
    process.exit(1);
  }
}

setupDatabase();
