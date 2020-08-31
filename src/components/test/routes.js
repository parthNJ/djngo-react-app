import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Cart from "./pages/Cart";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/programs",
    name: "programs",
    component: Programs,
    layout: "/admin",
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    layout: "/admin",
  },
];

export default routes;
