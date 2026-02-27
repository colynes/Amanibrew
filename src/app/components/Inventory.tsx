import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Categories } from "./Categories";
import { Products } from "./Products";

export function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Inventory Management</h1>
        <p className="text-muted-foreground">Manage categories and products</p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="mt-6">
          <Categories />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <Products />
        </TabsContent>
      </Tabs>
    </div>
  );
}
