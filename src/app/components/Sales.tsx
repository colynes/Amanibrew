import { useState } from "react";
import { Calendar, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Sales() {
  const [dateRange, setDateRange] = useState("week");

  const weeklySales = [
    { day: "Mon", actual: 1200, target: 1500, orders: 15 },
    { day: "Tue", actual: 1900, target: 1800, orders: 24 },
    { day: "Wed", actual: 1600, target: 1700, orders: 19 },
    { day: "Thu", actual: 2200, target: 2000, orders: 28 },
    { day: "Fri", actual: 2800, target: 2500, orders: 35 },
    { day: "Sat", actual: 3400, target: 3200, orders: 42 },
    { day: "Sun", actual: 2600, target: 2800, orders: 32 },
  ];

  const monthlySales = [
    { month: "Jan", actual: 42500, target: 45000 },
    { month: "Feb", actual: 52340, target: 50000 },
    { month: "Mar", actual: 48200, target: 52000 },
    { month: "Apr", actual: 55100, target: 55000 },
    { month: "May", actual: 60800, target: 58000 },
    { month: "Jun", actual: 58900, target: 62000 },
  ];

  const categoryBreakdown = [
    { name: "Beef", value: 35, color: "#3d2817" },
    { name: "Pork", value: 25, color: "#c9a876" },
    { name: "Poultry", value: 20, color: "#b8935f" },
    { name: "Lamb", value: 12, color: "#8b6f47" },
    { name: "Sausages", value: 8, color: "#d4b892" },
  ];

  const topProducts = [
    { name: "Premium Ribeye Steak", sold: 145, revenue: 4200.55 },
    { name: "Ground Beef", sold: 230, revenue: 2988.70 },
    { name: "Chicken Breast", sold: 310, revenue: 3096.90 },
    { name: "Pork Chops", sold: 180, revenue: 2878.20 },
    { name: "Italian Sausages", sold: 165, revenue: 1978.35 },
  ];

  const stats = [
    {
      label: "Total Sales",
      value: "$52,340",
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
      value: "$80.77",
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Sales Analytics</h1>
          <p className="text-muted-foreground">Track your sales performance and trends</p>
        </div>
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
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Sales */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Weekly Sales & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4a574" opacity={0.2} />
              <XAxis dataKey="day" stroke="#7a5a3f" />
              <YAxis stroke="#7a5a3f" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d4a574",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="actual" fill="#6b4423" radius={[8, 8, 0, 0]} name="Actual Sales ($)" />
              <Bar dataKey="target" fill="#d4a574" radius={[8, 8, 0, 0]} name="Target Sales ($)" />
              <Bar dataKey="orders" fill="#8b6f47" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

      {/* Monthly Trend */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4">Monthly Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c9a876" opacity={0.2} />
            <XAxis dataKey="month" stroke="#6b5444" />
            <YAxis stroke="#6b5444" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #c9a876",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3d2817"
              strokeWidth={3}
              dot={{ fill: "#3d2817", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#c9a876"
              strokeWidth={3}
              dot={{ fill: "#c9a876", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Units Sold</th>
                <th className="px-6 py-3 text-left">Revenue</th>
                <th className="px-6 py-3 text-left">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topProducts.map((product, index) => (
                <tr key={product.name} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p>{product.sold} units</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>${product.revenue.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(product.sold / 310) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {((product.sold / 310) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}