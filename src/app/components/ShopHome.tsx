import { useNavigate } from "react-router";
import { ArrowRight, Star, Truck, Shield, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ShopHome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Star,
      title: "Premium Quality",
      description: "Only the finest cuts from trusted farms",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed",
    },
    {
      icon: Tag,
      title: "Special Offers",
      description: "Exclusive deals and promotions",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, #f5ede4 0%, #ffffff 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div
                className="inline-block rounded-full px-4 py-2 text-sm"
                style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
              >
                Premium Butchery • Est. 1985
              </div>

              <h1 className="text-4xl leading-tight lg:text-5xl" style={{ color: "#3d2817" }}>
                Fresh, Premium Meats{" "}
                <span style={{ color: "#c9a876" }}>Delivered to Your Door</span>
              </h1>

              <p className="text-lg leading-relaxed" style={{ color: "#6b5d52" }}>
                Experience the finest quality meats from Tanzania's most trusted butchery. Browse our
                selection of premium cuts, exclusive deals, and enjoy fast, reliable delivery.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/shop/products")}
                  className="flex items-center gap-2 rounded-lg px-6 py-3 text-lg text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#3d2817" }}
                >
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate("/shop/promotions")}
                  className="flex items-center gap-2 rounded-lg border-2 px-6 py-3 text-lg transition-colors hover:bg-opacity-10"
                  style={{ borderColor: "#c9a876", color: "#3d2817" }}
                >
                  View Promotions
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="overflow-hidden rounded-2xl shadow-2xl"
                style={{ borderColor: "#c9a876", borderWidth: "6px" }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722581248341-de9b34c116bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYnV0Y2hlciUyMG1lYXQlMjBjb3VudGVyfGVufDF8fHx8MTc3NDMyOTExMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Premium meat display"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl lg:text-4xl" style={{ color: "#3d2817" }}>
              Why Choose Amani Brew?
            </h2>
            <p className="mx-auto max-w-2xl text-lg" style={{ color: "#6b5d52" }}>
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border p-6 text-center transition-shadow hover:shadow-lg"
                  style={{ borderColor: "#c9a876" }}
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#c9a876" }}
                  >
                    <Icon className="h-8 w-8" style={{ color: "#3d2817" }} />
                  </div>
                  <h3 className="mb-2 text-lg" style={{ color: "#3d2817" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#6b5d52" }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: "#3d2817" }}>
        <div className="container mx-auto px-4 text-center lg:px-6">
          <h2 className="mb-4 text-3xl lg:text-4xl" style={{ color: "#f5ede4" }}>
            Ready to Order?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg" style={{ color: "#c9a876" }}>
            Browse our premium selection and get your order delivered fresh to your door
          </p>
          <button
            onClick={() => navigate("/shop/products")}
            className="rounded-lg px-8 py-4 text-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
          >
            Start Shopping
          </button>
        </div>
      </section>
    </div>
  );
}
