import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Функция для повторных попыток подключения (retry)
async function connectWithRetry(config, maxRetries = 10, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connection = await mysql.createConnection(config);
      return connection;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Попытка подключения к MySQL ${i + 1}/${maxRetries}...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Подключение с повторными попытками
const tempConnection = await connectWithRetry({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  charset: 'utf8mb4', // Устанавливаем правильную кодировку для кириллицы
});

await tempConnection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`
);
await tempConnection.end();

const db = await connectWithRetry({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4', // Устанавливаем правильную кодировку для кириллицы
});

console.log("✅ Подключение к базе данных установлено!");

export default db;
