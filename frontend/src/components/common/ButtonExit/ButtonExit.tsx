import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../../../store/UserSlice";

interface ButtonExitProps {
  className?: string; 
}

function ButtonExit({ className }: ButtonExitProps) {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(setIsAuth(false));
    dispatch(setUser(null));
  };
  return (
    <button className={className} onClick={logOut}>
      Выйти
    </button>
  );
}

export default ButtonExit;
