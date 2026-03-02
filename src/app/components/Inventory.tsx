import { useNavigate } from "react-router";

export function Inventory() {
  const navigate = useNavigate();

  // Redirect to Categories by default
  React.useEffect(() => {
    navigate("/inventory/categories", { replace: true });
  }, [navigate]);

  return null;
}
