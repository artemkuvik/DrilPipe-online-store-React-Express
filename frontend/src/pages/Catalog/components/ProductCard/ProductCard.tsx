import { Category, Product } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { addProductToCart, getCart } from "../../../../http/cartAPI.ts";
import { useDispatch } from "react-redux";
import { setCart } from "../../../../store/CartSlice";

export default function ProductCard({product, categories}: {product: Product, categories: Category[]} ) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation(); 
        await addProductToCart(product.id, product.price);
        const updatedCart = await getCart();
        dispatch(setCart(updatedCart));
    };

    return <div className={styles.productCard}   onClick={() => navigate(`/product-page/${product.id}`, { state: { product } })}>
        <img className={styles.product_image} src={`http://localhost:5000/${product.photo_path}`} alt={product.name} />
        <h3 className={styles.product_name}>{product.name}</h3>
        <p className={styles.product_category}>Категория: {categories.find(c => c.id == product.category_id)?.category_name || "—"}</p>
        <p className={styles.price_product}>{product.price}</p>
        <button className={styles.add_to_cart_button} onClick={handleAddToCart}>Добавить</button>
    </div>;
}