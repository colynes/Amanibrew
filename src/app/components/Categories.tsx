import { useState } from "react";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
}

export function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories: Category[] = [
    {
      id: "CAT-001",
      name: "Beef",
      description: "All beef products",
      productCount: 12,
      createdAt: "2025-01-15",
    },
    {
      id: "CAT-002",
      name: "Chicken",
      description: "Poultry products",
      productCount: 8,
      createdAt: "2025-01-15",
    },
    {
      id: "CAT-003",
      name: "Pork",
      description: "Pork products",
      productCount: 6,
      createdAt: "2025-01-16",
    },
    {
      id: "CAT-004",
      name: "Sausages",
      description: "Various sausage types",
      productCount: 10,
      createdAt: "2025-01-16",
    },
    {
      id: "CAT-005",
      name: "Eggs",
      description: "Eggs and egg products",
      productCount: 4,
      createdAt: "2025-01-20",
    },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2>Product Categories</h2>
          <p className="text-sm text-muted-foreground">Manage product categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-input-background pl-10 pr-4 py-2 outline-none focus:border-primary"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg p-2 hover:bg-muted">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 hover:bg-muted">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg">{category.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {category.productCount} products
                </span>
                <span className="text-xs text-muted-foreground">
                  Added: {category.createdAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-card p-6">
            <h2 className="mb-4">Add New Category</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm">Category Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  placeholder="e.g., Beef, Chicken, Eggs"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Description</label>
                <textarea
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-2 outline-none focus:border-primary"
                  rows={3}
                  placeholder="Enter category description"
                ></textarea>
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
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
