import { Service } from "../types/types.ts";
import { $authhost, $host } from "./index.ts";


export const getServices = async () => {
  const { data } = await $host.get("api/services");
  return data;
};

export const createServices = async (formData: Service) => {
    const {data} = await $authhost.post("api/services/admin", formData);
    return data;
};

export const editServices = async (id: number, formData: FormData) => {
  const { data } = await $authhost.put(`api/services/admin/${id}`, formData);
  return data;
};

export const deleteServices = async (id: number) => {
    const {data} = await $authhost.delete(`api/services/admin/${id}`);
    return data;
};
