import styles from "./Cart.module.css";
import CartItem from "./components/CartItem/CartItem";
import CartTotal from "./components/CartTotal/CartTotal";
import { useEffect } from "react";
import { getCart } from "../../http/cartAPI";
import { getProducts } from "../../http/productsAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/CartSlice";
import { setProducts } from "../../store/ProductsSlice";
import { RootState } from "../../store/store";
import { CartItemType } from "../../types/types";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      getProducts(null, "", "", "").then(productsData => {
        dispatch(setProducts(productsData));
      });
    }
    
    getCart().then(data => {
      console.log('Cart: Получены данные корзины:', data);
      dispatch(setCart(data));
    }).catch(error => {
      console.error('Cart: Ошибка загрузки корзины:', error);
    });
  }, [dispatch, products.length]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart_list}>
        {items.length === 0 ? (
          <p className={styles.cart_empty}>Корзина пуста</p>
        ) : (
          items.map((item: CartItemType) => (
            <CartItem key={item.id} item={item} onClick={() => navigate(`/product-page/${item.product_id}?from=cart`)} />
          ))
        )}
      </div>
      <CartTotal />
    </div>
  );
}

export default Cart;