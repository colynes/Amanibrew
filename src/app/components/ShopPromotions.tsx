import { Tag, Clock, TrendingDown, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  products: Array<{
    id: string;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    category: string;
    image?: string;
  }>;
  featured: boolean;
}

export function ShopPromotions() {
  const { addItem } = useCart();
  const [notification, setNotification] = useState("");

  // Mock promotions data (Admin would create these)
  const promotions: Promotion[] = [
    {
      id: "PROMO001",
      title: "Weekend Mega Deal",
      description: "Save big on premium cuts this weekend!",
      discount: 25,
      validUntil: "2026-03-28",
      featured: true,
      products: [
        {
          id: "P001",
          name: "Premium Ribeye Steak",
          originalPrice: 45000,
          discountedPrice: 33750,
          category: "Beef",
          image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400",
        },
        {
          id: "P003",
          name: "Beef Tenderloin",
          originalPrice: 55000,
          discountedPrice: 41250,
          category: "Beef",
          image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
        },
      ],
    },
    {
      id: "PROMO002",
      title: "Family Pack Special",
      description: "Stock up and save on bulk purchases",
      discount: 15,
      validUntil: "2026-04-05",
      featured: false,
      products: [
        {
          id: "P002",
          name: "Ground Beef",
          originalPrice: 18000,
          discountedPrice: 15300,
          category: "Beef",
          image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400",
        },
        {
          id: "P007",
          name: "Chicken Breast",
          originalPrice: 22000,
          discountedPrice: 18700,
          category: "Poultry",
          image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
        },
        {
          id: "P008",
          name: "Whole Chicken",
          originalPrice: 18000,
          discountedPrice: 15300,
          category: "Poultry",
          image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400",
        },
      ],
    },
    {
      id: "PROMO003",
      title: "BBQ Season Starter",
      description: "Perfect for your next barbecue party",
      discount: 20,
      validUntil: "2026-03-31",
      featured: true,
      products: [
        {
          id: "P010",
          name: "Pork Ribs",
          originalPrice: 32000,
          discountedPrice: 25600,
          category: "Pork",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
        },
        {
          id: "P005",
          name: "Italian Sausages",
          originalPrice: 28000,
          discountedPrice: 22400,
          category: "Processed",
          image: "https://images.unsplash.com/photo-1534939786939-8f79cf481ed6?w=400",
        },
      ],
    },
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      category: product.category,
      image: product.image,
    });
    setNotification(`${product.name} added to cart at promotional price!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const getDaysRemaining = (validUntil: string) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-6">
      {/* Notification */}
      {notification && (
        <div className="fixed right-4 top-20 z-50 animate-in slide-in-from-right rounded-lg p-4 shadow-lg" style={{ backgroundColor: "#3d2817" }}>
          <p className="text-white">{notification}</p>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
          Special Promotions
        </h1>
        <p className="text-lg" style={{ color: "#6b5d52" }}>
          Exclusive deals and discounts on premium products
        </p>
      </div>

      {/* Featured Promotions Banner */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {promotions
          .filter((p) => p.featured)
          .map((promo) => {
            const daysRemaining = getDaysRemaining(promo.validUntil);
            return (
              <div
                key={promo.id}
                className="relative overflow-hidden rounded-xl border-2 p-6"
                style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
              >
                <div
                  className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white"
                  style={{ backgroundColor: "#3d2817" }}
                >
                  <Star className="h-3 w-3" />
                  Featured
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Tag className="h-6 w-6" style={{ color: "#c9a876" }} />
                    <h2 className="text-2xl" style={{ color: "#3d2817" }}>
                      {promo.title}
                    </h2>
                  </div>
                  <p className="mb-3" style={{ color: "#6b5d52" }}>
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center gap-2 rounded-full px-4 py-2"
                      style={{ backgroundColor: "#3d2817" }}
                    >
                      <TrendingDown className="h-5 w-5 text-white" />
                      <span className="text-lg text-white">{promo.discount}% OFF</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#6b5d52" }}>
                      <Clock className="h-4 w-4" />
                      {daysRemaining > 0 ? `${daysRemaining} days left` : "Expires today"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* All Promotions */}
      <div className="space-y-8">
        {promotions.map((promo) => {
          const daysRemaining = getDaysRemaining(promo.validUntil);
          return (
            <div
              key={promo.id}
              className="rounded-xl border p-6"
              style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
            >
              {/* Promotion Header */}
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#c9a876" }}
                    >
                      <Tag className="h-6 w-6" style={{ color: "#3d2817" }} />
                    </div>
                    <div>
                      <h3 className="text-xl" style={{ color: "#3d2817" }}>
                        {promo.title}
                      </h3>
                      <p className="text-sm" style={{ color: "#6b5d52" }}>
                        {promo.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className="mb-1 inline-block rounded-full px-4 py-2 text-lg text-white"
                      style={{ backgroundColor: "#3d2817" }}
                    >
                      {promo.discount}% OFF
                    </p>
                    <p className="flex items-center gap-1 text-sm" style={{ color: "#6b5d52" }}>
                      <Clock className="h-4 w-4" />
                      Valid until {new Date(promo.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {promo.products.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                    style={{ borderColor: "#c9a876" }}
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image || ""}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div
                        className="absolute right-2 top-2 rounded-full px-2 py-1 text-xs text-white"
                        style={{ backgroundColor: "#3d2817" }}
                      >
                        -{promo.discount}%
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="mb-2" style={{ color: "#3d2817" }}>
                        {product.name}
                      </h4>

                      <div className="mb-3 flex items-baseline gap-2">
                        <p className="text-lg" style={{ color: "#3d2817" }}>
                          Tzs {product.discountedPrice.toLocaleString()}
                        </p>
                        <p className="text-sm line-through" style={{ color: "#6b5d52" }}>
                          Tzs {product.originalPrice.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-lg px-4 py-2 text-sm text-white transition-colors hover:opacity-90"
                        style={{ backgroundColor: "#3d2817" }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
