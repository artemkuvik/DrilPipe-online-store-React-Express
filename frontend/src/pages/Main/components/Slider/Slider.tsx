import styles from "./Slider.module.css";
import { useState } from "react";
import { Service, ServiceState } from "../../../../types/types";
import arrowLeft from "../../../../images/icons/arrow_left.svg";
import arrowRight from "../../../../images/icons/arrow_right.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import  {AUTHORIZATION_ROUTE}  from "../../../../utils/consts";
import { useNavigate } from "react-router-dom";

interface SliderProps {
    services: ServiceState["services"];
    setIsModalOpen: (isOpen: boolean) => void;
    setServiceId: (id: number) => void;
}

function Slider({ services, setIsModalOpen, setServiceId }: SliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const nextSlide = () => {
        if (currentIndex + itemsPerSlide < services.length) {
             setCurrentIndex(currentIndex + itemsPerSlide);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - itemsPerSlide);
        }
    };
    
    const applicationClick = (service: Service) => {
        if (user) {
          setServiceId(service.id)    
            setIsModalOpen(true)         
        } else {
            navigate(AUTHORIZATION_ROUTE); }
        }

    const visibleServices = services.slice(currentIndex, currentIndex + itemsPerSlide);
    const emptySlots = itemsPerSlide - visibleServices.length;
    const isSingleSlide = visibleServices.length === 1;

  return <div >
    <div className={styles.slider_title}>
      <h1>Наши услуги</h1>
    </div>
    <div
      className={styles.slider_content}
    >
    <button onClick={prevSlide} className={styles.slider_button}>
        <img src={arrowLeft} alt="arrow-left" />
    </button>
    {isSingleSlide ? (
      <>
        <div className={styles.slider_item} style={{ visibility: 'hidden' }} />
        <div className={styles.slider_item}>
          <img src={`http://localhost:5000/${visibleServices[0].photo}`} alt={visibleServices[0].name} />
          <h3>{visibleServices[0].name}</h3>
          <p className={styles.cost_service}>{visibleServices[0].cost} руб.</p>
          <p className={styles.cost_description}>{visibleServices[0].description}</p>
          <button className={styles.button_service} onClick={() => applicationClick(visibleServices[0])}>Оставить заявку</button>
        </div>
        <div className={styles.slider_item} style={{ visibility: 'hidden' }} />
      </>
    ) : (
      <>
        {visibleServices.map((service) => (
          <div className={styles.slider_item} key={service.id}>
            <img src={`http://localhost:5000/${service.photo}`} alt={service.name} />
            <h3>{service.name}</h3>
            <p className={styles.cost_service}>{service.cost} руб.</p>
            <p className={styles.cost_description}>{service.description}</p>
            <button className={styles.button_service} onClick={() =>applicationClick(service)}
            >Оставить заявку</button>
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <div
            className={styles.slider_item}
            style={{ visibility: 'hidden' }}
            key={`empty-${idx}`}
          />
        ))}
      </>
    )}
    <button onClick={nextSlide} className={styles.slider_button}>
        <img src={arrowRight} alt="arrow-right" />
    </button>
    </div>
  </div>;
}

export default Slider;