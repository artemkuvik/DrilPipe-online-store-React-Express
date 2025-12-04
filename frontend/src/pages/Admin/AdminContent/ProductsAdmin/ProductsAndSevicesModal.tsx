import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createProduct } from "../../../../http/productsAPI";
import { RootState } from "../../../../store/store";
import styles from "./ProductsAndServicesModal.module.css"
import { Product } from "../../../../types/types";
import { updateProduct } from "../../../../http/productsAPI";
import { Service } from "../../../../types/types";
import { createServices } from "../../../../http/servicesAPI";
import { editServices } from "../../../../http/servicesAPI";



interface ProductsAndSevicesModalProps {
  onClose: () => void;
  onSave: () => void; 
  addOrChange: boolean;
  addProductModal?: boolean;
  addServiceModal?: boolean;
  product?: Product  | null; 
  service?: Service | null;
}

export default function ProductsAndSevicesModal({ onClose, onSave, addOrChange, addProductModal, addServiceModal, product, service }: ProductsAndSevicesModalProps) {
  const { categories } = useSelector((state: RootState) => state.products);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);     
  
  
  useEffect(() => {
    if (!addOrChange && product && addProductModal) {
      setName(product.name);
      setPrice(String(product.price));
      setCategoryId(product.category_id);
      setDescription(product.description || "");
      // фото не подставляем, т.к. это File
      
    } 
     if (addOrChange && product && addProductModal) {
      setName('');
      setPrice('');
      setCategoryId(categories[0]?.id || 1);
      setDescription('');
      setPhoto(null);
    }
    if (!addOrChange && service && addServiceModal) {
      setName(service.name);
      setPrice(String(service.cost));
      setDescription(service.description || "");
      // фото не подставляем, т.к. это File
    }
    if (addOrChange && service && addServiceModal) {
      setName('');
      setPrice('');
      setDescription('');
      setPhoto(null);
    }
  }, [addOrChange, product, service, categories, addProductModal, addServiceModal]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (addProductModal) {
    formData.append('category_id', String(categoryId));
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (photo) {
      formData.append('photo_path', photo);
    }

    try {
      if (addOrChange) {
        await createProduct(formData as unknown as Product);
      } else {
        if (product?.id !== undefined) {
          await updateProduct(product.id, formData);
        } else {
          throw new Error("ID товара не определён для редактирования");
        }
      }
      onSave();
      onClose();
    } catch  {
      alert("Ошибка при добавлении товара");
    }
  }
  if (addServiceModal) {
    formData.append('name', name);
    formData.append('description', description);
    formData.append('cost', price);
    if (photo) {
      formData.append('photo', photo);
    }
  
    try {
      if (addOrChange) {
        await createServices(formData as unknown as Service);
      } else {
        if (service?.id !== undefined) {
          await editServices(Number(service.id), formData);
        } else {
          throw new Error("ID сервиса не определён для редактирования");
        }
      }
      onSave();
      onClose();
    } catch  {
      alert("Ошибка при добавлении сервиса");
    }
  }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>{addOrChange && addProductModal ? "Добавить товар" 
        : addOrChange && addServiceModal ? "Добавить услугу" :
         !addOrChange && addProductModal ? "Изменить товар" : 
         !addOrChange && addServiceModal ? "Изменить услугу" : ""}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} required />
          {addProductModal && <select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.category_name}</option>
            ))}
          </select>}
          <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
          <label htmlFor="photo">Фото</label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className={styles.saveButton}>Сохранить</button>
        </form>
      </div>
    </div>
  );
}


