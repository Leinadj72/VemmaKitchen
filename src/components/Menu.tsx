// src/pages/Menu.tsx
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
  region: string;
}

const regions = ["All", "West Africa", "East Africa", "Southern Africa"];

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    axios.get<MenuItem[]>("http://localhost:5000/api/menu").then((res) => {
      setMenuItems(res.data);
    });
  }, []);

  const filteredItems =
    selectedRegion === "All"
      ? menuItems
      : menuItems.filter((item) => item.region === selectedRegion);

  const groupedByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categories = Object.keys(groupedByCategory);

  return (
    <section className="section bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">
            Our Menu
          </span>
          <h2 className="heading-lg mb-6 text-charcoal dark:text-white">
            Explore Our Authentic African Dishes
          </h2>
          <p className="text-charcoal/80 dark:text-white/70">
            Our menu features a curated selection of dishes from across the
            African continent, prepared with authentic spices and traditional
            methods.
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex justify-center mb-10">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-cream text-charcoal dark:bg-zinc-800 dark:text-white border border-terracotta/30 rounded-full px-4 py-2 shadow-sm focus:outline-none"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue={categories[0]}
          className="max-w-5xl mx-auto transition-all duration-500"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="bg-cream/60 dark:bg-zinc-800 p-1 rounded-full shadow-sm">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="data-[state=active]:bg-terracotta data-[state=active]:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid md:grid-cols-2 gap-8 transition-opacity duration-500 ease-in-out">
                {groupedByCategory[cat].map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-start border-b border-terracotta/20 pb-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-semibold mb-1 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-charcoal/70 dark:text-white/60">
                        {item.description}
                      </p>
                    </div>
                    <div className="font-display text-xl font-bold text-terracotta ml-6 whitespace-nowrap">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <Link to="/menu/full">
            <Button className="bg-terracotta hover:bg-terracotta/90 text-white text-base px-6 py-3 rounded-full">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
