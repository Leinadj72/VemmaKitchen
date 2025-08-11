// src/pages/FullMenu.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  available: boolean;
}

const FullMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get<MenuItem[]>("http://localhost:5000/api/menu").then((res) => {
      setMenuItems(res.data);
    });
  }, []);

  const groupedByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section className="section py-20 bg-white dark:bg-zinc-900">
      <div className="container-custom">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="heading-lg text-charcoal dark:text-white mb-4">
            Full Menu
          </h1>
          <p className="text-charcoal/70 dark:text-white/70">
            Discover every delicious dish we offer across Africa's diverse
            culinary landscape.
          </p>
        </div>

        {Object.keys(groupedByCategory).map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-semibold text-terracotta mb-6">
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {groupedByCategory[category].map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl shadow-sm border border-charcoal/10 overflow-hidden bg-white dark:bg-zinc-800 transition hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-charcoal dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 dark:text-white/60 mb-2">
                      {item.description}
                    </p>
                    <span className="text-terracotta font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FullMenu;
