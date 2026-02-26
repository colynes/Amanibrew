import { useState } from "react";
import { Calendar, Download, Printer, Filter, FileText, DollarSign, Users, ShoppingCart, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface ReportData {
  id: string;
  date: string;
  customer: string;
  customerType: "Regular" | "Subscription" | "Wholesale" | "Walk-in";
  orderType: string;
  items: number;
  amount: number;
  paymentStatus: "Paid" | "Pending";
  paymentMethod: string;
}

export function Reports() {
  const [dateFrom, setDateFrom] = useState("2026-02-01");
  const [dateTo, setDateTo] = useState("2026-02-26");
  const [customerType, setCustomerType] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [reportType, setReportType] = useState("all");

  const reportData: ReportData[] = [
    {
      id: "ORD-1234",
      date: "2026-02-25",
      customer: "John Smith",
      customerType: "Subscription",
      orderType: "Weekly Delivery",
      items: 5,
      amount: 145.50,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1235",
      date: "2026-02-25",
      customer: "Sarah Johnson",
      customerType: "Regular",
      orderType: "One-time Purchase",
      items: 3,
      amount: 98.20,
      paymentStatus: "Pending",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1236",
      date: "2026-02-24",
      customer: "Mike Davis",
      customerType: "Wholesale",
      orderType: "Bulk Order",
      items: 7,
      amount: 234.80,
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "ORD-1237",
      date: "2026-02-24",
      customer: "Emily Brown",
      customerType: "Regular",
      orderType: "One-time Purchase",
      items: 2,
      amount: 65.40,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1238",
      date: "2026-02-23",
      customer: "David Wilson",
      customerType: "Subscription",
      orderType: "Monthly Delivery",
      items: 4,
      amount: 178.90,
      paymentStatus: "Pending",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-1239",
      date: "2026-02-23",
      customer: "Lisa Anderson",
      customerType: "Regular",
      orderType: "One-time Purchase",
      items: 6,
      amount: 212.30,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1240",
      date: "2026-02-22",
      customer: "Restaurant ABC",
      customerType: "Wholesale",
      orderType: "Bulk Order",
      items: 12,
      amount: 450.00,
      paymentStatus: "Pending",
      paymentMethod: "Invoice",
    },
    {
      id: "ORD-1241",
      date: "2026-02-22",
      customer: "Jennifer Martin",
      customerType: "Walk-in",
      orderType: "One-time Purchase",
      items: 5,
      amount: 156.80,
      paymentStatus: "Paid",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1242",
      date: "2026-02-21",
      customer: "Robert Taylor",
      customerType: "Subscription",
      orderType: "Weekly Delivery",
      items: 4,
      amount: 92.50,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1243",
      date: "2026-02-21",
      customer: "Hotel XYZ",
      customerType: "Wholesale",
      orderType: "Bulk Order",
      items: 15,
      amount: 680.00,
      paymentStatus: "Pending",
      paymentMethod: "Invoice",
    },
    {
      id: "ORD-1244",
      date: "2026-02-20",
      customer: "Amanda White",
      customerType: "Regular",
      orderType: "One-time Purchase",
      items: 3,
      amount: 87.40,
      paymentStatus: "Paid",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-1245",
      date: "2026-02-20",
      customer: "Mark Johnson",
      customerType: "Walk-in",
      orderType: "One-time Purchase",
      items: 2,
      amount: 54.90,
      paymentStatus: "Paid",
      paymentMethod: "Cash",
    },
    {
      id: "ORD-1246",
      date: "2026-02-19",
      customer: "Susan Lee",
      customerType: "Subscription",
      orderType: "Monthly Delivery",
      items: 8,
      amount: 245.00,
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1247",
      date: "2026-02-19",
      customer: "Tom Brown",
      customerType: "Regular",
      orderType: "One-time Purchase",
      items: 4,
      amount: 125.60,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-1248",
      date: "2026-02-18",
      customer: "Restaurant DEF",
      customerType: "Wholesale",
      orderType: "Bulk Order",
      items: 10,
      amount: 380.00,
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
    },
  ];

  const filteredData = reportData.filter((item) => {
    const itemDate = new Date(item.date);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    
    const matchesDate = itemDate >= fromDate && itemDate <= toDate;
    const matchesCustomerType = customerType === "All" || item.customerType === customerType;
    const matchesPaymentStatus = paymentStatus === "All" || item.paymentStatus === paymentStatus;
    
    return matchesDate && matchesCustomerType && matchesPaymentStatus;
  });

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const paidRevenue = filteredData
    .filter((item) => item.paymentStatus === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);
  const pendingRevenue = filteredData
    .filter((item) => item.paymentStatus === "Pending")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalOrders = filteredData.length;
  const paidOrders = filteredData.filter((item) => item.paymentStatus === "Paid").length;
  const pendingOrders = filteredData.filter((item) => item.paymentStatus === "Pending").length;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csvContent = [
      ["Order ID", "Date", "Customer", "Customer Type", "Order Type", "Items", "Amount", "Payment Status", "Payment Method"],
      ...filteredData.map((item) => [
        item.id,
        item.date,
        item.customer,
        item.customerType,
        item.orderType,
        item.items,
        item.amount.toFixed(2),
        item.paymentStatus,
        item.paymentMethod,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${dateFrom}-to-${dateTo}.csv`;
    a.click();
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        "Order ID": item.id,
        "Date": item.date,
        "Customer": item.customer,
        "Customer Type": item.customerType,
        "Order Type": item.orderType,
        "Items": item.items,
        "Amount": item.amount.toFixed(2),
        "Payment Status": item.paymentStatus,
        "Payment Method": item.paymentMethod,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    
    // Add summary row
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [],
        ["Summary"],
        ["Total Revenue", `$${totalRevenue.toFixed(2)}`],
        ["Total Orders", totalOrders],
        ["Paid Orders", paidOrders],
        ["Pending Orders", pendingOrders],
      ],
      { origin: -1 }
    );

    XLSX.writeFile(workbook, `amani-brew-report-${dateFrom}-to-${dateTo}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Amani Brew - Sales Report", 14, 20);
    
    // Add report details
    doc.setFontSize(11);
    doc.text(`Report Period: ${dateFrom} to ${dateTo}`, 14, 30);
    doc.text(`Customer Type: ${customerType}`, 14, 36);
    doc.text(`Payment Status: ${paymentStatus}`, 14, 42);
    
    // Add summary
    doc.setFontSize(12);
    doc.text("Summary", 14, 52);
    doc.setFontSize(10);
    doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`, 14, 58);
    doc.text(`Total Orders: ${totalOrders}`, 14, 64);
    doc.text(`Paid: $${paidRevenue.toFixed(2)} (${paidOrders} orders)`, 14, 70);
    doc.text(`Pending: $${pendingRevenue.toFixed(2)} (${pendingOrders} orders)`, 14, 76);
    
    // Add table
    autoTable(doc, {
      startY: 85,
      head: [["Order ID", "Date", "Customer", "Type", "Items", "Amount", "Status"]],
      body: filteredData.map((item) => [
        item.id,
        item.date,
        item.customer,
        item.customerType,
        item.items,
        `$${item.amount.toFixed(2)}`,
        item.paymentStatus,
      ]),
      theme: "striped",
      headStyles: { fillColor: [61, 40, 23] },
      styles: { fontSize: 8 },
    });
    
    doc.save(`amani-brew-report-${dateFrom}-to-${dateTo}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export custom reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 hover:bg-muted"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3>Report Filters</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Date From</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Date To</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Customer Type</label>
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
            >
              <option value="All">All Types</option>
              <option value="Regular">Regular</option>
              <option value="Subscription">Subscription</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
            >
              <option value="all">All Transactions</option>
              <option value="sales">Sales Report</option>
              <option value="payment">Payment Report</option>
              <option value="customer">Customer Report</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <div className="mt-2 flex gap-2 text-xs">
              <span className="text-green-600">Paid: ${paidRevenue.toFixed(2)}</span>
              <span className="text-orange-600">Pending: ${pendingRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{totalOrders}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <div className="mt-2 flex gap-2 text-xs">
              <span className="text-green-600">Paid: {paidOrders}</span>
              <span className="text-orange-600">Pending: {pendingOrders}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">{new Set(filteredData.map((item) => item.customer)).size}</p>
            <p className="text-sm text-muted-foreground">Unique Customers</p>
            <div className="mt-2 text-xs text-muted-foreground">
              In selected period
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl">${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00"}</p>
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <div className="mt-2 text-xs text-muted-foreground">
              Per transaction
            </div>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3>Report Results</h3>
              <p className="text-sm text-muted-foreground">
                Showing {filteredData.length} transactions from {dateFrom} to {dateTo}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Order Type</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{item.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{item.customer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        {item.customerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{item.orderType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{item.items}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">${item.amount.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs ${
                          item.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground">{item.paymentMethod}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No transactions found for the selected filters</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your date range or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="border-t border-border bg-muted/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total: {filteredData.length} transactions
              </p>
              <p className="font-medium">
                Total Amount: ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Customer Type Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Revenue by Customer Type</h3>
          <div className="space-y-3">
            {["Regular", "Subscription", "Wholesale", "Walk-in"].map((type) => {
              const typeData = filteredData.filter((item) => item.customerType === type);
              const typeRevenue = typeData.reduce((sum, item) => sum + item.amount, 0);
              const percentage = totalRevenue > 0 ? (typeRevenue / totalRevenue) * 100 : 0;

              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{type}</span>
                    <span className="font-medium">${typeRevenue.toFixed(2)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {typeData.length} orders ({percentage.toFixed(1)}%)
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4">Payment Status Summary</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Paid Orders</p>
                  <p className="mt-1 text-2xl text-green-900">${paidRevenue.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl text-green-600">{paidOrders}</p>
                  <p className="text-xs text-green-700">orders</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-orange-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Pending Orders</p>
                  <p className="mt-1 text-2xl text-orange-900">${pendingRevenue.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl text-orange-600">{pendingOrders}</p>
                  <p className="text-xs text-orange-700">orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}