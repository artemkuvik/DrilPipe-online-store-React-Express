import "./App.css";
import AppRouter from "./components/AppRouter";

import { useDispatch } from "react-redux";

import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import { useEffect, useState } from "react";
import { check } from "./http/userAPI";
import { setIsAuth, setUser } from "./store/UserSlice";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      check()
        .then((userData) => {
          dispatch(setIsAuth(true));
          dispatch(setUser(userData));
        })
        .catch((error) => {
          // Если токен невалидный (401) - удаляем его и продолжаем как неавторизованный
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
          }
        })
        .finally(() => {
          setIsLoading(false); // завершили проверку
        });
    } else {
      // если токена нет, сразу снимаем loading
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    // Можно показывать спиннер или просто ничего
    return <div>Загрузка...</div>;
  }
  return (
    <div className="container">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
