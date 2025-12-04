import { $authhost } from "./index";

export async function addProductToCart(product_id:number, price:number) {
    const {data} = await $authhost.post("api/cart/add", {product_id, price})
    return data
}

export async function getCart() {
    const {data} = await $authhost.get("api/cart/get")
    return data
}

export async function deleteProductFromCart(product_id:number, price:number) {
    const {data} = await $authhost.delete("api/cart/delete", { data: { product_id, price } })
    return data
}


