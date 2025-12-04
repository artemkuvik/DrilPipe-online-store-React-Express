import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { useState } from "react";
import {
  AUTHORIZATION_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE_ROUTE,
  ADMIN_ROUTE,
} from "../../utils/consts";
import { registration, authorization } from "../../http/userAPI";
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../../store/UserSlice";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistr, setIsRegistr] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (!isRegistr) {
        data = await registration(name, email, password);
     

        dispatch(setIsAuth(true));
        dispatch(setUser(data));
      
        navigate(PROFILE_ROUTE);
      } else {
        data = await authorization(email, password);
        dispatch(setIsAuth(true));
        dispatch(setUser(data));
      
        if (data.admin === 1) {
          navigate(ADMIN_ROUTE);
        } else {
          navigate(PROFILE_ROUTE);
        }
      }
    } catch (e) {
      const error = e as ApiError;
      alert(error.response?.data || "Произошла ошибка");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>{isRegistr ? "Авторизация" : "Регистрация"}</h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            click();
          }}
        >
          {!isRegistr && (
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={!isRegistr ? "new-password" : "current-password"}
          />
          <button className={styles.button} type="submit">
            {isRegistr ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        {isRegistr && (
          <Link to={REGISTRATION_ROUTE} className={styles.footer}>
            <span>Нет аккаунта? </span>
            <span
              className={styles.link}
              onClick={() => {
                setIsRegistr(false);
              }}
            >
              Зарегистрируйтесь
            </span>
          </Link>
        )}
        {!isRegistr && (
          <Link to={AUTHORIZATION_ROUTE} className={styles.footer}>
            <span>Уже есть аккаунт? </span>
            <span
              className={styles.link}
              onClick={() => {
                setIsRegistr(true);
              }}
            >
              Войдите
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Auth;
