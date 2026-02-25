import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, Menu, X, Calendar } from "lucide-react";
import { useState } from "react";
import logoIcon from "figma:asset/836753629ce820953d30091a24b438821c096c54.png";

export function Root() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Inventory", path: "/inventory", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Subscriptions", path: "/subscriptions", icon: Calendar },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Sales", path: "/sales", icon: TrendingUp },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="Amani Brew" className="h-12 w-12" />
              <div>
                <h1 className="text-lg text-sidebar-foreground">Amani Brew</h1>
                <p className="text-xs text-sidebar-foreground/60">Premium Butchery</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                    ${
                      active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
              <img src={logoIcon} alt="Admin" className="h-10 w-10 rounded-full bg-sidebar-primary/20 p-1.5" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm">Admin User</p>
                <p className="truncate text-xs text-sidebar-foreground/60">admin@amanibrew.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src={logoIcon} alt="Amani Brew" className="h-8 w-8" />
          <h1>Amani Brew</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}