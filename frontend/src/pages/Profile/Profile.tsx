import ButtonExit from "../../components/common/ButtonExit/ButtonExit";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import no_order from "../../images/icons/no_order.svg"
import { getOrdersForUser } from "../../http/ordersApi";
import { useEffect, useState } from "react";
import { UserOrder } from "../../types/types";
import { updateOrderStatus } from "../../http/ordersApi";

function Profile() {
  const {user} = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Все');

  useEffect(() => {
    getOrdersForUser().then(data => {
      setOrders(data);
    });
  }, [user]);

  const handleCancelOrder =async (id: number, newStatus: string) => {
    try {
    await updateOrderStatus(id, newStatus);
    const updatedOrders = orders.map((order) => order.id === id ? { ...order, status: newStatus } : order);
    setOrders(updatedOrders);
  } catch (error) {
    console.error("Ошибка при отмене заказа:", error);
  }
};

 const filteredOrders = orders.filter(order => 
  statusFilter === 'Все' || order.status === statusFilter
  );

const handleChangeStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
   setStatusFilter(e.target.value);
};

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Добро пожаловать, {user!.name}!</h1>
      <p className={styles.email}>Email: {user!.email}</p>
      <p className={styles.filters}>Фильтры по статусу:</p>
    <select className={styles.select} onChange={handleChangeStatusFilter}>
      <option>Все</option>  
      <option>В обработке</option>
      <option>Завершен</option>
      <option>Отменен</option>
     </select>
     <div className={styles.orders}>
      {filteredOrders.length === 0 && 
        <div className={styles.no_orders_container}>
        <img src={no_order} alt="no_order" className={styles.no_order_image} />
        <p>Нет заказов.</p>
        </div>
        }
      {filteredOrders.map(order => (
        <div className={styles.order} key={order.id}>
           <p className={styles.order_number}>Заказ №{order.id}</p>
           <div className={styles.order_wrapper}>
           {order.order_details.map((detail) => (
            <div className={styles.order_detail} key={detail.order_detail_id}>
              <img src={`http://localhost:5000/${detail.product_photo_path}`}   className={styles.order_photo} alt="product_photo" />
              <p className={styles.order_detail_name}>{detail.product_name}, </p>
              <p className={styles.order_detail_quantity}>{detail.product_quantity} шт.</p>
            </div>
           ))}
           <div className={styles.order_footer}>
            <div className={styles.order_info}>
          <p className={styles.order_status}>Статус заказа: {order.status}</p>
          <p className={styles.order_quantity}>Общая стоимость: {order.total_price}₽</p>  
          </div>
          <button className={styles.order_button} onClick={() => handleCancelOrder(order.id, "Отменен")}>Отменить заказ</button>
           </div>
           </div>
          </div>
      ))}
     </div>
    <ButtonExit className={styles.button_exit}/>
    </div>
  );
}

export default Profile;
