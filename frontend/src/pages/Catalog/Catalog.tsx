import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import styles from "./Catalog.module.css";
import SearchBar from "./components/SearchBar/SeachBar";
import PriceFilter from "./components/PriceFilter/PriceFilter";
import { useEffect } from "react";
import { getCategories } from "../../http/categoriesAPI";
import { setCategories, setProducts, setCategoryActive, setMinPrice, setMaxPrice, setSearchFilter } from "../../store/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductList from "./components/ProductList/ProductList";
import { getProducts } from "../../http/productsAPI";




export default function Catalog() {
    const dispatch = useDispatch();
    const { categories, products, filters } = useSelector((state: RootState) => state.products);
    const { categoryActive, minPrice, maxPrice, search } = filters;
 
    
   
    const handleCategoryChange = (value: number | null) => {
      dispatch(setCategoryActive(value));
    };
    const handleMinPriceChange = (value: number | string) => {
      dispatch(setMinPrice(value));
    };
    const handleMaxPriceChange = (value: number | string) => {
      dispatch(setMaxPrice(value));
    };
    const handleSearchChange = (value: string) => {
      dispatch(setSearchFilter(value));
    };

    useEffect(() => {
    getCategories().then(data => {
    dispatch(setCategories(data));
  });
}, [dispatch]);

useEffect(() => {
  getProducts(categoryActive, minPrice, maxPrice, search).then(data => {
  dispatch(setProducts(data));
  });
}, [dispatch, categoryActive, minPrice, maxPrice, search]);

 return <div className={styles.catalog}>
    <div className={styles.catalog_header}>
   <CategoryFilter categories={categories} setCategoryActive={handleCategoryChange}/>
    <SearchBar onSearch={handleSearchChange}
    search={search}
    />
    </div>
    <div className={styles.catalog_content}>
    <PriceFilter 
      setMaxPrice={handleMaxPriceChange} 
      setMinPrice={handleMinPriceChange}
      currentMinPrice={minPrice}
      currentMaxPrice={maxPrice}
    />
    <ProductList products={products} categories={categories} />
    </div>
    </div>;
}