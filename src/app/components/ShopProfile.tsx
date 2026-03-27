import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Package, Edit2, Save } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: any[];
}

export function ShopProfile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhone, setEditedPhone] = useState(user?.phone || "");
  const [editedAddress, setEditedAddress] = useState(user?.address || "");

  useEffect(() => {
    // Load user's orders
    const allOrders = JSON.parse(localStorage.getItem("amani_brew_orders") || "[]");
    const userOrders = allOrders.filter((o: Order) => o.customer?.email === user?.email);
    setOrders(userOrders);
  }, [user]);

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    if (user) {
      const updatedUser = { ...user, phone: editedPhone, address: editedAddress };
      localStorage.setItem("amani_brew_user", JSON.stringify(updatedUser));
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-4 text-2xl" style={{ color: "#3d2817" }}>
            Please login to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
          My Profile
        </h1>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl" style={{ color: "#3d2817" }}>
                Personal Information
              </h2>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: isEditing ? "#3d2817" : "#c9a876", color: isEditing ? "#ffffff" : "#3d2817" }}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#c9a876" }}
                >
                  <User className="h-5 w-5" style={{ color: "#3d2817" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Full Name
                  </p>
                  <p style={{ color: "#3d2817" }}>{user.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#c9a876" }}
                >
                  <Mail className="h-5 w-5" style={{ color: "#3d2817" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Email Address
                  </p>
                  <p style={{ color: "#3d2817" }}>{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#c9a876" }}
                >
                  <Phone className="h-5 w-5" style={{ color: "#3d2817" }} />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm" style={{ color: "#6b5d52" }}>
                    Phone Number
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      placeholder="+255 XXX XXX XXX"
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                      style={{ borderColor: "#c9a876" }}
                    />
                  ) : (
                    <p style={{ color: "#3d2817" }}>{user.phone || "Not set"}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#c9a876" }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#3d2817" }} />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm" style={{ color: "#6b5d52" }}>
                    Delivery Address
                  </p>
                  {isEditing ? (
                    <textarea
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      rows={3}
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                      style={{ borderColor: "#c9a876" }}
                    />
                  ) : (
                    <p style={{ color: "#3d2817" }}>{user.address || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h2 className="mb-6 text-xl" style={{ color: "#3d2817" }}>
              Order History
            </h2>

            {orders.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed p-8 text-center" style={{ borderColor: "#c9a876" }}>
                <Package className="mx-auto mb-4 h-12 w-12" style={{ color: "#c9a876" }} />
                <p style={{ color: "#6b5d52" }}>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border p-4"
                    style={{ borderColor: "#c9a876" }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="mb-1" style={{ color: "#3d2817" }}>
                          Order #{order.id}
                        </p>
                        <p className="text-sm" style={{ color: "#6b5d52" }}>
                          {new Date(order.date).toLocaleDateString("en-US", {
                            dateStyle: "long",
                          })}
                        </p>
                      </div>
                      <p className="text-lg" style={{ color: "#3d2817" }}>
                        Tzs {order.total.toLocaleString()}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1 text-sm" style={{ color: "#6b5d52" }}>
                        Items ({order.items.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="rounded-full px-3 py-1 text-xs"
                            style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
                          >
                            {item.name}
                          </span>
                        ))}
                        {order.items.length > 3 && (
                          <span
                            className="rounded-full px-3 py-1 text-xs"
                            style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
                          >
                            +{order.items.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: order.status === "payment_fulfilled" ? "#3d2817" : "#c9a876",
                          color: "#ffffff",
                        }}
                      >
                        {order.status === "payment_fulfilled" ? "Confirmed" : order.status}
                      </span>
                      <a
                        href={`/shop/order-tracking/${order.id}`}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "#3d2817" }}
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
