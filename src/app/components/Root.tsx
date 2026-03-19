import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Menu, X, FileText, Shield, Users as UsersIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import logoIcon from "figma:asset/836753629ce820953d30091a24b438821c096c54.png";
import { useAuth } from "../contexts/AuthContext";

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["inventory", "fat-clients"]);
  
  const userRole = user?.role || "Staff";
  const canSeeUsers = userRole === "Administrator" || userRole === "Manager";

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { 
      name: "Inventory", 
      path: "/inventory", 
      icon: Package,
      children: [
        { name: "Categories", path: "/inventory/categories" },
        { name: "Products", path: "/inventory/products" },
      ]
    },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { 
      name: "Fat Clients", 
      path: "/fat-clients", 
      icon: UsersIcon,
      children: [
        { name: "Subscriptions", path: "/fat-clients/subscriptions" },
        { name: "Billing", path: "/fat-clients/billing" },
      ]
    },
    { name: "Sales", path: "/sales", icon: TrendingUp },
    { name: "Reports", path: "/reports", icon: FileText },
  ];
  
  // Only add Users if user has permission
  if (canSeeUsers) {
    navigation.push({ name: "Users", path: "/users", icon: Shield });
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
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
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.name.toLowerCase().replace(" ", "-"));
              
              return (
                <div key={item.path}>
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.name.toLowerCase().replace(" ", "-"))}
                      className={`
                        flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors
                        ${
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <Link
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
                  )}
                  
                  {/* Submenu */}
                  {hasChildren && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            block rounded-lg px-4 py-2 text-sm transition-colors
                            ${
                              location.pathname === child.path
                                ? "bg-sidebar-primary/50 text-sidebar-primary-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                            }
                          `}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
              <img src={logoIcon} alt={user?.name} className="h-10 w-10 rounded-full bg-sidebar-primary/20 p-1.5" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm">{user?.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/60">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="mt-2 w-full rounded-lg bg-destructive px-4 py-2 text-sm text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              Logout
            </button>
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