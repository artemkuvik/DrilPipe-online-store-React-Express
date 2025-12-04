import {$host, $authhost} from "./index";
import { Product } from "../types/types";


export const getProducts = async (category_id: number | null, 
    minPrice: number | string, maxPrice: number | string, search: string) => {  
    const {data} = await $host.get("api/products", {params: {category_id, minPrice, maxPrice, search}});
    return data;
};



export const getOneProduct = async (id: number) => {
    const {data} = await $host.get(`api/products/${id}`);
    return data;
};

export const createProduct = async (formData: Product) => {
    const {data} = await $authhost.post("api/products/admin", formData);
    return data;
};

export const updateProduct = async (id: number, formData: FormData): Promise<Product> => {
  const { data } = await $authhost.put(`api/products/admin/${id}`, formData);
  return data;
};


export const deleteProduct = async (id: number) => {
    const {data} = await $authhost.delete(`api/products/${id}`);
    return data;
};