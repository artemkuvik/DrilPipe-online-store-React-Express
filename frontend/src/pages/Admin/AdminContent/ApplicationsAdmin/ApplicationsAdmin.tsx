import AdminHeader from "../../components/AdminHeader/AdminHeader";
import styles from "./ApplicationsAdmin.module.css"
import {useState, useEffect} from "react"
import { getApplications, updateApplicationStatus } from "../../../../http/applicationsAPI";
import { Application } from "../../../../types/types";
;

export default function ApplicationsAdmin() {
      const [items, setItems] = useState<Application[]>([]);
      useEffect(() => {
      (async () =>  {
          const data = await getApplications();
          setItems(data)
     })()
}, []) 


const handleChangeStatus = async (id: number, newStatus: string) => {
  try {
    await updateApplicationStatus(id, newStatus);
    setItems(items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
}

return <div className={styles.wrapper}>
    <AdminHeader>
      <h1>Обращения</h1>
      </AdminHeader>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Пользователь (Email)</th>
              <th className={styles.th}>Услуга</th>
              <th className={styles.th}>Дата обращения</th>
              <th className={styles.th}>Статус</th>
              <th className={styles.th}>Сообщение</th>
              <th className={styles.th}>Изменить статус</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
              <td>{item.email}</td>
              <td>{item.service_name}</td>
              <td>{item.date ? new Date(item.date).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''}</td>
               <td>{item.status}</td>
               <td className={styles.messageCell}>{item.issue}</td>
               <td>
                <select 
                  className={styles.select} 
                  value={item.status} 
                  onChange={(e) => handleChangeStatus(item.id, e.target.value)}
                >
                  <option value="В обработке">В обработке</option>
                  <option value="Завершено">Завершено</option>
                  <option value="Отменено">Отменено</option>
                </select>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  </div>;
}