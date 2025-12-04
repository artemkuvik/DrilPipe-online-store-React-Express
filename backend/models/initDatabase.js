import db from "../db.js";

async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL, 
      admin TINYINT(1) 
    )`;
  await db.query(query);
}

async function createOrdersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
      user_id INT(11),
      order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_price  DECIMAL(10, 2),
      status VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'В обработке',
      delivery_address VARCHAR(522) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;
  await db.query(query);
}

async function createCategoriesTable() {
  const createQuery = `
  CREATE TABLE IF NOT EXISTS categories (
    id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    category_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )`;

  // Создаем таблицу
  await db.query(createQuery);

  const insertQuery = `
   INSERT IGNORE INTO categories (id, category_name) VALUES
  (1, 'Бурильные трубы'),
  (2, 'Долота'),
  (3, 'Пластины');`;

  await db.query(insertQuery);
}

async function createProductsTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS products (
    id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    category_id INT(11),
    description VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    photo_path VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  )`;
  await db.query(query);
}

async function createServicesTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS services (
  id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  photo VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  cost DECIMAL(10,2) NOT NULL
  )`;
  await db.query(query);
}

async function createOrdesDetailsTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS order_details (
  id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  order_id INT(11),
  product_id INT(11),
  quantity INT(11),
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )`;
  await db.query(query);
}

async function createFeedbackTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS feedback (
  id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  user_id INT(11), 
  feedback_text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  feedback_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
  await db.query(query);
}

async function createCartTable() {
  const query = `
   CREATE TABLE IF NOT EXISTS cart (
   id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
   user_id INT(11),
   product_id INT(11),
   quantity INT(11) DEFAULT 1,
   price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)`;
  await db.query(query);
}

async function createApplications() {
  const query = `
  CREATE TABLE IF NOT EXISTS applications (
  id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, 
  user_id INT(11) NOT NULL,
  service_id INT(11) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  issue TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
  await db.query(query);
}

async function initDatabase() {
  try {
    await createUsersTable();
    await createOrdersTable();
    await createCategoriesTable();
    await createProductsTable();
    await createServicesTable();
    await createOrdesDetailsTable();
    await createFeedbackTable();
    await createCartTable();
    await createApplications();
  } catch (error) {
    console.error("Ошибка при создании таблиц:", error);
  }
}

export default initDatabase;
