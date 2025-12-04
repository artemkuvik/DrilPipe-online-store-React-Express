import client_service from "../../../../images/icons/client_service.svg";
import styles from "./CartTotal.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ModalApplicationsORFeedback from "../../../../components/modal/ModalApplicationsOrFeedback/ModalApplicationsOrFeedback";
import { useState } from "react";
import ModalOrder from "../../../../components/modal/ModalOrder/ModalOrder";

export default function CartTotal() {
    const { totalPrice, totalQuantity } = useSelector((state: RootState) => state.cart);
    const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState(false)
    const [isModalOrderOpen, setIsModalOrderOpen] = useState(false)
   

   const feedbackClick = () => {
       setIsModalFeedbackOpen(true)
    }
    const orderClick = () => {
        setIsModalOrderOpen(true)
    }
    
    return (
        <div className={styles.cartTotal}>
            
            <div className={styles.application}>       
                <img src={client_service} alt="client_service" className={styles.img}/>
                <span>Если у вас возникли трудности, можете</span> <span className={styles.button_application} onClick={feedbackClick}>связаться с нами</span> 
            </div>
            
            <div className={styles.total}>
            <p> <span className={styles.total_text}>Количество товаров:</span> {totalQuantity}</p>
            <p> <span className={styles.total_text}>Итого:</span> {totalPrice.toFixed(0)} руб.</p>
            <button className={styles.button_order} onClick={orderClick}>Оформить заказ</button>
            </div>
              {isModalFeedbackOpen && 
<ModalApplicationsORFeedback 
  onClose={() => {
    setIsModalFeedbackOpen(false);
}}
/>}
{isModalOrderOpen && 
<ModalOrder 
  onClose={() => {
    setIsModalOrderOpen(false);
}}
/>}
        </div>
    )
}