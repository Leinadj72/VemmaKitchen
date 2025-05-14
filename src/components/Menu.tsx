
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const menuCategories = [
  {
    id: "mains",
    label: "Mains",
    items: [
      {
        name: "Jollof Rice",
        description: "Fragrant rice cooked in tomato sauce with aromatic herbs and spices",
        price: "$15.99"
      },
      {
        name: "Peri Peri Chicken",
        description: "Grilled chicken marinated in African bird's eye chili sauce",
        price: "$18.99"
      },
      {
        name: "Egusi Soup with Fufu",
        description: "Melon seed soup with choice of protein, served with pounded yam",
        price: "$16.99"
      },
      {
        name: "Moroccan Tagine",
        description: "Slow-cooked stew with vegetables, aromatic spices, and your choice of meat",
        price: "$19.99"
      }
    ]
  },
  {
    id: "sides",
    label: "Sides",
    items: [
      {
        name: "Fried Plantains",
        description: "Sweet plantains fried until golden and caramelized",
        price: "$6.99"
      },
      {
        name: "Moin Moin",
        description: "Steamed bean pudding with peppers, onions, and spices",
        price: "$5.99"
      },
      {
        name: "African Salad",
        description: "Fresh vegetables with palm oil dressing and ground crayfish",
        price: "$7.99"
      },
      {
        name: "Injera Bread",
        description: "Traditional fermented flatbread with a slightly spongy texture",
        price: "$4.99"
      }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Malva Pudding",
        description: "South African sweet pudding with apricot jam and a caramelized exterior",
        price: "$8.99"
      },
      {
        name: "Chin Chin",
        description: "Crunchy, sweet fried dough bites dusted with sugar",
        price: "$5.99"
      },
      {
        name: "Koeksister",
        description: "Twisted pastry deep-fried and soaked in sweet syrup",
        price: "$6.99"
      },
      {
        name: "Mbatata Cookies",
        description: "Sweet potato cookies with a hint of cinnamon",
        price: "$7.99"
      }
    ]
  }
];

const Menu = () => {
  return (
    <section id="menu" className="section pattern-bg">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">Our Menu</span>
          <h2 className="heading-lg mb-6">Explore Our Authentic African Dishes</h2>
          <p className="text-charcoal/80">
            Our menu features a carefully curated selection of dishes from across the African continent, prepared with authentic spices and traditional cooking methods.
          </p>
        </div>

        <Tabs defaultValue="mains" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-cream/50 p-1">
              {menuCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-terracotta data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {menuCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid gap-8">
                {category.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-terracotta/20 pb-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-charcoal/70 max-w-lg">{item.description}</p>
                    </div>
                    <div className="font-display text-xl font-bold text-terracotta ml-4">{item.price}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
            View Full Menu
          </Button>
        </div>

        <div className="mt-20 bg-charcoal text-white rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-md mb-4">Custom Catering Menus</h3>
              <p className="mb-6 text-white/80">
                Our catering service offers customizable menu options featuring cuisine from different African regions. From West African jollof rice to Ethiopian injera and Moroccan tagine, we can craft the perfect menu for your event.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
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
