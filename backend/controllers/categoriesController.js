import db from "../db.js";

class categoriesController {
    async getAll(req, res) {
        try {
            const [results] = await db.execute("SELECT * FROM categories");
            return res.status(200).json(results);
        } catch (err) {
            return res.status(500).json("Ошибка при получении категорий");
        }
    }
}

export default new categoriesController();