import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Orders } from "./components/Orders";
import { Sales } from "./components/Sales";
import { FatClients } from "./components/FatClients";
import { Reports } from "./components/Reports";
import { Users } from "./components/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "fat-clients", Component: FatClients },
      { path: "sales", Component: Sales },
      { path: "reports", Component: Reports },
      { path: "users", Component: Users },
    ],
  },
]);