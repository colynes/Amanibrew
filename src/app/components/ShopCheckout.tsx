import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Smartphone, Banknote, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export function ShopCheckout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = 5000;
  const tax = subtotal * 0.075;
  const total = subtotal + deliveryFee + tax;

  const paymentMethods = [
    { id: "Mobile Money", name: "Mobile Money", icon: Smartphone, description: "M-Pesa, Tigo Pesa, Airtel Money" },
    { id: "Cash", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive your order" },
    { id: "Card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard" },
  ];

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      navigate("/shop/cart");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order in localStorage (in real app, this would be API call)
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customer: {
        name: user?.name || "Guest",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
      },
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      paymentMethod,
      status: "payment_fulfilled",
      trackingStages: [
        {
          stage: "payment_fulfilled",
          status: "completed",
          timestamp: new Date().toISOString(),
        },
        {
          stage: "dispatched",
          status: "pending",
          timestamp: null,
        },
        {
          stage: "received",
          status: "pending",
          timestamp: null,
        },
      ],
    };

    // Save order
    const existingOrders = JSON.parse(localStorage.getItem("amani_brew_orders") || "[]");
    localStorage.setItem("amani_brew_orders", JSON.stringify([...existingOrders, order]));

    clearCart();
    navigate(`/shop/order-tracking/${order.id}`);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
          Checkout
        </h1>
        <p className="mb-8 text-lg" style={{ color: "#6b5d52" }}>
          Review your order and complete payment
        </p>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4 flex items-center gap-2" style={{ color: "#3d2817" }}>
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style={{ backgroundColor: "#3d2817" }}
              >
                <Check className="h-4 w-4" />
              </div>
              Customer Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Name
                </p>
                <p style={{ color: "#3d2817" }}>{user.name}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Email
                </p>
                <p style={{ color: "#3d2817" }}>{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Phone
                  </p>
                  <p style={{ color: "#3d2817" }}>{user.phone}</p>
                </div>
              )}
              {user.address && (
                <div className="sm:col-span-2">
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Delivery Address
                  </p>
                  <p style={{ color: "#3d2817" }}>{user.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Order Items ({items.length})
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-3" style={{ borderColor: "#c9a876" }}>
                  <div className="flex-1">
                    <p style={{ color: "#3d2817" }}>{item.name}</p>
                    <p className="text-sm" style={{ color: "#6b5d52" }}>
                      {item.quantity} kg × Tzs {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p style={{ color: "#3d2817" }}>Tzs {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Payment Method
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${
                      paymentMethod === method.id ? "ring-2" : ""
                    }`}
                    style={{
                      borderColor: "#c9a876",
                      ...(paymentMethod === method.id && { ringColor: "#3d2817" }),
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 h-4 w-4"
                      style={{ accentColor: "#3d2817" }}
                    />
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#c9a876" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#3d2817" }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ color: "#3d2817" }}>{method.name}</p>
                      <p className="text-sm" style={{ color: "#6b5d52" }}>
                        {method.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Subtotal
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Delivery Fee
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {deliveryFee.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Tax (7.5%)
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {tax.toLocaleString()}</p>
              </div>
              <div className="border-t pt-3" style={{ borderColor: "#c9a876" }}>
                <div className="flex items-center justify-between">
                  <p className="text-lg" style={{ color: "#3d2817" }}>
                    Total
                  </p>
                  <p className="text-2xl" style={{ color: "#3d2817" }}>
                    Tzs {total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="mt-6 w-full rounded-lg px-6 py-3 text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#3d2817" }}
            >
              {isProcessing ? "Processing..." : `Pay Tzs ${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
