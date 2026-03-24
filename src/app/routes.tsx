import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { Orders } from "./components/Orders";
import { Sales } from "./components/Sales";
import { FatClients } from "./components/FatClients";
import { FatClientsSubscriptions } from "./components/FatClientsSubscriptions";
import { FatClientsBilling } from "./components/FatClientsBilling";
import { Reports } from "./components/Reports";
import { Users } from "./components/Users";
import { Login } from "./components/Login";
import { Landing } from "./components/Landing";
import { ProtectedRoot } from "./components/ProtectedRoot";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: ProtectedRoot,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "inventory/categories", Component: Categories },
      { path: "inventory/products", Component: Products },
      { path: "orders", Component: Orders },
      { path: "fat-clients", Component: FatClients },
      { path: "fat-clients/subscriptions", Component: FatClientsSubscriptions },
      { path: "fat-clients/billing", Component: FatClientsBilling },
      { path: "sales", Component: Sales },
      { path: "reports", Component: Reports },
      { path: "users", Component: Users },
    ],
  },
]);