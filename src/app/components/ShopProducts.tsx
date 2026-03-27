import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  description: string;
  image?: string;
}

export function ShopProducts() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState("");

  // Mock products data with images
  const products: Product[] = [
    {
      id: "P001",
      name: "Premium Ribeye Steak",
      category: "Beef",
      price: 45000,
      unit: "kg",
      stock: 25,
      description: "Premium marbled ribeye steak, aged to perfection",
      image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400",
    },
    {
      id: "P002",
      name: "Ground Beef",
      category: "Beef",
      price: 18000,
      unit: "kg",
      stock: 50,
      description: "Fresh ground beef, ideal for burgers and meatballs",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400",
    },
    {
      id: "P003",
      name: "Beef Tenderloin",
      category: "Beef",
      price: 55000,
      unit: "kg",
      stock: 15,
      description: "Ultra-tender premium beef tenderloin",
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
    },
    {
      id: "P004",
      name: "T-Bone Steak",
      category: "Beef",
      price: 42000,
      unit: "kg",
      stock: 20,
      description: "Classic T-bone steak with perfect marbling",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400",
    },
    {
      id: "P005",
      name: "Italian Sausages",
      category: "Processed",
      price: 28000,
      unit: "kg",
      stock: 30,
      description: "Authentic Italian-style sausages with herbs",
      image: "https://images.unsplash.com/photo-1534939786939-8f79cf481ed6?w=400",
    },
    {
      id: "P006",
      name: "Beef Burgers",
      category: "Processed",
      price: 25000,
      unit: "kg",
      stock: 40,
      description: "Homemade beef burger patties",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    },
    {
      id: "P007",
      name: "Chicken Breast",
      category: "Poultry",
      price: 22000,
      unit: "kg",
      stock: 35,
      description: "Fresh, boneless chicken breast fillets",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
    },
    {
      id: "P008",
      name: "Whole Chicken",
      category: "Poultry",
      price: 18000,
      unit: "kg",
      stock: 25,
      description: "Fresh whole chicken, farm-raised",
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400",
    },
    {
      id: "P009",
      name: "Lamb Chops",
      category: "Lamb",
      price: 48000,
      unit: "kg",
      stock: 12,
      description: "Tender lamb chops, perfectly cut",
      image: "https://images.unsplash.com/photo-1619740455993-9e56be7f1d4e?w=400",
    },
    {
      id: "P010",
      name: "Pork Ribs",
      category: "Pork",
      price: 32000,
      unit: "kg",
      stock: 18,
      description: "Meaty pork ribs, great for grilling",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    },
  ];

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
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
          Our Products
        </h1>
        <p className="text-lg" style={{ color: "#6b5d52" }}>
          Premium quality meats, sourced from trusted farms
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#6b5d52" }} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-10 py-3 outline-none focus:ring-2"
            style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 transition-colors ${
                selectedCategory === category ? "text-white" : "hover:opacity-80"
              }`}
              style={
                selectedCategory === category
                  ? { backgroundColor: "#3d2817" }
                  : { backgroundColor: "#c9a876", color: "#3d2817" }
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center" style={{ borderColor: "#c9a876" }}>
          <p className="text-lg" style={{ color: "#6b5d52" }}>
            No products found
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
              style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image || ""}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                {product.stock < 10 && (
                  <div className="absolute right-2 top-2 rounded-full px-3 py-1 text-xs text-white" style={{ backgroundColor: "#c9a876" }}>
                    Low Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="mb-1 line-clamp-1" style={{ color: "#3d2817" }}>
                    {product.name}
                  </h3>
                  <p className="text-xs" style={{ color: "#6b5d52" }}>
                    {product.category}
                  </p>
                </div>

                <p className="mb-4 line-clamp-2 text-sm" style={{ color: "#6b5d52" }}>
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg" style={{ color: "#3d2817" }}>
                      Tzs {product.price.toLocaleString()}
                    </p>
                    <p className="text-xs" style={{ color: "#6b5d52" }}>
                      per {product.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: "#3d2817" }}
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>

                <p className="mt-2 text-xs" style={{ color: "#6b5d52" }}>
                  {product.stock} {product.unit} in stock
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
