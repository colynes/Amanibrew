import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, User, Package, Tag, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import logoIcon from "figma:asset/836753629ce820953d30091a24b438821c096c54.png";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export function ShopRoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const totalItems = getTotalItems();

  const navigation = [
    { name: "Products", path: "/shop/products", icon: Package },
    { name: "Promotions", path: "/shop/promotions", icon: Tag },
    { name: "Cart", path: "/shop/cart", icon: ShoppingCart, badge: totalItems },
    { name: "Profile", path: "/shop/profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#f5ede4" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-muted lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/shop" className="flex items-center gap-3">
              <img src={logoIcon} alt="Amani Brew" className="h-10 w-10" />
              <div>
                <h1 className="text-lg" style={{ color: "#3d2817" }}>Amani Brew</h1>
                <p className="text-xs" style={{ color: "#6b5d52" }}>Premium Butchery</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative flex items-center gap-2 rounded-lg px-4 py-2 transition-colors
                    ${active ? "text-white" : "hover:bg-muted"}
                  `}
                  style={active ? { backgroundColor: "#3d2817" } : { color: "#3d2817" }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && item.badge > 0 && (
                    <span
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                      style={{ backgroundColor: "#c9a876" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <span className="text-sm" style={{ color: "#6b5d52" }}>
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="rounded-lg px-4 py-2 text-sm transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#3d2817" }}
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {sidebarOpen && (
          <div className="border-t lg:hidden" style={{ borderColor: "#c9a876" }}>
            <nav className="container mx-auto space-y-1 px-4 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                      ${active ? "text-white" : "hover:bg-muted"}
                    `}
                    style={active ? { backgroundColor: "#3d2817" } : { color: "#3d2817" }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span
                        className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-sm text-white"
                        style={{ backgroundColor: "#c9a876" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setSidebarOpen(false);
                  }}
                  className="w-full rounded-lg px-4 py-3 text-left transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#c9a876", color: "#3d2817" }}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6" style={{ borderColor: "#c9a876", backgroundColor: "#ffffff" }}>
        <div className="container mx-auto px-4 text-center lg:px-6">
          <p className="text-sm" style={{ color: "#6b5d52" }}>
            © 2026 Amani Brew • Dar es Salaam, Tanzania
          </p>
        </div>
      </footer>
    </div>
  );
}
