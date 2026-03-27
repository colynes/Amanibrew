import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, MapPin, Edit } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export function ShopCart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [pickupTime, setPickupTime] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = deliveryMethod === "delivery" ? 5000 : 0;
  const tax = subtotal * 0.075; // 7.5% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (deliveryMethod === "delivery" && !deliveryAddress.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    if (deliveryMethod === "pickup" && !pickupTime) {
      alert("Please select a pickup time");
      return;
    }

    navigate("/shop/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-md text-center">
          <div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: "#c9a876" }}
          >
            <ShoppingBag className="h-12 w-12" style={{ color: "#3d2817" }} />
          </div>
          <h2 className="mb-4 text-2xl" style={{ color: "#3d2817" }}>
            Your cart is empty
          </h2>
          <p className="mb-6" style={{ color: "#6b5d52" }}>
            Start adding products to your cart to continue shopping
          </p>
          <button
            onClick={() => navigate("/shop/products")}
            className="rounded-lg px-6 py-3 text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#3d2817" }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/shop/products")}
          className="mb-4 flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "#3d2817" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>
        <h1 className="text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
          Shopping Cart
        </h1>
        <p className="text-lg" style={{ color: "#6b5d52" }}>
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border p-4"
              style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              )}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="mb-1" style={{ color: "#3d2817" }}>
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    {item.category}
                  </p>
                  <p className="mt-1" style={{ color: "#3d2817" }}>
                    Tzs {item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                      className="flex h-8 w-8 items-center justify-center rounded border transition-colors hover:bg-muted"
                      style={{ borderColor: "#c9a876" }}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-16 text-center" style={{ color: "#3d2817" }}>
                      {item.quantity} kg
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                      className="flex h-8 w-8 items-center justify-center rounded border transition-colors hover:bg-muted"
                      style={{ borderColor: "#c9a876" }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg" style={{ color: "#3d2817" }}>
                      Tzs {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded p-2 text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Products Button */}
          <button
            onClick={() => navigate("/shop/products")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-4 transition-colors hover:bg-muted"
            style={{ borderColor: "#c9a876" }}
          >
            <Plus className="h-5 w-5" style={{ color: "#3d2817" }} />
            <span style={{ color: "#3d2817" }}>Add More Products</span>
          </button>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Delivery Method */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Delivery Method
            </h3>
            <div className="space-y-3">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  deliveryMethod === "delivery" ? "ring-2" : ""
                }`}
                style={{
                  borderColor: "#c9a876",
                  ...(deliveryMethod === "delivery" && { ringColor: "#3d2817" }),
                }}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={(e) => setDeliveryMethod(e.target.value as "delivery")}
                  className="h-4 w-4"
                  style={{ accentColor: "#3d2817" }}
                />
                <div className="flex-1">
                  <p style={{ color: "#3d2817" }}>Home Delivery</p>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Delivery fee: Tzs 5,000
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                  deliveryMethod === "pickup" ? "ring-2" : ""
                }`}
                style={{
                  borderColor: "#c9a876",
                  ...(deliveryMethod === "pickup" && { ringColor: "#3d2817" }),
                }}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={(e) => setDeliveryMethod(e.target.value as "pickup")}
                  className="h-4 w-4"
                  style={{ accentColor: "#3d2817" }}
                />
                <div className="flex-1">
                  <p style={{ color: "#3d2817" }}>Pickup</p>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Free
                  </p>
                </div>
              </label>
            </div>

            {/* Delivery Address or Pickup Time */}
            {deliveryMethod === "delivery" && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm" style={{ color: "#3d2817" }}>
                    Delivery Address
                  </label>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
                    style={{ color: "#c9a876" }}
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                </div>
                {isEditingAddress ? (
                  <div className="space-y-2">
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter delivery address"
                      rows={3}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                      style={{ borderColor: "#c9a876" }}
                    />
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="w-full rounded-lg px-4 py-2 text-sm text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#3d2817" }}
                    >
                      Save Address
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-start gap-2 rounded-lg border p-3"
                    style={{ borderColor: "#c9a876" }}
                  >
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#6b5d52" }} />
                    <p className="text-sm" style={{ color: "#3d2817" }}>
                      {deliveryAddress || "No address set"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {deliveryMethod === "pickup" && (
              <div className="mt-4">
                <label className="mb-2 block text-sm" style={{ color: "#3d2817" }}>
                  Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
                  style={{ borderColor: "#c9a876" }}
                >
                  <option value="">Select pickup time</option>
                  <option value="09:00">9:00 AM - 10:00 AM</option>
                  <option value="10:00">10:00 AM - 11:00 AM</option>
                  <option value="11:00">11:00 AM - 12:00 PM</option>
                  <option value="14:00">2:00 PM - 3:00 PM</option>
                  <option value="15:00">3:00 PM - 4:00 PM</option>
                  <option value="16:00">4:00 PM - 5:00 PM</option>
                </select>
              </div>
            )}
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
              {deliveryMethod === "delivery" && (
                <div className="flex items-center justify-between">
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Delivery Fee
                  </p>
                  <p style={{ color: "#3d2817" }}>Tzs {deliveryFee.toLocaleString()}</p>
                </div>
              )}
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
              onClick={handleCheckout}
              className="mt-6 w-full rounded-lg px-6 py-3 text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#3d2817" }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
