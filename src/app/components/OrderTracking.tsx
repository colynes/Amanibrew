import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Check, Package, Truck, CheckCircle, ArrowLeft, Clock } from "lucide-react";

interface TrackingStage {
  stage: string;
  status: "completed" | "in-progress" | "pending";
  timestamp: string | null;
}

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: any[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: string;
  trackingStages: TrackingStage[];
}

export function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("amani_brew_orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-4 text-2xl" style={{ color: "#3d2817" }}>
            Order not found
          </h2>
          <button
            onClick={() => navigate("/shop/products")}
            className="rounded-lg px-6 py-3 text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#3d2817" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const stages = [
    {
      id: "payment_fulfilled",
      title: "Payment Fulfilled",
      description: "Your payment has been processed",
      icon: CheckCircle,
    },
    {
      id: "dispatched",
      title: "Order Dispatched",
      description: "Your order is on its way",
      icon: Truck,
    },
    {
      id: "received",
      title: "Order Received",
      description: "Order delivered successfully",
      icon: Package,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <button
          onClick={() => navigate("/shop/products")}
          className="mb-6 flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "#3d2817" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping
        </button>

        {/* Success Message */}
        <div
          className="mb-8 rounded-lg border-2 p-6 text-center"
          style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
        >
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "#3d2817" }}
          >
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-2xl lg:text-3xl" style={{ color: "#3d2817" }}>
            Order Placed Successfully!
          </h1>
          <p className="mb-4" style={{ color: "#6b5d52" }}>
            Thank you for your order. We'll notify you when it's on the way.
          </p>
          <p className="text-sm" style={{ color: "#6b5d52" }}>
            Order ID: <span style={{ color: "#3d2817" }}>{order.id}</span>
          </p>
        </div>

        {/* Tracking Timeline */}
        <div className="mb-8 rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
          <h2 className="mb-6 text-xl" style={{ color: "#3d2817" }}>
            Order Tracking
          </h2>

          <div className="relative">
            {stages.map((stage, index) => {
              const trackingStage = order.trackingStages.find((ts) => ts.stage === stage.id);
              const isCompleted = trackingStage?.status === "completed";
              const isInProgress = trackingStage?.status === "in-progress";
              const isPending = trackingStage?.status === "pending";
              const Icon = stage.icon;

              return (
                <div key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Connector Line */}
                  {index < stages.length - 1 && (
                    <div
                      className="absolute left-6 top-12 h-full w-0.5"
                      style={{ backgroundColor: isCompleted ? "#3d2817" : "#c9a876" }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        isCompleted || isInProgress ? "text-white" : ""
                      }`}
                      style={{
                        backgroundColor: isCompleted || isInProgress ? "#3d2817" : "#c9a876",
                      }}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : isInProgress ? (
                        <Clock className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" style={{ color: "#3d2817" }} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="mb-1" style={{ color: "#3d2817" }}>
                      {stage.title}
                    </h3>
                    <p className="mb-2 text-sm" style={{ color: "#6b5d52" }}>
                      {stage.description}
                    </p>
                    {trackingStage?.timestamp && (
                      <p className="text-xs" style={{ color: "#c9a876" }}>
                        {new Date(trackingStage.timestamp).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    )}
                    {isInProgress && (
                      <span
                        className="mt-2 inline-block rounded-full px-3 py-1 text-xs text-white"
                        style={{ backgroundColor: "#c9a876" }}
                      >
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Delivery Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Customer Name
                </p>
                <p style={{ color: "#3d2817" }}>{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Email
                </p>
                <p style={{ color: "#3d2817" }}>{order.customer.email}</p>
              </div>
              {order.customer.phone && (
                <div>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Phone
                  </p>
                  <p style={{ color: "#3d2817" }}>{order.customer.phone}</p>
                </div>
              )}
              {order.customer.address && (
                <div className="sm:col-span-2">
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    Delivery Address
                  </p>
                  <p style={{ color: "#3d2817" }}>{order.customer.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-lg border p-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
            <h3 className="mb-4" style={{ color: "#3d2817" }}>
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                  style={{ borderColor: "#c9a876" }}
                >
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

            <div className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: "#c9a876" }}>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Subtotal
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {order.subtotal.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Delivery Fee
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {order.deliveryFee.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#6b5d52" }}>
                  Tax
                </p>
                <p style={{ color: "#3d2817" }}>Tzs {order.tax.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between border-t pt-2" style={{ borderColor: "#c9a876" }}>
                <p className="text-lg" style={{ color: "#3d2817" }}>
                  Total Paid
                </p>
                <p className="text-2xl" style={{ color: "#3d2817" }}>
                  Tzs {order.total.toLocaleString()}
                </p>
              </div>
              <p className="text-sm" style={{ color: "#6b5d52" }}>
                Payment Method: {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/shop/products")}
            className="rounded-lg px-6 py-3 text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#3d2817" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
