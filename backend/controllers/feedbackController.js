import db from "../db.js";

class feedbackController {
  async add(req, res) {
    try {
      const user_id = req.user.id;
      const { feedback_text, feedback_date } = req.body;

      const [result] = await db.execute(
        "INSERT INTO feedback (user_id, feedback_text, feedback_date) VALUES (?, ?, ?)",
        [user_id, feedback_text, feedback_date]
      );

      return res.status(201).json("Заявка отправлена успешно");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Ошибка при отправке обращения");
    }
  }

  async getAll(req, res) {
    try {
      const [result] = await db.execute(
        "SELECT feedback.*, users.email FROM feedback JOIN users ON feedback.user_id = users.id"
      );
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Не удалось получить обращения");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.execute(
        "DELETE FROM feedback WHERE id = ?",
        [id]
      );
      
      return res.status(200).json("Обращение удалено успешно");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Не удалось удалить обращение");
    }
  }
}

export default new feedbackController();
