import { Category, Product } from "../../../../types/types";
import styles from "./ProductList.module.css";
import ProductCard from "../ProductCard/ProductCard";


export default function ProductList({products, categories}: {products: Product[], categories: Category[]}) { 

    return <div className={styles.productList}>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} categories={categories}/>
        ))}
    </div>;
}