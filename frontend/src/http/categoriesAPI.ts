import {$host} from "./index";
import { Category } from "../types/types";

export const getCategories = async (): Promise<Category[]> => {
    const {data} = await $host.get("api/categories");
    return data;
};



