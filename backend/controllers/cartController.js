import db from "../db.js";

class cartController {
    async addProduct(req, res) {
        try {
            const user_id = req.user.id;
            const {product_id, price, } = req.body;
            const [existing]= await db.execute(
                "SELECT  * FROM cart WHERE user_id = ? AND product_id = ?",
                [user_id, product_id]
            )
            if (existing.length > 0) {
                await db.execute(
                    "UPDATE cart SET price = price + ?, quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
                    [price, user_id, product_id]
                )
            }
            else {
                const [result] = await db.execute(
                    "INSERT INTO cart (user_id, product_id, price) VALUES (?, ?, ?)",
                    [user_id, product_id, price]
                )
            }
            return res.status(201).json("Продукт добавлен в корзину");
        } catch (error) {
            console.log(error);
            return res.status(500).json("Ошибка при добавлении продукта в корзину");
        }
    }
    async deleteProduct(req, res){
        try {
            const user_id = req.user.id;
            const { product_id, price } = req.body;
            const [quantityMoreThanOne] = await db.execute(
                "SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND quantity > 1", 
                [user_id, product_id]
            )
            if (quantityMoreThanOne.length > 0) {
                await db.execute(
                    "UPDATE cart SET quantity = quantity - 1, price = price - ? WHERE user_id = ? AND product_id = ?",
                    [price, user_id, product_id]
                )
            } else {
                await db.execute(
                    "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
                    [user_id, product_id]
                )
            }
            return res.status(200).json("Продукт удалён из корзины");
        } catch (error) {
            console.log(error);
            return res.status(500).json("Ошибка при удалении продукта из корзины");
        }
    }
    async updateProduct(req, res){
        try {
            const user_id = req.user.id;
            const {product_id, quantity} = req.body;
            const [result] = await db.execute(
                "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
                [quantity, user_id, product_id]
            )
            return res.status(200).json("Продукт обновлен в корзине");
        } catch (error) {
            console.log(error);
            return res.status(500).json("Ошибка при обновлении продукта в корзине");
        }
    }
    async getCart(req, res){
        try {
            const user_id = req.user.id;
            const [result] = await db.execute(
                "SELECT * FROM cart WHERE user_id = ?",
                [user_id]
            )
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json("Ошибка при получении корзины");
        }
    }
}

export default new cartController();