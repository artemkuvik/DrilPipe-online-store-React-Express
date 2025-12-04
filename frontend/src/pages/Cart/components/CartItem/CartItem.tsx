import styles from "./CartItem.module.css";
import { CartItemType } from "../../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { deleteProductFromCart, addProductToCart, getCart } from "../../../../http/cartAPI";
import { setCart } from "../../../../store/CartSlice";

interface CartItemProps {
    item: CartItemType;
    onClick: () => void;
}

export default function CartItem({ item, onClick }: CartItemProps) {
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.products.products.find(p => p.id === item.product_id));
    
    if (!product) return null;

    const handleDecrease = async () => {
        await deleteProductFromCart(item.product_id, product.price);
        const updatedCart = await getCart();
        dispatch(setCart(updatedCart));
    };

    const handleIncrease = async () => {
        await addProductToCart(item.product_id, product.price);
        const updatedCart = await getCart();
        dispatch(setCart(updatedCart));
    };
    
    return (
        <div className={styles.cartItem}>
            <img className={styles.cartItem_image} onClick={onClick} src={`http://localhost:5000/${product.photo_path}`} alt={product.name} />
            <h3 className={styles.cartItem_name} onClick={onClick}>{product.name}</h3>
            <p className={styles.price_product}>Цена: {Number(product.price).toFixed(0)} руб.</p>
            <div className={styles.cartItem_buttons}>
                <button className={styles.cartItem_button} onClick={handleDecrease}>-</button>
                <p className={styles.cartItem_quantity}>{item.quantity}</p>
                <button className={styles.cartItem_button} onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}
