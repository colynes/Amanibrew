import { useState } from "react";
import { Plus, Search, Eye, Printer, Filter } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  paymentMethod: string;
}

export function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const orders: Order[] = [
    {
      id: "ORD-1234",
      customer: "John Smith",
      date: "2026-02-25",
      items: 5,
      total: 145.5,
      status: "Completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1235",
      customer: "Sarah Johnson",
      date: "2026-02-25",
      items: 3,
      total: 98.2,
      status: "Processing",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1236",
      customer: "Mike Davis",
      date: "2026-02-24",
      items: 7,
      total: 234.8,
      status: "Pending",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-1237",
      customer: "Emily Brown",
      date: "2026-02-24",
      items: 2,
      total: 65.4,
      status: "Completed",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1238",
      customer: "David Wilson",
      date: "2026-02-23",
      items: 4,
      total: 178.9,
      status: "Completed",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1239",
      customer: "Lisa Anderson",
      date: "2026-02-23",
      items: 6,
      total: 212.3,
      status: "Processing",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1240",
      customer: "Robert Taylor",
      date: "2026-02-22",
      items: 3,
      total: 89.7,
      status: "Cancelled",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1241",
      customer: "Jennifer Martin",
      date: "2026-02-22",
      items: 5,
      total: 156.8,
      status: "Completed",
      paymentMethod: "Debit Card",
    },
  ];

  const statuses = ["All", "Pending", "Processing", "Completed", "Cancelled"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const orderItems = [
    { name: "Premium Ribeye Steak", quantity: 2, unit: "kg", price: 28.99 },
    { name: "Ground Beef", quantity: 1, unit: "kg", price: 12.99 },
    { name: "Italian Sausages", quantity: 1.5, unit: "kg", price: 11.99 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Orders Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Payment</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <p>{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{order.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{order.items} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>${order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowOrderDetails(true)}
                        className="rounded-lg p-2 hover:bg-muted"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2>Order Details</h2>
                <p className="text-sm text-muted-foreground">ORD-1234</p>
              </div>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                <Printer className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 text-sm">Customer Information</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p>John Smith</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p>2026-02-25</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p>Credit Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="mb-3 text-sm">Order Items</h3>
                <div className="space-y-2">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p>${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <p>Subtotal</p>
                  <p>Tzs 135,450</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>Tax (7.5%)</p>
                  <p>Tzs 10,160</p>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <p>Total</p>
                  <p className="text-xl">Tzs 145,500</p>
                </div>
              </div>

              <button
                onClick={() => setShowOrderDetails(false)}
                className="w-full rounded-lg border border-border px-4 py-2 hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}