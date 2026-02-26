import { Calendar, Truck, MapPin, Phone } from "lucide-react";

interface DeliveryReminder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string[];
  deliveryTime: string;
  subscriptionType: string;
}

export function DeliveryReminders() {
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const deliveries: DeliveryReminder[] = [
    {
      id: "SUB-001",
      customer: "John Smith",
      phone: "(555) 123-4567",
      address: "123 Main St, Downtown",
      items: ["Premium Ribeye 2kg", "Ground Beef 3kg", "Chicken Breast 2kg"],
      deliveryTime: "09:00 AM",
      subscriptionType: "Weekly",
    },
    {
      id: "SUB-003",
      customer: "Mike Davis",
      phone: "(555) 345-6789",
      address: "789 Oak Ave, Westside",
      items: ["Pork Chops 2kg", "Bacon 1kg", "Ground Beef 2kg"],
      deliveryTime: "11:00 AM",
      subscriptionType: "Weekly",
    },
    {
      id: "SUB-007",
      customer: "Tom Wilson",
      phone: "(555) 789-0123",
      address: "456 Pine St, Eastside",
      items: ["Mixed Pack 5kg"],
      deliveryTime: "02:00 PM",
      subscriptionType: "Daily",
    },
    {
      id: "SUB-009",
      customer: "Anna Martinez",
      phone: "(555) 890-1234",
      address: "321 Elm St, Northside",
      items: ["Chicken Variety 4kg", "Sausages 2kg"],
      deliveryTime: "03:30 PM",
      subscriptionType: "Twice Weekly",
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <h3>Tomorrow's Deliveries</h3>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">{tomorrowDate}</span>
        </div>
      </div>

      {deliveries.length > 0 ? (
        <div className="space-y-3">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{delivery.customer}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {delivery.subscriptionType}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{delivery.phone}</span>
                    </div>
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
                <div className="ml-4 text-right">
                  <div className="rounded-lg bg-primary px-3 py-2">
                    <p className="text-xs text-primary-foreground/80">Delivery at</p>
                    <p className="text-sm font-medium text-primary-foreground">
                      {delivery.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Truck className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-sm text-muted-foreground">
            No deliveries scheduled for tomorrow
          </p>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-blue-50 p-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Reminder:</strong> Prepare delivery packages the evening before and ensure all items are properly refrigerated.
        </p>
      </div>
    </div>
  );
}
