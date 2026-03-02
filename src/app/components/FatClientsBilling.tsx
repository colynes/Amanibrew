import { useState } from "react";
import { Plus, Search, Eye, Download, Bell, Calendar } from "lucide-react";

interface Invoice {
  id: string;
  customer: string;
  subscriptionId: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  createdDate: string;
  paidDate?: string;
  paymentMethod?: string;
  notificationSent: boolean;
}

export function FatClientsBilling() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: "INV-2026-001",
      customer: "John Smith",
      subscriptionId: "SUB-001",
      amount: 95500,
      dueDate: "2026-02-28",
      status: "Paid",
      createdDate: "2026-02-21",
      paidDate: "2026-02-25",
      paymentMethod: "M-Pesa",
      notificationSent: true,
    },
    {
      id: "INV-2026-002",
      customer: "Sarah Johnson",
      subscriptionId: "SUB-002",
      amount: 180000,
      dueDate: "2026-03-01",
      status: "Pending",
      createdDate: "2026-02-22",
      notificationSent: true,
    },
    {
      id: "INV-2026-003",
      customer: "Mike Davis",
      subscriptionId: "SUB-003",
      amount: 78900,
      dueDate: "2026-02-25",
      status: "Overdue",
      createdDate: "2026-02-18",
      notificationSent: true,
    },
    {
      id: "INV-2026-004",
      customer: "Emily Brown",
      subscriptionId: "SUB-004",
      amount: 245000,
      dueDate: "2026-03-10",
      status: "Pending",
      createdDate: "2026-02-26",
      notificationSent: false,
    },
  ];

  const statuses = ["All", "Paid", "Pending", "Overdue"];

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || inv.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getNotificationInfo = (invoice: Invoice) => {
    const dueDate = new Date(invoice.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (invoice.status === "Paid") {
      return { message: "Payment received", color: "text-green-600" };
    }

    if (daysUntilDue <= 1) {
      return { message: "Due tomorrow - Notify customer", color: "text-red-600" };
    } else if (daysUntilDue <= 2) {
      return { message: "Due in 2 days - Send reminder", color: "text-orange-600" };
    } else if (daysUntilDue <= 7) {
      return { message: "Due in 1 week - Notify customer", color: "text-yellow-600" };
    }

    return { message: "No action needed", color: "text-muted-foreground" };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>Billing & Invoices</h2>
          <p className="text-sm text-muted-foreground">Manage invoices and payment tracking</p>
        </div>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Received</p>
          <p className="mt-1 text-2xl text-green-600">Tsh {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="mt-1 text-2xl text-orange-600">Tsh {pendingAmount.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Overdue Payments</p>
          <p className="mt-1 text-2xl text-red-600">Tsh {overdueAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
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

      {/* Invoices Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Invoice</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Due Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Notification</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.map((invoice) => {
                const notificationInfo = getNotificationInfo(invoice);
                return (
                  <tr key={invoice.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{invoice.subscriptionId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{invoice.customer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">Tsh {invoice.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{invoice.dueDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Bell className={`h-4 w-4 ${notificationInfo.color}`} />
                        <p className={`text-xs ${notificationInfo.color}`}>
                          {notificationInfo.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="rounded-lg p-2 hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 hover:bg-muted">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6">
            <h2 className="mb-4">Create New Invoice</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Customer / Subscription</label>
                <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                  <option>John Smith - SUB-001</option>
                  <option>Sarah Johnson - SUB-002</option>
                  <option>Mike Davis - SUB-003</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm">Amount (Tsh)</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="95500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Due Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
