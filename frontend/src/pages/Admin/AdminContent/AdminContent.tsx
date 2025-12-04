import ProductsAdmin from "./ProductsAdmin/ProductsAdmin";
import OrdersAdmin from "./OrdersAdmin/OrdersAdmin";
import FeedbackAdmin from "./FeedbackAdmin/FeedbackAdmin";
import ServicesAdmin from "./ServicesAdmin/ServicesAdmin";
import ApplicationsAdmin from "./ApplicationsAdmin/ApplicationsAdmin";

type Props = {
  activeTab: string;
};

export default function AdminContent({ activeTab }: Props) {
  switch (activeTab) {
    case "products":
      return <ProductsAdmin />;
    case "orders":
      return <OrdersAdmin />;
    case "feedback":
      return <FeedbackAdmin />;
    case "services":
      return <ServicesAdmin />; 
    case "applications":
      return <ApplicationsAdmin />;
    default:
      return null;
  }
}