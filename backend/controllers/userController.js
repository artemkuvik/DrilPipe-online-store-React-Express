import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  // Функция для создания JWT токена
  createToken = (user) => {
    return jwt.sign(
      { id: user.id, name: user.name, email: user.email, admin: user.admin },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
  };

  registration = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json("Все поля обязательны для заполнения.");
    }

    // Проверка на существование пользователя с таким email
    const [userFromDb] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (userFromDb.length > 0) {
      return res.status(400).json("Пользователь с таким email уже существует.");
    }

    // Хеширование пароля
    const hashPassword = await bcrypt.hash(password, 5);

    // Вставка нового пользователя в базу данных
    const [user] = await db.execute(
      `INSERT INTO users(name, email, password, admin) VALUES (?, ?, ?, ?)`,
      [name, email, hashPassword, 0]
    );

    const userId = user.insertId;

    // Получаем информацию о созданном пользователе
    const [newUser] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);


    // Создание JWT токена с правильными данными
    const token = this.createToken(newUser[0]);

    return res.json({ token });
  };

  authorization = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Все поля обязательны для заполнения.");
    }

    // Проверка существования пользователя
    const [userFromDb] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (userFromDb.length === 0) {
      return res.status(400).json("Пользователь не найден.");
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(
      password,
      userFromDb[0].password
    );

    if (!isPasswordValid) {
      return res.status(400).json("Неверный пароль.");
    }

    const token = this.createToken(userFromDb[0]);

    return res.json({ token });
  };

  check = async (req, res, next) => {
    const token = this.createToken(req.user);
    return res.json({ token });
  };
}


export default new UserController();
