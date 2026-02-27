import { useState } from "react";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  buyingPrice: number;
  sellingPrice: number;
  supplier: string;
  supplierContact: string;
}

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const products: Product[] = [
    {
      id: "PRD-001",
      name: "Inter-chick Chicken",
      category: "Chicken",
      quantity: 100,
      unit: "kg",
      buyingPrice: 7500,
      sellingPrice: 9000,
      supplier: "Inter-Chick Ltd",
      supplierContact: "+255 712 345 678",
    },
    {
      id: "PRD-002",
      name: "Premium Ribeye Steak",
      category: "Beef",
      quantity: 50,
      unit: "kg",
      buyingPrice: 25000,
      sellingPrice: 32000,
      supplier: "Prime Beef Co",
      supplierContact: "+255 713 456 789",
    },
    {
      id: "PRD-003",
      name: "Ground Beef",
      category: "Beef",
      quantity: 80,
      unit: "kg",
      buyingPrice: 10000,
      sellingPrice: 14000,
      supplier: "Prime Beef Co",
      supplierContact: "+255 713 456 789",
    },
    {
      id: "PRD-004",
      name: "Pork Chops",
      category: "Pork",
      quantity: 45,
      unit: "kg",
      buyingPrice: 12000,
      sellingPrice: 16000,
      supplier: "Heritage Farms",
      supplierContact: "+255 714 567 890",
    },
    {
      id: "PRD-005",
      name: "Italian Sausages",
      category: "Sausages",
      quantity: 60,
      unit: "kg",
      buyingPrice: 8000,
      sellingPrice: 12000,
      supplier: "Artisan Meats",
      supplierContact: "+255 715 678 901",
    },
    {
      id: "PRD-006",
      name: "Fresh Eggs",
      category: "Eggs",
      quantity: 200,
      unit: "trays",
      buyingPrice: 8000,
      sellingPrice: 10000,
      supplier: "Poultry Farm Ltd",
      supplierContact: "+255 716 789 012",
    },
  ];

  const categories = ["All", "Beef", "Chicken", "Pork", "Sausages", "Eggs"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // For admin check - in real app, get from auth context
  const isAdmin = true;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>Products</h2>
          <p className="text-sm text-muted-foreground">Manage inventory products</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                {isAdmin && <th className="px-6 py-3 text-left">Buying Price</th>}
                <th className="px-6 py-3 text-left">Selling Price</th>
                <th className="px-6 py-3 text-left">Supplier</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p>
                      {product.quantity} {product.unit}
                    </p>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <p>Tsh {product.buyingPrice.toLocaleString()}</p>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <p>Tsh {product.sellingPrice.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm">{product.supplier}</p>
                      <p className="text-xs text-muted-foreground">{product.supplierContact}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-card p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4">Add New Product</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Product Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="e.g., Inter-chick Chicken"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm">Category</label>
                <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                  <option value="">Select category</option>
                  {categories.filter(c => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm">Quantity</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Unit</label>
                  <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                    <option>kg</option>
                    <option>pcs</option>
                    <option>trays</option>
                    <option>lbs</option>
                  </select>
                </div>
              </div>

              {isAdmin && (
                <div>
                  <label className="mb-1 block text-sm">Buying Price (Tsh)</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="7500"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm">Selling Price (Tsh)</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="9000"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm">Supplier Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Supplier name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm">Supplier Contact</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="+255 712 345 678"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
