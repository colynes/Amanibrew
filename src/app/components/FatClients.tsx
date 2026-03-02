import { useNavigate } from "react-router";
import { useEffect } from "react";

export function FatClients() {
  const navigate = useNavigate();

  // Redirect to Subscriptions by default
  useEffect(() => {
    navigate("/fat-clients/subscriptions", { replace: true });
  }, [navigate]);

  return null;
}
