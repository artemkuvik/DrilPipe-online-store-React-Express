import styles from "./ModalOrder.module.css";
import delivery from "../../../images/icons/delivery.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { CreateOrderDto } from "../../../types/types";
import { createOrder } from "../../../http/ordersApi";
import { useDispatch } from "react-redux";
import { setCart } from "../../../store/CartSlice";

export default function ModalOrder({ onClose }: { onClose: () => void }) {
    const [deliveryAddress, setDeliveryAddress] = useState("");
     const { items, totalPrice } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const orderData: CreateOrderDto = {
            total_price: totalPrice,
            delivery_address: deliveryAddress,
            cart_items: items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))
        };
        createOrder(orderData);
        onClose();
        alert("Заказ оформлен успешно");
        dispatch(setCart([]));
    };
    
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
            <button className={styles.close_button} onClick={onClose}>×</button>
            <h1 className={styles.modal_title}>Оформление заказа</h1>
            <div className={styles.modal_subtitle}>
                <img src={delivery} alt="delivery"/>
                 <p className={styles.modal_subtitle_text}>Адрес доставки</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Адрес доставки" className={styles.modal_input_text}
                id="address" name="address" required onChange={(e) => setDeliveryAddress(e.target.value)}
                />
                <button type="submit" className={styles.modal_input_button}>Оформить заказ</button>
            </form>
           <p className={styles.modal_text}>Пожалуйста, укажите адрес доставки товара</p>
            </div>
        </div>
    )
}
