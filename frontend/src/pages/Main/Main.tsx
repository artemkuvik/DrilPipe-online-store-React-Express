import styles from "./Main.module.css";
import centrPhoto from "../../images/images/centr_photo.png";
import { useEffect, useState, useCallback } from "react";
import { getServices } from "../../http/servicesAPI";
import Slider from "./components/Slider/Slider";
import ButtonFeedback from "./components/ButtonFeedback/ButtonFeedback";
import ModalApplicationsOrFeedback from "../../components/modal/ModalApplicationsOrFeedback/ModalApplicationsOrFeedback";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setServices } from "../../store/ServicesSlice";
import { useNavigate } from "react-router-dom";
import { AUTHORIZATION_ROUTE } from "../../utils/consts";


function Main() {
  const [isModalApplicationsOpen, setIsModalApplicationsOpen] = useState(false);
  const [serviceId, setServiceId] = useState<number>(0);
  const [applicationsOrFeedback, setApplicationsOrFeedback] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user.user);
  const { services } = useSelector((state: RootState) => state.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAndSetServices = useCallback(() => {
    getServices().then((data) => {
      dispatch(setServices(data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (services.length === 0) {
      fetchAndSetServices();
    }
  }, [services.length, fetchAndSetServices]);

  const feedbackClick = () => {
        if (user) {
               setIsModalApplicationsOpen(true)
               setApplicationsOrFeedback(false) 
        } else {
            navigate(AUTHORIZATION_ROUTE); }
        }

  return (
    <div>
      <div className={styles.text}>
        <h1 className={styles.logo}>Dril Pipe Service</h1>
        <div className={styles.title}>
          Занимаемся изготовлением элементов трубных колонн и реализацией
          трубной продукции под различные нужды.
        </div>
      </div>
      <img src={centrPhoto} alt="Center-photo" className={styles.photo} />
      <div className={styles.services}>
        <Slider services={services} setIsModalOpen={setIsModalApplicationsOpen} setServiceId = {setServiceId}/>
      </div>
      <div id="contacts" className={styles.contacts}>
        <div className={styles.address_and_name}>
          <div>
           Мегион, Ханты-Мансийский автономный округ, 628680
          </div>
        <div>
          ©️ Dril Pipe Service
        </div>
        </div>
        <div className={styles.phone_and_email}>
          <div>
            +79026940345
          </div>
          <div>
            dpspto@mail.ru
          </div>
        </div>
        </div>
        <ButtonFeedback onClick = {feedbackClick}/>
    {isModalApplicationsOpen && 
<ModalApplicationsOrFeedback 
  onClose={() => {
    setIsModalApplicationsOpen(false);
    setApplicationsOrFeedback(true);
  }}
  applicationsOrFeedback={applicationsOrFeedback}
  serviceId={serviceId}
/>}
    </div>
  );  
}
export default Main;
