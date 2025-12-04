import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Catalog from "./pages/Catalog/Catalog";
import Main from "./pages/Main/Main";
import Auth from "./pages/Auth/Auth";
import ProductPage from "./pages/ProductPage/ProductPage";

import {
  ADMIN_ROUTE,
  PROFILE_ROUTE,
  AUTHORIZATION_ROUTE,
  CART_ROUTE,
  CATALOG_ROUTE,
  MAIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: CATALOG_ROUTE,
    Component: Catalog,
  },
  {
    path: AUTHORIZATION_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
];
