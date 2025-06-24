import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const menuCategories = [
  {
    id: "mains",
    label: "Mains",
    region: "West Africa",
    items: [
      { name: "Jollof Rice", description: "Fragrant rice cooked in tomato sauce with aromatic herbs and spices", price: "$15.99" },
      { name: "Peri Peri Chicken", description: "Grilled chicken marinated in African bird's eye chili sauce", price: "$18.99" },
      { name: "Egusi Soup with Fufu", description: "Melon seed soup with choice of protein, served with pounded yam", price: "$16.99" },
      { name: "Moroccan Tagine", description: "Slow-cooked stew with vegetables, aromatic spices, and your choice of meat", price: "$19.99" }
    ]
  },
  {
    id: "sides",
    label: "Sides",
    region: "East Africa",
    items: [
      { name: "Fried Plantains", description: "Sweet plantains fried until golden and caramelized", price: "$6.99" },
      { name: "Moin Moin", description: "Steamed bean pudding with peppers, onions, and spices", price: "$5.99" },
      { name: "African Salad", description: "Fresh vegetables with palm oil dressing and ground crayfish", price: "$7.99" },
      { name: "Injera Bread", description: "Traditional fermented flatbread with a slightly spongy texture", price: "$4.99" }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    region: "Southern Africa",
    items: [
      { name: "Malva Pudding", description: "South African sweet pudding with apricot jam and a caramelized exterior", price: "$8.99" },
      { name: "Chin Chin", description: "Crunchy, sweet fried dough bites dusted with sugar", price: "$5.99" },
      { name: "Koeksister", description: "Twisted pastry deep-fried and soaked in sweet syrup", price: "$6.99" },
      { name: "Mbatata Cookies", description: "Sweet potato cookies with a hint of cinnamon", price: "$7.99" }
    ]
  }
];

const regions = ["All", "West Africa", "East Africa", "Southern Africa"];

const Menu = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredCategories = selectedRegion === "All"
    ? menuCategories
    : menuCategories.filter(c => c.region === selectedRegion);

  return (
    <section id="menu" className="section bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">
            Our Menu
          </span>
          <h2 className="heading-lg mb-6 text-charcoal dark:text-white">Explore Our Authentic African Dishes</h2>
          <p className="text-charcoal/80 dark:text-white/70">
            Our menu features a curated selection of dishes from across the African continent, prepared with authentic spices and traditional methods.
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
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Tabs with animation */}
        <Tabs defaultValue={filteredCategories[0]?.id} className="max-w-5xl mx-auto transition-all duration-500">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-cream/60 dark:bg-zinc-800 p-1 rounded-full shadow-sm">
              {filteredCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-terracotta data-[state=active]:text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {filteredCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-6 transition-opacity duration-500 ease-in-out">
                {category.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-terracotta/20 pb-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-1 dark:text-white">{item.name}</h3>
                      <p className="text-charcoal/70 dark:text-white/60">{item.description}</p>
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

        <div className="text-center mt-12">
          <Button className="bg-terracotta hover:bg-terracotta/90 text-white text-base px-6 py-3 rounded-full">
            View Full Menu
          </Button>
        </div>

        {/* Custom Catering Block */}
        <div className="mt-20 bg-charcoal text-white rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-md mb-4">Custom Catering Menus</h3>
              <p className="mb-6 text-white/80">
                Our catering service offers personalized menus from West African jollof to Ethiopian injera. Let us create the perfect culinary experience for your event.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-6 py-2">
                Request Custom Menu
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" 
                  alt="African cuisine dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                  alt="Catering presentation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
