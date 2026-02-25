import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Orders } from "./components/Orders";
import { Customers } from "./components/Customers";
import { Sales } from "./components/Sales";
import { Subscriptions } from "./components/Subscriptions";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "customers", Component: Customers },
      { path: "sales", Component: Sales },
      { path: "subscriptions", Component: Subscriptions },
    ],
  },
]);