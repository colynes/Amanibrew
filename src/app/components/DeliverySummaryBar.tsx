import { Truck, ChevronRight } from "lucide-react";
import { useState } from "react";

interface TomorrowDelivery {
  id: string;
  customer: string;
  items: string[];
  time: string;
}

export function DeliverySummaryBar() {
  const [showDetails, setShowDetails] = useState(false);
  
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const tomorrowDeliveries: TomorrowDelivery[] = [
    {
      id: "SUB-001",
      customer: "John Smith",
      items: ["Premium Ribeye 2kg", "Ground Beef 3kg", "Chicken Breast 2kg"],
      time: "09:00 AM",
    },
    {
      id: "SUB-003",
      customer: "Mike Davis",
      items: ["Pork Chops 2kg", "Bacon 1kg", "Ground Beef 2kg"],
      time: "11:00 AM",
    },
    {
      id: "SUB-007",
      customer: "Tom Wilson",
      items: ["Mixed Pack 5kg"],
      time: "02:00 PM",
    },
    {
      id: "SUB-009",
      customer: "Anna Martinez",
      items: ["Chicken Variety 4kg", "Sausages 2kg"],
      time: "03:30 PM",
    },
  ];

  const totalDeliveries = tomorrowDeliveries.length;

  return (
    <>
      <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg">Tomorrow's Deliveries</h3>
              <p className="text-sm text-muted-foreground">{tomorrowDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{totalDeliveries}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              View
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-card p-6 max-h-[80vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2>Tomorrow's Delivery Schedule</h2>
                <p className="text-sm text-muted-foreground">{tomorrowDate}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg px-4 py-2 hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {tomorrowDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{delivery.customer}</p>
                        <span className="text-xs text-muted-foreground">
                          {delivery.id}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Items:</p>
                        <div className="flex flex-wrap gap-1">
                          {delivery.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-background px-2 py-1 text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 rounded-lg bg-primary px-3 py-2 text-center">
                      <p className="text-xs text-primary-foreground/80">Time</p>
                      <p className="text-sm font-medium text-primary-foreground">
                        {delivery.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
