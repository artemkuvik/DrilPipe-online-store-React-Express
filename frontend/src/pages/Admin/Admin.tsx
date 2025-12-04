import { useState } from "react";
import styles from "./Admin.module.css";
import AdminSlider from "./AdminSlider/AdminSlider";
import AdminContent from "./AdminContent/AdminContent";

function Admin() {
  const [activeTab, setActiveTab] = useState("products");
  return (
    <div>
      <h1 className={styles.title}>
        Добро пожаловать в панель администратора!
      </h1>
      <div className={styles.admin_container}>
        <AdminSlider activeTab={activeTab} setActiveTab={setActiveTab} />
        <AdminContent activeTab={activeTab} />
      </div>
    </div>
  );
}
export default Admin;
