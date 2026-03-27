import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Minus, Trash2, Search, ArrowLeft, Save } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export function CreateOrder() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductSearch, setShowProductSearch] = useState(false);

  // Mock products data
  const products: Product[] = [
    { id: "P001", name: "Premium Ribeye Steak", category: "Beef", price: 45000, unit: "kg", stock: 25 },
    { id: "P002", name: "Ground Beef", category: "Beef", price: 18000, unit: "kg", stock: 50 },
    { id: "P003", name: "Beef Tenderloin", category: "Beef", price: 55000, unit: "kg", stock: 15 },
    { id: "P004", name: "T-Bone Steak", category: "Beef", price: 42000, unit: "kg", stock: 20 },
    { id: "P005", name: "Italian Sausages", category: "Processed", price: 28000, unit: "kg", stock: 30 },
    { id: "P006", name: "Beef Burgers", category: "Processed", price: 25000, unit: "kg", stock: 40 },
    { id: "P007", name: "Chicken Breast", category: "Poultry", price: 22000, unit: "kg", stock: 35 },
    { id: "P008", name: "Whole Chicken", category: "Poultry", price: 18000, unit: "kg", stock: 25 },
    { id: "P009", name: "Lamb Chops", category: "Lamb", price: 48000, unit: "kg", stock: 12 },
    { id: "P010", name: "Pork Ribs", category: "Pork", price: 32000, unit: "kg", stock: 18 },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProductToOrder = (product: Product) => {
    const existingItem = orderItems.find((item) => item.productId === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: OrderItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unit: product.unit,
        price: product.price,
        total: product.price,
      };
      setOrderItems([...orderItems, newItem]);
    }
    setSearchTerm("");
    setShowProductSearch(false);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setOrderItems(
      orderItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item to the order");
      return;
    }

    // In a real app, this would send the order to the backend
    console.log({
      customer: customerName,
      phone: customerPhone,
      paymentMethod,
      items: orderItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    });

    alert("Order created successfully!");
    navigate("/dashboard/orders");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="rounded-lg p-2 hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1>Create New Order</h1>
          <p className="text-muted-foreground">Add products and customer details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Section - Customer Info & Products */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer Information */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4">Customer Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="customerName" className="mb-2 block text-sm">
                    Customer Name *
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="mb-2 block text-sm">
                    Phone Number
                  </label>
                  <input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+255 XXX XXX XXX"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Add Products */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4">Order Items</h2>
              
              {/* Product Search */}
              <div className="relative mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products to add..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowProductSearch(e.target.value.length > 0);
                    }}
                    onFocus={() => searchTerm.length > 0 && setShowProductSearch(true)}
                    className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
                  />
                </div>

                {/* Product Search Results */}
                {showProductSearch && filteredProducts.length > 0 && (
                  <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addProductToOrder(product)}
                        className="flex w-full items-center justify-between border-b border-border p-3 text-left hover:bg-muted last:border-b-0"
                      >
                        <div>
                          <p>{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p>Tzs {product.price.toLocaleString()}/{product.unit}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Items List */}
              {orderItems.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                  <p className="text-muted-foreground">No items added yet</p>
                  <p className="text-sm text-muted-foreground">Search and select products to add to the order</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 rounded-lg border border-border p-4"
                    >
                      <div className="flex-1">
                        <p>{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Tzs {item.price.toLocaleString()}/{item.unit}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 0.5)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseFloat(e.target.value) || 0)}
                          step="0.5"
                          min="0.5"
                          className="w-16 rounded border border-border bg-input-background px-2 py-1 text-center outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 0.5)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <span className="ml-2 text-sm text-muted-foreground">{item.unit}</span>
                      </div>

                      {/* Item Total */}
                      <div className="w-32 text-right">
                        <p>Tzs {item.total.toLocaleString()}</p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="rounded p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Summary */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4">Payment Method</h3>
              <div className="space-y-2">
                {["Cash", "Credit Card", "Debit Card", "Mobile Money"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4"
                      style={{ accentColor: "#3d2817" }}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Items</p>
                  <p>{orderItems.length}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>Tzs {calculateSubtotal().toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Tax (7.5%)</p>
                  <p>Tzs {calculateTax().toLocaleString()}</p>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-lg">Total</p>
                    <p className="text-2xl">Tzs {calculateTotal().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={orderItems.length === 0 || !customerName.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                Create Order
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/orders")}
                className="w-full rounded-lg border border-border px-4 py-3 hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
