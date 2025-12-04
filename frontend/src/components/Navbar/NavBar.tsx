import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../types/types";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../images/icons/logo.svg";
import cart from "../../images/icons/cart.svg";
import profile from "../../images/icons/profile.svg";
import {
  AUTHORIZATION_ROUTE,
  CART_ROUTE,
  CATALOG_ROUTE,
  ADMIN_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/consts";
import { RootState } from "../../store/store";
import { setCart } from "../../store/CartSlice";
import { getCart } from "../../http/cartAPI";
import { useEffect } from "react";



function NavBar() {
  const isAuth = useSelector((state: { user: UserState }) => state.user.isAuth);
  const userIsAdmin = useSelector(
    (state: { user: UserState }) => state.user.user?.admin
  );
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) { 
      getCart().then(data => {
        dispatch(setCart(data));
      }).catch(error => {
        console.error('Ошибка загрузки корзины:', error);
      });
    }
  }, [dispatch, isAuth]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="login" />
        <span className={styles.logo}>DRIL PIPE SERVICE</span>
      </div>
      <ul className={styles.links}>
        <li>
          <Link to="/">ГЛАВНАЯ</Link>
        </li>
        <li>
          <Link to={CATALOG_ROUTE}>КАТАЛОГ</Link>
        </li>
        <li>
          <a href="/#contacts">КОНТАКТЫ</a>
        </li>
      </ul>
      {!isAuth ? (
        <Link to={AUTHORIZATION_ROUTE} className={styles["button-container"]}>
          <button className={styles["reg-button"]}>
            Регистрация/Авторизация
          </button>
        </Link>
      ) : (
        <div className={styles.icons}>
          <Link to={CART_ROUTE} className={styles.cart_wrapper}>
            <img src={cart} alt="Корзина" className={styles.icon} />
            {Number(totalQuantity) > 0 && <span className={styles.cart_count}>{totalQuantity}</span>}
          </Link>
          <Link to={userIsAdmin === 1 ? ADMIN_ROUTE : PROFILE_ROUTE}>
            <img src={profile} alt="Профиль" className={styles.icon} />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
