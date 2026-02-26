import { DollarSign, Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DeliveryReminders } from "./DeliveryReminders";

export function Dashboard() {
  const stats = [
    {
      label: "Today's Sales",
      value: "$2,450",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      label: "Orders",
      value: "48",
      change: "+8.3%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      label: "Inventory Items",
      value: "156",
      change: "-3 items",
      icon: Package,
      trend: "down",
    },
    {
      label: "Monthly Revenue",
      value: "$52,340",
      change: "+18.2%",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const salesData = [
    { date: "Mon", actual: 1200, target: 1500 },
    { date: "Tue", actual: 1900, target: 1800 },
    { date: "Wed", actual: 1600, target: 1700 },
    { date: "Thu", actual: 2200, target: 2000 },
    { date: "Fri", actual: 2800, target: 2500 },
    { date: "Sat", actual: 3400, target: 3200 },
    { date: "Sun", actual: 2600, target: 2800 },
  ];

  const productSales = [
    { product: "Beef", actual: 12500, target: 12000 },
    { product: "Pork", actual: 8300, target: 9000 },
    { product: "Chicken", actual: 6700, target: 7000 },
    { product: "Lamb", actual: 5200, target: 5500 },
    { product: "Sausages", actual: 4100, target: 4000 },
  ];

  const lowStockItems = [
    { name: "Premium Ribeye", stock: 5, unit: "kg" },
    { name: "Ground Beef", stock: 8, unit: "kg" },
    { name: "Pork Chops", stock: 3, unit: "kg" },
    { name: "Chicken Breast", stock: 6, unit: "kg" },
  ];

  const recentOrders = [
    { id: "ORD-1234", customer: "John Smith", items: 5, total: "$145.50", status: "Completed" },
    { id: "ORD-1235", customer: "Sarah Johnson", items: 3, total: "$98.20", status: "Processing" },
    { id: "ORD-1236", customer: "Mike Davis", items: 7, total: "$234.80", status: "Pending" },
    { id: "ORD-1237", customer: "Emily Brown", items: 2, total: "$65.40", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Amani Brew Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span
                  className={`text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Weekly Sales: Target vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a876" opacity={0.2} />
              <XAxis dataKey="date" stroke="#6b5444" />
              <YAxis stroke="#6b5444" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c9a876",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#b8935f"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#b8935f", r: 3 }}
                name="Target Sales"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3d2817"
                strokeWidth={3}
                dot={{ fill: "#3d2817", r: 4 }}
                name="Actual Sales"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Sales Chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Product Sales: Target vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a876" opacity={0.2} />
              <XAxis dataKey="product" stroke="#6b5444" />
              <YAxis stroke="#6b5444" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c9a876",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="target" fill="#b8935f" radius={[8, 8, 0, 0]} name="Target" />
              <Bar dataKey="actual" fill="#3d2817" radius={[8, 8, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Alert */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3>Low Stock Alert</h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-muted p-3"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.stock} {item.unit} remaining
                  </p>
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg bg-muted p-3"
              >
                <div>
                  <p>{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p>{order.total}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Reminders */}
      <DeliveryReminders />
    </div>
  );
}