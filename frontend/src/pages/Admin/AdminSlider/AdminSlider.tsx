import styles from "./AdminSlider.module.css";
import ButtonExit from "../../../components/common/ButtonExit/ButtonExit";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: "products", label: "Товары" },
  { key: "orders", label: "Заказы" },
  { key: "feedback", label: "Обращения" },
  { key: "services", label: "Услуги" },
  { key: "applications", label: "Заявки по услугам" },
];

function AdminSlider({ activeTab, setActiveTab }: Props) {
  return <div className={styles.admin_slider}>
   {tabs.map(tab => (
        <button className={
      activeTab === tab.key
        ? `${styles.admin_slider_button} ${styles.admin_slider_button_active}`
        : styles.admin_slider_button
    }
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
         
        >
          {tab.label}
        </button>
      ))}
    <ButtonExit className={`${styles.button} ${styles.admin_slider_button}`} />
    </div>
  
}

export default AdminSlider;