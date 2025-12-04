import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import __dirname from "../dirname.js";
import fs from "fs";

class productsController {
  async add(req, res) {
    try {
      const { name, category_id, description, price } = req.body;
      const { photo_path } = req.files;

      if (!photo_path) {
        return res.status(400).json("Файл не был загружен");
      }

      let fileName = uuidv4() + ".jpg";
      await photo_path.mv(path.join(__dirname, "static", fileName));
      const [result] = await db.execute(
        "INSERT INTO products (name, category_id, description, photo_path, price) VALUES (?, ?, ?, ?, ?)",
        [name, category_id, description, fileName, price]
      );

      return res.status(201).json("Товар добавлен");
    } catch (err) {
      return res.status(500).json("Ошибка при добавлении товаров");
    }
  }
  async getAll(req, res) {
  try {
      
    let { category_id, minPrice, maxPrice, search } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    let params = [];

    if (category_id) {
      query += " AND category_id = ?";
      params.push(category_id);
    }
    if (minPrice) {
      query += " AND price >= ?";
      params.push(minPrice);
    }
    if (maxPrice) {
      query += " AND price <= ?";
      params.push(maxPrice);
    }

     if (search) {
      query += " AND name LIKE ?";
      params.push(`%${search}%`);
    }
    
    const [result] = await db.execute(query, params);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Ошибка при получении товаров");
  }
}
      
      
   
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.execute("SELECT * FROM products WHERE id = ?", [
        id,
      ]);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("Ошибка при получении товара");
    }
  }
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { name, category_id, description, price } = req.body;
      let fileName;
      if (req.files && req.files.photo_path) {
        // Если новое фото загружено
        const { photo_path } = req.files;
        fileName = uuidv4() + ".jpg";
        await photo_path.mv(path.join(__dirname, "static", fileName));
        await db.execute(
          "UPDATE products SET name = ?, category_id = ?, description = ?, photo_path = ?, price = ? WHERE id = ?",
          [name, category_id, description, fileName, price, id]
        );
      } else {
        // Если фото не менялось
        await db.execute(
          "UPDATE products SET name = ?, category_id = ?, description = ?, price = ? WHERE id = ?",
          [name, category_id, description, price, id]
        );
      }
      return res.status(200).json("Товар успешно обновлён");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Ошибка при обновлении товара");
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      // 1. Получаем имя файла изображения
    const [rows] = await db.execute("SELECT photo_path FROM products WHERE id = ?", [id]);
    if (rows.length > 0) {
      const fileName = rows[0].photo_path;
      const filePath = path.join(__dirname, "static", fileName);

      // 2. Удаляем файл, если он существует
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 3. Удаляем запись из базы
      await db.execute("DELETE FROM products WHERE id = ?", [id]);
      return res.status(200).json("Товар успешно удалён");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Ошибка при удалении товара");
    }
  }
}

export default new productsController();
