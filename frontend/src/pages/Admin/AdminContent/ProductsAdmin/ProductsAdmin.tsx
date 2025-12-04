import styles from "./ProductsAdmin.module.css";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import { useState, useEffect } from "react";
import ProductsAndSevicesModal from "./ProductsAndSevicesModal";  
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setProducts } from "../../../../store/ProductsSlice";
import { getProducts } from "../../../../http/productsAPI";
import { Product } from "../../../../types/types";
import { deleteProduct } from "../../../../http/productsAPI";
import { getCategories } from "../../../../http/categoriesAPI";
import { setCategories } from "../../../../store/ProductsSlice";    
import AdminHeader from "../../components/AdminHeader/AdminHeader";

export default function ProductsAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addOrChange, setAddOrChange] = useState(true);
  const [addProductModal, setAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state: RootState) => state.products);

  useEffect(() => {
  getCategories().then(data => {
    dispatch(setCategories(data));
  });
}, [dispatch]);

const fetchAndSetProducts = () => {
  getProducts(null, "", "", ""   ).then(data => {
    dispatch(setProducts(data));
  });
};
    useEffect(() => {
   fetchAndSetProducts();
  }, [dispatch]); 
  
return (
    <div className={styles.wrapper}>
      <AdminHeader> 
      <h1>Список товаров</h1>
      <ButtonAdd onClick={() => {setIsModalOpen(true); setAddProductModal(true); setAddOrChange(true)}}>Добавить товар</ButtonAdd>
       </AdminHeader>   
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Фото</th>
              <th className={styles.th}>Название</th>
              <th className={styles.th}>Цена</th>
              <th className={styles.th}>Описание</th>
              <th className={styles.th}>Категория</th>
              <th className={styles.th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} >
                <td >
                  <img 
                    src={`http://localhost:5000/${product.photo_path}`}
                    alt={product.name}
                    className={styles.photo}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price} руб.</td>
                <td>{product.description}</td>
                <td>{categories.find(c => c.id == product.category_id)?.category_name || "—"}</td>
                <td>
                  <button className={styles.editButton} onClick={() => 
                    {setIsModalOpen(true); setAddOrChange(false);  setEditingProduct(product); setAddProductModal(true)}}
                    >Изменить</button>
                  <button
                    className={styles.deleteButton}
                    onClick={async () => {
                      await deleteProduct(product.id);
                      fetchAndSetProducts();
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
          product={editingProduct}  
          addProductModal={addProductModal}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {setIsModalOpen(false); 
            fetchAndSetProducts(); }}
        />
      )}
      
    </div>
  );
}