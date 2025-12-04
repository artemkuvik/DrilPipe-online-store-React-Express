import { Category } from "../../../../types/types";
import styles from "./CategoryFilter.module.css";


export default function CategoryFilter({categories, setCategoryActive}:
   {categories: Category[], setCategoryActive: 
    (categoryId: number | null) => void}) {
  
  return <div className={styles.categoryFilter}>
    <button className={styles.categoryButton} onClick={() => setCategoryActive(null)}>Все</button>
     {categories.map((category) => (
        <button  key={category.id} onClick={() => setCategoryActive(category.id)} className={styles.categoryButton}>{category.category_name}</button>
     ))}
  </div>;
}