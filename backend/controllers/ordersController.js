import db from "../db.js";

class ordersController {   
    async createOrder(req, res) {
        const { total_price, delivery_address, cart_items } = req.body;
        const user_id = req.user.id;
        
        try {
            await db.beginTransaction();
            
            const [result] = await db.execute(
                "INSERT INTO orders (user_id, order_date, total_price, status, delivery_address) VALUES (?, NOW(), ?, 'В обработке', ?)", 
                [user_id, total_price, delivery_address]
            );
            const order_id = result.insertId;

            for (const item of cart_items) {
                await db.execute(
                    "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                    [order_id, item.product_id, item.quantity, item.price]
                );
            }
            
            await db.execute('DELETE FROM cart WHERE user_id = ?', [user_id]);
            await db.commit();
            
            return res.status(200).json({ success: true, message: "Заказ оформлен успешно", order_id });
        } catch (err) {
            await db.rollback();
            console.error("Ошибка при оформлении заказа:", err);
            return res.status(500).json({ error: "Ошибка при оформлении заказа" });
        }
    }

    async getOrdersForAdmin(req, res) {
        try {
            const [orders] = await db.execute(
                `SELECT
                 orders.id, users.name as user_name, 
                 orders.order_date, 
                 orders.total_price, 
                 orders.status,
                 orders.delivery_address
                 FROM orders
                 JOIN users ON orders.user_id = users.id
                 ORDER BY orders.order_date DESC
                 `
            );

            for (let order of orders) {
                const [orderDetails] = await db.execute(
                    `SELECT
                        od.id,
                        p.name as product_name,
                        od.quantity,
                        od.price
                    FROM order_details od
                    JOIN products p ON od.product_id = p.id
                    WHERE od.order_id = ?`,
                    [order.id]
                );
               order.order_details  = orderDetails;
            }
            return res.status(200).json(orders);
        } catch (err) {
            console.error("Ошибка при получении заказов:", err);
            return res.status(500).json({ error: "Ошибка при получении заказов" });
        }
    }
    async updateOrderStatus(req, res) {
        try{
            const {id} = req.params;
            const {status} = req.body;
            const [result] = await db.execute(
                "UPDATE orders SET status = ? WHERE id = ?",
                [status, id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Заказ не найден" });
            }
            return res.status(200).json({ message: "Статус заказа обновлен успешно" });
        } catch (err) {
            console.error("Ошибка при обновлении статуса заказа:", err);
            return res.status(500).json({ error: "Ошибка при обновлении статуса заказа" });
        }
    }
    async getOrdersForUser(req, res) {
        try{
            const user_id = req.user.id;
            const [orders] = await db.execute(
                `SELECT
                 orders.id,
                 orders.total_price, 
                 orders.status
                 FROM orders
                 WHERE orders.user_id = ?
                 ORDER BY orders.order_date DESC
                 `,
                [user_id]
            );
            for (let order of orders) {
                let allQuantity = 0;
                const [orderDetails] = await db.execute(
                    `SELECT 
                    od.id as order_detail_id,
                    p.name as product_name,
                    od.quantity as product_quantity,
                    p.photo_path as product_photo_path
                    FROM order_details od
                    JOIN products p ON od.product_id = p.id
                    WHERE od.order_id = ?`,
                    [order.id]);
                order.order_details = orderDetails;
                allQuantity += orderDetails.reduce((acc, item) => acc + item.product_quantity, 0);
                order.allQuantity = allQuantity;
            }
            return res.status(200).json(orders);
        }
        catch (err) {
            console.error("Ошибка при получении заказов:", err);
            return res.status(500).json({ error: "Ошибка при получении заказов" });
        }
    }
}

    

export default new ordersController();