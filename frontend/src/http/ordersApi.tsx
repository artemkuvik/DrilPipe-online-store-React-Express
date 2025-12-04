import {  $authhost } from "./index.ts";
import { CreateOrderDto } from "../types/types.ts";

export const createOrder = async (orderData: CreateOrderDto) => {
    const { data } = await $authhost.post("api/orders", orderData);
    return data;
}

export const getOrdersForAdmin = async () => {
    const {data} = await $authhost.get("api/orders");
    return data;
}

export const getOrderDetails = async () => {
    const {data} = await $authhost.get("api/orders/details");
    return data;
}

export const updateOrderStatus = async (id: number, status: string) => {
    const {data} = await $authhost.put(`api/orders/${id}`, {status});
    return data;
}

export const getOrdersForUser = async () => {
    const {data} = await $authhost.get(`api/orders/user`);
    return data;
}
