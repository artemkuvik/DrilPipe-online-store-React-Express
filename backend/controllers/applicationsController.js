import db from "../db.js";

class applicationsController {
  async add(req, res) {
    try {
      const user_id = req.user.id;
      const { service_id, date, status, issue } = req.body;
      
      const [result] = await db.execute(
        "INSERT INTO applications (user_id, service_id, date, status, issue) VALUES (?, ?, ?, ?, ?)",
        [user_id, service_id, date, status, issue]
      );
      return res.status(201).json("Заявка добавлена");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Ошибка при добавлении заявки");
    }
  }
  async getAll(req, res) {
    try {
      const [result] = await db.execute(
        "SELECT applications.*, users.email, services.name AS service_name FROM applications JOIN users ON applications.user_id = users.id JOIN services ON applications.service_id = services.id");
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Ошибка при получении заявок");
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const [result] = await db.execute(
        "UPDATE applications SET status = ? WHERE id = ?",
        [status, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json("Заявка не найдена");
      }
      return res.status(200).json("Статус обновлен успешно");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Ошибка при обновлении статуса");
    }
  }
}

export default new applicationsController();