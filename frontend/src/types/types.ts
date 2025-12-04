export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  admin: number;
}

export interface UserState {
  isAuth: boolean;
  user: User | null;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  photo: string;
  cost: number;
}

export interface ServiceState {
  services: Service[];
}

export interface Product {
  id: number
  name: string
  description: string
  photo_path: string
  price: number
  category_id: number
}
export interface Category {
  id: number
  category_name: string
}

export interface Application {
  id: number
  email: string
  user_id: number
  service_id: number
  date: Date          
  status: string
  issue: string
  service_name: string
}

export interface Feedback {
  id?: number
  user_id: number
  feedback_text: string
  feedback_date: Date
  email: string
}

export type CreateFeedbackDto = {
  feedback_text: string;
  feedback_date: Date;
};

export type CreateApplicationDto = {
  service_id: number;
  date: Date;
  status: string;
  issue: string;
};

export interface CartItemType {
  id?: number
  user_id?: number
  product_id: number
  quantity: number
  price: number
}

export type CreateOrderDto = {
  total_price: number;
  delivery_address: string;
  cart_items: CartItemType[];
}

export interface Orders {
  id?: number;
  user_id: number;
  order_date: Date;
  total_price: number;
  status: string;
  delivery_address: string;
}

export interface OrderDetails {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface AdminOrderDetails {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface UserOrderDetails {
  order_detail_id: number;
  product_name: string;
  product_quantity: number;
  product_photo_path: string;
}

export interface AdminOrder {
  id: number;                          
  user_name: string;                   
  order_date: Date;                    
  total_price: number;                 
  delivery_address: string;  
  status: string;           
  order_details: AdminOrderDetails[];  
}

export interface UserOrder {
  id: number;
  total_price: number;
  status: string;
  order_details: UserOrderDetails[];
}


