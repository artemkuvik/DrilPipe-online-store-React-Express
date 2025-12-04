import AdminHeader from "../../components/AdminHeader/AdminHeader";
import styles from "./OrdersAdmin.module.css"
import {useState, useEffect} from "react"
import { AdminOrder } from "../../../../types/types";   
import { getOrdersForAdmin } from "../../../../http/ordersApi";
import { updateOrderStatus } from "../../../../http/ordersApi";



export default function OrdersAdmin() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

      useEffect(() => {
      (async () =>  {
         const orders = await getOrdersForAdmin();
         console.log(orders);
         setOrders(orders);
  ;
     })()
}, []) 

const handleChangeStatus = async (id: number, newStatus: string) => {
  try {
    await updateOrderStatus(id, newStatus);
    const updatedOrders = orders.map((order) => order.id === id ? { ...order, status: newStatus } : order);
    setOrders(updatedOrders);
  } catch (error) {
    console.error("Ошибка при обновлении статуса заказа:", error);
  }
}


return <div className={styles.wrapper}>
    <AdminHeader>
      <h1>Обращения</h1>
      </AdminHeader>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Пользователь (Email)</th>
              <th className={styles.th}>Дата заказа</th>
              <th className={styles.th}>Сумма</th>
              <th className={styles.th}>Адрес доставки</th>
              <th className={styles.th}>Изменить статус</th>
              <th className={styles.th}>Состав заказа</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
              <td>{order.user_name}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>{order.total_price} ₽</td>
               <td>{order.delivery_address}</td>
               <td>
                <select 
                  className={styles.select} 
                  value={order.status} 
                  onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                >
                  <option value="В обработке">В обработке</option>
                  <option value="Завершено">Завершено</option>
                  <option value="Отменено">Отменено</option>
                </select>
               </td>
               <td>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.th}>Название</th>
                      <th className={styles.th}>Количество</th>
                      <th className={styles.th}>Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_details.map((detail) => (
                      <tr key={detail.id}>
                        <td>{detail.product_name}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.price} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  </div>;
}