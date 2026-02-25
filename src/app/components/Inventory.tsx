import { useState } from "react";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  price: number;
  reorderLevel: number;
  supplier: string;
}

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Premium Ribeye Steak",
      category: "Beef",
      stock: 15,
      unit: "kg",
      price: 28.99,
      reorderLevel: 10,
      supplier: "Prime Beef Co.",
    },
    {
      id: "2",
      name: "Ground Beef",
      category: "Beef",
      stock: 35,
      unit: "kg",
      price: 12.99,
      reorderLevel: 20,
      supplier: "Prime Beef Co.",
    },
    {
      id: "3",
      name: "Pork Chops",
      category: "Pork",
      stock: 22,
      unit: "kg",
      price: 15.99,
      reorderLevel: 15,
      supplier: "Heritage Farms",
    },
    {
      id: "4",
      name: "Chicken Breast",
      category: "Poultry",
      stock: 45,
      unit: "kg",
      price: 9.99,
      reorderLevel: 25,
      supplier: "Fresh Poultry Inc.",
    },
    {
      id: "5",
      name: "Lamb Chops",
      category: "Lamb",
      stock: 18,
      unit: "kg",
      price: 24.99,
      reorderLevel: 12,
      supplier: "Valley Lamb",
    },
    {
      id: "6",
      name: "Italian Sausages",
      category: "Sausages",
      stock: 30,
      unit: "kg",
      price: 11.99,
      reorderLevel: 20,
      supplier: "Artisan Meats",
    },
    {
      id: "7",
      name: "Bacon Strips",
      category: "Pork",
      stock: 28,
      unit: "kg",
      price: 13.99,
      reorderLevel: 15,
      supplier: "Heritage Farms",
    },
    {
      id: "8",
      name: "Turkey Breast",
      category: "Poultry",
      stock: 12,
      unit: "kg",
      price: 14.99,
      reorderLevel: 10,
      supplier: "Fresh Poultry Inc.",
    },
  ];

  const categories = ["All", "Beef", "Pork", "Poultry", "Lamb", "Sausages"];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const needsRestock = (item: InventoryItem) => item.stock <= item.reorderLevel;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1>Inventory Management</h1>
          <p className="text-muted-foreground">Manage your meat products and stock levels</p>
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

      {/* Inventory Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Supplier</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <p>{item.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p>
                      {item.stock} {item.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p>${item.price.toFixed(2)}/{item.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{item.supplier}</p>
                  </td>
                  <td className="px-6 py-4">
                    {needsRestock(item) ? (
                      <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        In Stock
                      </span>
                    )}
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
          <div className="w-full max-w-md rounded-lg bg-card p-6">
            <h2 className="mb-4">Add New Product</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Product Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Category</label>
                <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                  <option>Beef</option>
                  <option>Pork</option>
                  <option>Poultry</option>
                  <option>Lamb</option>
                  <option>Sausages</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm">Stock</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Unit</label>
                  <select className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary">
                    <option>kg</option>
                    <option>lbs</option>
                    <option>pcs</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm">Price per Unit</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Reorder Level</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Supplier</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="Enter supplier name"
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
