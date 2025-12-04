import { useEffect, useState, useCallback } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import styles from "./ServicesAdmin.module.css";
import ProductsAndSevicesModal from "../ProductsAdmin/ProductsAndSevicesModal";
import { Service } from "../../../../types/types";
import { deleteServices, getServices } from "../../../../http/servicesAPI";
import { setServices } from "../../../../store/ServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

function ServicesAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addOrChange, setAddOrChange] = useState(true);
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const dispatch = useDispatch();
  const { services } = useSelector((state: RootState) => state.services);

 useEffect(() => {
  const fetchAndSetServices = () => {
    getServices().then((data) => {
      dispatch(setServices(data));
    });
  };
  
  fetchAndSetServices();
}, [dispatch]); 

  return (
    <div className={styles.wrapper}>
      <AdminHeader>
        <h1>Список услуг</h1>
        <ButtonAdd
          onClick={() => {
            setIsModalOpen(true);
            setAddServiceModal(true);
            setAddOrChange(true);
          }}
        >
          Добавить услугу
        </ButtonAdd>
      </AdminHeader>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Название</th>
              <th className={styles.th}>Описание</th>
              <th className={styles.th}>Фото</th>
              <th className={styles.th}>Цена</th>
              <th className={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                  <td>
                  <img
                    src={`http://localhost:5000/${service.photo}`}
                    alt={service.name}
                    className={styles.photo}
                  />
                </td>
                <td>{service.cost} руб.</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setIsModalOpen(true);
                      setAddOrChange(false);
                      setEditingService(service);
                      setAddServiceModal(true);
                    }}
                  >
                    Изменить
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={async () => {
                      await deleteServices(Number(service.id));
                      fetchAndSetServices();
                    }}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ProductsAndSevicesModal
          addOrChange={addOrChange}
          service={editingService}
          addServiceModal={addServiceModal}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            setIsModalOpen(false);
            fetchAndSetServices();
          }}
        />
      )}
    </div>
  );
}

export default ServicesAdmin;
