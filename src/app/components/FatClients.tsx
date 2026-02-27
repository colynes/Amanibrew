import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FatClientsSubscriptions } from "./FatClientsSubscriptions";
import { FatClientsBilling } from "./FatClientsBilling";

export function FatClients() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Fat Clients (Billing & Subscription)</h1>
        <p className="text-muted-foreground">Manage subscriptions and billing for regular customers</p>
      </div>

      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="subscriptions" className="mt-6">
          <FatClientsSubscriptions />
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <FatClientsBilling />
        </TabsContent>
      </Tabs>
    </div>
  );
}
