import { useParams } from "react-router-dom"
import styles from "./ProductPage.module.css"
import { useSelector,  } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { getOneProduct } from "../../http/productsAPI";
import { useDispatch } from "react-redux";
import { setCategories, setProducts } from "../../store/ProductsSlice";
import { getCategories } from "../../http/categoriesAPI";
import back from "../../images/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";




export default function ProductPage() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const numericId = Number(id);
  const { products } = useSelector((state: RootState) => state.products);
  const { categories } = useSelector((state: RootState) => state.products);
  const product = products.find(p => p.id === numericId);
  const category = categories.find(c => c.id === product?.category_id);
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');

  useEffect(() => {
  if (!product && numericId) {
    getCategories().then(data => {
      dispatch(setCategories(data));
    });
    getOneProduct(numericId).then(data => {
      dispatch(setProducts(data));
    });
  }
}, [product, numericId, dispatch]);
  if (!product && !category) {
    return <div>Загрузка...</div>;
  }

  const handleGoBack = () => {
    if (from === 'cart') {
      navigate('/cart');
    } else {
      navigate('/catalog');
    }
  };
  return <div className={styles.cartWrapper}>
    <div className={styles.firstColumn} onClick={() => handleGoBack()}> 
       <button className={styles.firstButton}><img src={back} alt="Назад"/>
       <div className={styles.back} >Вернуться</div>
       </button>
     <img src={`http://localhost:5000/${product?.photo_path}`} alt={product!.name} className={styles.productImage}/>
     </div>
     <div className={styles.secondColumn}>      
    <div className={styles.productInfo}>
      <div className={styles.productName}>{product!.name}</div>
      <div>Категория: {category?.category_name}</div>
      <p>{product!.description}</p>
      <p>Цена: {product!.price}руб.</p>
    </div>
       
    <button className={styles.secondButton}>Добавить в корзину</button>
    </div>
   </div>
}
