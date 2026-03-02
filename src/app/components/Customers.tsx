import { useState } from "react";
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "Active" | "Inactive";
}

export function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      totalOrders: 24,
      totalSpent: 2450.5,
      lastOrder: "2026-02-25",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      totalOrders: 18,
      totalSpent: 1890.3,
      lastOrder: "2026-02-25",
      status: "Active",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      totalOrders: 32,
      totalSpent: 3420.8,
      lastOrder: "2026-02-24",
      status: "Active",
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "(555) 456-7890",
      totalOrders: 15,
      totalSpent: 1560.4,
      lastOrder: "2026-02-24",
      status: "Active",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "d.wilson@email.com",
      phone: "(555) 567-8901",
      totalOrders: 28,
      totalSpent: 2890.9,
      lastOrder: "2026-02-23",
      status: "Active",
    },
    {
      id: "6",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "(555) 678-9012",
      totalOrders: 21,
      totalSpent: 2210.3,
      lastOrder: "2026-02-23",
      status: "Active",
    },
    {
      id: "7",
      name: "Robert Taylor",
      email: "robert.t@email.com",
      phone: "(555) 789-0123",
      totalOrders: 8,
      totalSpent: 850.7,
      lastOrder: "2026-02-15",
      status: "Inactive",
    },
    {
      id: "8",
      name: "Jennifer Martin",
      email: "jennifer.m@email.com",
      phone: "(555) 890-1234",
      totalOrders: 19,
      totalSpent: 1980.8,
      lastOrder: "2026-02-22",
      status: "Active",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="mt-1 text-2xl">{customers.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Active Customers</p>
          <p className="mt-1 text-2xl">{activeCustomers}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Avg. Order Value</p>
          <p className="mt-1 text-2xl">Tzs {averageOrderValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search customers by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
        />
      </div>

      {/* Customers Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Orders</th>
                <th className="px-6 py-3 text-left">Total Spent</th>
                <th className="px-6 py-3 text-left">Last Order</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p>{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p>{customer.totalOrders}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>${customer.totalSpent.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{customer.lastOrder}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6">
            <h2 className="mb-4">Add New Customer</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="customer@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Phone Number</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Address</label>
                <textarea
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  rows={3}
                  placeholder="Enter customer address"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}