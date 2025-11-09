const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'booking_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function resetDatabase() {
  const pool = new Pool(poolConfig);

  try {
    console.log('Resetting Database\n');

    console.log('1. Clearing existing data');
    await pool.query('TRUNCATE TABLE bookings RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');
    console.log('Data cleared successfully\n');

    console.log('2. Adding test data');
    const testDataSql = fs.readFileSync(path.join(__dirname, 'test-data.sql'), 'utf8');
    const statements = testDataSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s.length > 0);
    
    for (const statement of statements) {
      if (statement) {
        await pool.query(statement);
      }
    }
    
    console.log('Test data added successfully\n');

    await pool.end();

    console.log('Database reset completed');
    console.log('\nYou can now run tests with: quick-test.bat');
  } catch (error) {
    console.error('\nReset failed');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. PostgreSQL is running');
    console.error('2. Database credentials in .env file are correct');
    process.exit(1);
  }
}

resetDatabase();
