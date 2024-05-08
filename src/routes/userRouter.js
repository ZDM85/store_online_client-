import Admin from "../components/pages/admin/Admin";
import Auth from "../components/pages/auth/Auth";
import Basket from "../components/pages/basket/Basket";
import DevicePage from "../components/pages/device_page/DevicePage";
import Shop from "../components/pages/shop/Shop";
import {
  ADMIN,
  BASKET,
  DEVICE_PAGE,
  LOGIN,
  REGISTRATION,
  SHOP,
} from "../utils/consts";

export const authRoutes = [
  {
    path: ADMIN,
    Component: Admin,
  },
  {
    path: BASKET,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: LOGIN,
    Component: Auth,
  },
  {
    path: REGISTRATION,
    Component: Auth,
  },
  {
    path: SHOP,
    Component: Shop,
  },
  {
    path: DEVICE_PAGE + "/:id",
    Component: DevicePage,
  },
];
