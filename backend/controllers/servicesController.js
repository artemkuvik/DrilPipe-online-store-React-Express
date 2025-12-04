import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import __dirname from "../dirname.js";
import fs from "fs";

class servicesController {
  async add(req, res, next) {
    try {
      const { name, description, cost } = req.body;
      const { photo } = req.files;

      if (!photo) {
        return res.status(400).json("Файл не был загружен");
      }

      let fileName = uuidv4() + ".jpg";
      await photo.mv(path.join(__dirname, "static", fileName));
      const [result] = await db.execute(
        "INSERT INTO services (name, description, photo, cost) VALUES (?, ?, ?, ?)",
        [name, description, fileName, cost]
      );

      return res.status(201).json("Услуга добавлена");
    } catch (err) {
      return res.status(500).json("Ошибка при добавлении услуги");
    }
  }
  async getAll(req, res) {
    try {
      const [results] = await db.execute("SELECT * FROM services");
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Ошибка при получении услуг");
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      
      // 1. Получаем имя файла изображения
    const [rows] = await db.execute("SELECT photo FROM services WHERE id = ?", [id]);
    if (rows.length > 0) {
      const fileName = rows[0].photo;
      const filePath = path.join(__dirname, "static", fileName);

      // 2. Удаляем файл, если он существует
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 3. Удаляем запись из базы
      await db.execute("DELETE FROM services WHERE id = ?", [id]);
      return res.status(200).json("Услуга успешно удалёна");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Ошибка при удалении услуги");
    }
  }
  async edit(req, res) {
     try {
      const { id } = req.params;
      const { name, description, cost } = req.body;
      let fileName;
      if (req.files && req.files.photo_path) {
        // Если новое фото загружено
        const { photo_path } = req.files;
        fileName = uuidv4() + ".jpg";
        await photo_path.mv(path.join(__dirname, "static", fileName));
        await db.execute(
          "UPDATE services SET name = ?, description = ?, photo = ?, cost = ? WHERE id = ?",
          [name, description, fileName, cost, id]
        );
      } else {
        // Если фото не менялось
        await db.execute(
          "UPDATE services SET name = ?, description = ?, cost = ? WHERE id = ?",
          [name, description, cost, id]
        );
      }
      return res.status(200).json("Услуга успешно обновлена");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Ошибка при обновлении услуги");
    }
  
  }
}

export default new servicesController();
