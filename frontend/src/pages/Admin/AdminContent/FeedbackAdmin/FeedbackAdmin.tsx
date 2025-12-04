import AdminHeader from "../../components/AdminHeader/AdminHeader";
import styles from "./FeedbackAdmin.module.css"
import {useState, useEffect} from "react"
import { getFeesbacks, deleteFeedback } from "../../../../http/feedbackAPI";
import { Feedback } from "../../../../types/types";
;

export default function FeedbackAdmin() {
    const [items, setItems] = useState<Feedback[]>([]);
    useEffect(() => {
      (async () =>  {
          const data = await getFeesbacks();
          setItems(data)
     })()
}, []) 

const handleDelete = async (id: number) => {
  await deleteFeedback(id);
  setItems(items.filter(item => item.id !== id));
}

  
     

    return <div className={styles.wrapper}>
    <AdminHeader>
      <h1>Обращения</h1>
      </AdminHeader>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Email пользователя</th>
              <th className={styles.th}>Сообщение</th>
              <th className={styles.th}>Дата обращения</th>
              <th className={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
              <td>{item.email}</td>
               <td className={styles.messageCell}>{item.feedback_text}</td>
               <td>{item.feedback_date ? new Date(item.feedback_date).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''}</td>
               <td>
                <button className={styles.deleteButton} onClick={() => item.id && handleDelete(item.id)}>Удалить</button>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  </div>;
}