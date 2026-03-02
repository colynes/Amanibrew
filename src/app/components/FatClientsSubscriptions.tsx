import { useState } from "react";
import { Plus, Search, Edit, Trash2, Calendar, Package } from "lucide-react";

interface Subscription {
  id: string;
  customer: string;
  email: string;
  phone: string;
  frequency: "Daily" | "Twice Weekly" | "Weekly" | "Bi-weekly" | "Monthly";
  deliveryDays: string[];
  products: Array<{ name: string; quantity: number; unit: string }>;
  totalValue: number;
  startDate: string;
  nextDelivery: string;
  status: "Active" | "Paused" | "Cancelled";
}

export function FatClientsSubscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: string; quantity: number }>>([]);

  const subscriptions: Subscription[] = [
    {
      id: "SUB-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      phone: "+255 712 345 678",
      frequency: "Weekly",
      deliveryDays: ["Friday"],
      products: [
        { name: "Premium Ribeye", quantity: 2, unit: "kg" },
        { name: "Ground Beef", quantity: 3, unit: "kg" },
        { name: "Chicken Breast", quantity: 2, unit: "kg" },
      ],
      totalValue: 95500,
      startDate: "2026-01-15",
      nextDelivery: "2026-02-28",
      status: "Active",
    },
    {
      id: "SUB-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+255 713 456 789",
      frequency: "Monthly",
      deliveryDays: ["First Saturday"],
      products: [
        { name: "Mixed Pack", quantity: 10, unit: "kg" },
        { name: "Sausages", quantity: 2, unit: "kg" },
      ],
      totalValue: 180000,
      startDate: "2026-01-01",
      nextDelivery: "2026-03-01",
      status: "Active",
    },
    {
      id: "SUB-003",
      customer: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+255 714 567 890",
      frequency: "Twice Weekly",
      deliveryDays: ["Tuesday", "Thursday"],
      products: [
        { name: "Pork Chops", quantity: 2, unit: "kg" },
        { name: "Bacon", quantity: 1, unit: "kg" },
      ],
      totalValue: 78900,
      startDate: "2026-02-01",
      nextDelivery: "2026-02-27",
      status: "Active",
    },
    {
      id: "SUB-007",
      customer: "Tom Wilson",
      email: "tom.w@email.com",
      phone: "+255 717 890 123",
      frequency: "Daily",
      deliveryDays: ["Weekdays"],
      products: [{ name: "Mixed Pack", quantity: 5, unit: "kg" }],
      totalValue: 450000,
      startDate: "2026-02-10",
      nextDelivery: "2026-02-27",
      status: "Active",
    },
  ];

  const frequencies = ["All", "Daily", "Twice Weekly", "Weekly", "Bi-weekly", "Monthly"];
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const availableProducts = ["Premium Ribeye", "Ground Beef", "Chicken Breast", "Pork Chops", "Bacon", "Sausages", "Mixed Pack"];

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrequency = selectedFrequency === "All" || sub.frequency === selectedFrequency;
    return matchesSearch && matchesFrequency;
  });

  const formatDeliveryDays = (days: string[], frequency: string) => {
    if (days.includes("Weekdays") || days.length >= 5) {
      return "Weekdays";
    }
    if (days.length > 5) {
      return "Except " + ["Sunday"].join(", ");
    }
    return days.join(", ");
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addProduct = () => {
    setSelectedProducts([...selectedProducts, { product: "", quantity: 0 }]);
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: "product" | "quantity", value: string | number) => {
    const updated = [...selectedProducts];
    updated[index][field] = value as any;
    setSelectedProducts(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>Subscriptions</h2>
          <p className="text-sm text-muted-foreground">Manage customer subscriptions and delivery schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          New Subscription
        </button>
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
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
          >
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>
                {freq}
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
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Frequency</th>
                <th className="px-6 py-3 text-left">Delivery Days</th>
                <th className="px-6 py-3 text-left">Products</th>
                <th className="px-6 py-3 text-left">Value</th>
                <th className="px-6 py-3 text-left">Next Delivery</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{sub.customer}</p>
                      <p className="text-xs text-muted-foreground">{sub.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {sub.frequency}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{formatDeliveryDays(sub.deliveryDays, sub.frequency)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {sub.products.map((prod, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">
                          {prod.name} - {prod.quantity}{prod.unit}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">Tsh {sub.totalValue.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{sub.nextDelivery}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs ${
                        sub.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : sub.status === "Paused"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
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
          <div className="w-full max-w-3xl rounded-lg bg-card p-6 max-h-[90vh] overflow-y-auto">
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
                  <label className="mb-1 block text-sm">Phone</label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="+255 712 345 678"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Frequency</label>
                  <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                    <option>Daily</option>
                    <option>Twice Weekly</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm">Delivery Days</label>
                <div className="grid grid-cols-4 gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        selectedDays.includes(day)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-input-background hover:bg-muted"
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm">Products</label>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="text-sm text-primary hover:underline"
                  >
                    + Add Product
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedProducts.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <select
                        value={item.product}
                        onChange={(e) => updateProduct(index, "product", e.target.value)}
                        className="flex-1 rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                      >
                        <option value="">Select product</option>
                        {availableProducts.map((prod) => (
                          <option key={prod} value={prod}>
                            {prod}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateProduct(index, "quantity", parseFloat(e.target.value))}
                        className="w-24 rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                        placeholder="Qty"
                      />
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="rounded-lg p-2 hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm">Start Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedDays([]);
                    setSelectedProducts([]);
                  }}
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
