import { useState } from "react";
import { Plus, Search, Edit, Trash2, Calendar, Package, User, DollarSign } from "lucide-react";

interface Subscription {
  id: string;
  customer: string;
  email: string;
  phone: string;
  plan: "Weekly" | "Monthly";
  items: string[];
  totalValue: number;
  startDate: string;
  nextDelivery: string;
  status: "Active" | "Paused" | "Cancelled";
  deliveryDay: string;
}

export function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const subscriptions: Subscription[] = [
    {
      id: "SUB-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      plan: "Weekly",
      items: ["Premium Ribeye 2kg", "Ground Beef 3kg", "Chicken Breast 2kg"],
      totalValue: 95.50,
      startDate: "2026-01-15",
      nextDelivery: "2026-02-28",
      status: "Active",
      deliveryDay: "Friday",
    },
    {
      id: "SUB-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      plan: "Monthly",
      items: ["Mixed Pack 10kg", "Sausages 2kg"],
      totalValue: 180.00,
      startDate: "2026-01-01",
      nextDelivery: "2026-03-01",
      status: "Active",
      deliveryDay: "Saturday",
    },
    {
      id: "SUB-003",
      customer: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      plan: "Weekly",
      items: ["Pork Chops 2kg", "Bacon 1kg", "Ground Beef 2kg"],
      totalValue: 78.90,
      startDate: "2026-02-01",
      nextDelivery: "2026-03-01",
      status: "Active",
      deliveryDay: "Thursday",
    },
    {
      id: "SUB-004",
      customer: "Emily Brown",
      email: "emily.b@email.com",
      phone: "(555) 456-7890",
      plan: "Monthly",
      items: ["Premium Selection 15kg"],
      totalValue: 245.00,
      startDate: "2025-12-10",
      nextDelivery: "2026-03-10",
      status: "Active",
      deliveryDay: "Monday",
    },
    {
      id: "SUB-005",
      customer: "David Wilson",
      email: "d.wilson@email.com",
      phone: "(555) 567-8901",
      plan: "Weekly",
      items: ["Chicken Variety 3kg", "Sausages 1kg"],
      totalValue: 62.50,
      startDate: "2026-01-20",
      nextDelivery: "2026-02-27",
      status: "Paused",
      deliveryDay: "Wednesday",
    },
    {
      id: "SUB-006",
      customer: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "(555) 678-9012",
      plan: "Monthly",
      items: ["Beef Pack 8kg", "Lamb Chops 2kg"],
      totalValue: 195.00,
      startDate: "2026-02-05",
      nextDelivery: "2026-03-05",
      status: "Active",
      deliveryDay: "Tuesday",
    },
  ];

  const plans = ["All", "Weekly", "Monthly"];

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "All" || sub.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const activeSubscriptions = subscriptions.filter((s) => s.status === "Active").length;
  const monthlyRevenue = subscriptions
    .filter((s) => s.status === "Active")
    .reduce((sum, s) => {
      const multiplier = s.plan === "Weekly" ? 4 : 1;
      return sum + s.totalValue * multiplier;
    }, 0);
  const weeklySubscribers = subscriptions.filter((s) => s.plan === "Weekly" && s.status === "Active").length;
  const monthlySubscribers = subscriptions.filter((s) => s.plan === "Monthly" && s.status === "Active").length;

  const getStatusColor = (status: Subscription["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Paused":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Subscription Management</h1>
          <p className="text-muted-foreground">Manage weekly and monthly meat subscriptions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          New Subscription
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{activeSubscriptions}</p>
            <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">${monthlyRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Monthly Recurring Revenue</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{weeklySubscribers}</p>
            <p className="text-sm text-muted-foreground">Weekly Subscribers</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{monthlySubscribers}</p>
            <p className="text-sm text-muted-foreground">Monthly Subscribers</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
          >
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Plan</th>
                <th className="px-6 py-3 text-left">Value</th>
                <th className="px-6 py-3 text-left">Delivery Day</th>
                <th className="px-6 py-3 text-left">Next Delivery</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{sub.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p>{sub.customer}</p>
                      <p className="text-sm text-muted-foreground">{sub.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p>${sub.totalValue.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{sub.deliveryDay}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{sub.nextDelivery}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm ${getStatusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
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

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-card p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4">Create New Subscription</h2>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Customer Name</label>
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Subscription Plan</label>
                  <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Delivery Day</label>
                  <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm">Start Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm">Subscription Items</label>
                <textarea
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  rows={3}
                  placeholder="Enter items (e.g., Premium Ribeye 2kg, Ground Beef 3kg)"
                ></textarea>
              </div>

              <div>
                <label className="mb-1 block text-sm">Total Value ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm">Delivery Address</label>
                <textarea
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  rows={2}
                  placeholder="Enter delivery address"
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
                  Create Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
