import { useState } from "react";
import { Calendar, TrendingUp, DollarSign, ShoppingCart, Target, Filter } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Sales() {
  const [dateRange, setDateRange] = useState("week");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [showTargetModal, setShowTargetModal] = useState(false);

  const weeklySales = [
    { day: "Mon", actual: 1200000, target: 1500000, orders: 15 },
    { day: "Tue", actual: 1900000, target: 1800000, orders: 24 },
    { day: "Wed", actual: 1600000, target: 1700000, orders: 19 },
    { day: "Thu", actual: 2200000, target: 2000000, orders: 28 },
    { day: "Fri", actual: 2800000, target: 2500000, orders: 35 },
    { day: "Sat", actual: 3400000, target: 3200000, orders: 42 },
    { day: "Sun", actual: 2600000, target: 2800000, orders: 32 },
  ];

  const monthlySales = [
    { month: "Jan", actual: 42500000, target: 45000000 },
    { month: "Feb", actual: 52340000, target: 50000000 },
    { month: "Mar", actual: 48200000, target: 52000000 },
    { month: "Apr", actual: 55100000, target: 55000000 },
    { month: "May", actual: 60800000, target: 58000000 },
    { month: "Jun", actual: 58900000, target: 62000000 },
  ];

  const productSales = [
    { name: "Premium Ribeye Steak", sold: 145, revenue: 4200000, target: 4500000 },
    { name: "Ground Beef", sold: 230, revenue: 2988000, target: 3000000 },
    { name: "Chicken Breast", sold: 310, revenue: 3096000, target: 3200000 },
    { name: "Pork Chops", sold: 180, revenue: 2878000, target: 2800000 },
    { name: "Italian Sausages", sold: 165, revenue: 1978000, target: 2000000 },
  ];

  const categoryBreakdown = [
    { name: "Beef", value: 35, color: "#3d2817" },
    { name: "Pork", value: 25, color: "#c9a876" },
    { name: "Poultry", value: 20, color: "#b8935f" },
    { name: "Lamb", value: 12, color: "#8b6f47" },
    { name: "Sausages", value: 8, color: "#d4b892" },
  ];

  const stats = [
    {
      label: "Total Sales",
      value: "Tzs 52,340,000",
      change: "+18.2%",
      icon: DollarSign,
      trend: "up",
    },
    {
      label: "Total Orders",
      value: "648",
      change: "+12.5%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      label: "Avg. Order Value",
      value: "Tzs 80,770",
      change: "+5.1%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      label: "Sales Growth",
      value: "23%",
      change: "+4.3%",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const filteredProductSales = selectedProduct === "All" 
    ? productSales 
    : productSales.filter(p => p.name === selectedProduct);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Sales Analytics</h1>
          <p className="text-muted-foreground">Track your sales performance and trends</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowTargetModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            <Target className="h-5 w-5" />
            Set Targets
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
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

      {/* Product Filter */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <label className="text-sm font-medium">Filter by Product:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
        >
          <option value="All">All Products</option>
          {productSales.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly/Monthly Sales Chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">
            {dateRange === "week" ? "Weekly" : "Monthly"} Sales: Target vs Actual
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dateRange === "week" ? weeklySales : monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c9a876" opacity={0.2} />
              <XAxis dataKey={dateRange === "week" ? "day" : "month"} stroke="#6b5444" />
              <YAxis stroke="#6b5444" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c9a876",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `Tzs ${value.toLocaleString()}`}
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

        {/* Category Breakdown */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4">Product Performance: Target vs Actual</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredProductSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c9a876" opacity={0.2} />
            <XAxis dataKey="name" stroke="#6b5444" />
            <YAxis stroke="#6b5444" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #c9a876",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `Tzs ${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="target" fill="#b8935f" radius={[8, 8, 0, 0]} name="Target" />
            <Bar dataKey="revenue" fill="#3d2817" radius={[8, 8, 0, 0]} name="Actual Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products Table */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4">Top Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Units Sold</th>
                <th className="px-6 py-3 text-left">Revenue</th>
                <th className="px-6 py-3 text-left">Target</th>
                <th className="px-6 py-3 text-left">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productSales.map((product) => {
                const performance = ((product.revenue / product.target) * 100).toFixed(1);
                const isAboveTarget = product.revenue >= product.target;
                return (
                  <tr key={product.name} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{product.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{product.sold}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">Tzs {product.revenue.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-muted-foreground">
                        Tzs {product.target.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs ${
                          isAboveTarget
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {performance}% {isAboveTarget ? "✓" : ""}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Set Target Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-card p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="mb-4">Set Product Sales Targets</h2>
            <form className="space-y-4">
              {productSales.map((product) => (
                <div key={product.name} className="rounded-lg border border-border p-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium">{product.name}</label>
                    <p className="text-xs text-muted-foreground">
                      Current Target: Tzs {product.target.toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs">Weekly Target (Tzs)</label>
                      <input
                        type="number"
                        defaultValue={product.target}
                        className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs">Monthly Target (Tzs)</label>
                      <input
                        type="number"
                        defaultValue={product.target * 4}
                        className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTargetModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Save Targets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
