import React from "react";

const menuCategories = [
  {
    label: "Mains",
    items: [
      {
        name: "Jollof Rice",
        description:
          "Fragrant rice cooked in tomato sauce with aromatic herbs and spices",
        price: "$15.99",
        image: "https://images.unsplash.com/photo-1613145999275-6d9d7cf83b9b",
      },
      {
        name: "Peri Peri Chicken",
        description:
          "Grilled chicken marinated in African bird's eye chili sauce",
        price: "$18.99",
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
      },
      {
        name: "Egusi Soup with Fufu",
        description:
          "Melon seed soup with choice of protein, served with pounded yam",
        price: "$16.99",
        image: "https://images.unsplash.com/photo-1603984171318-7dd4c45e2d72",
      },
      {
        name: "Moroccan Tagine",
        description:
          "Slow-cooked stew with vegetables, aromatic spices, and your choice of meat",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1613141619876-594cf3c4777d",
      },
    ],
  },
  {
    label: "Sides",
    items: [
      {
        name: "Fried Plantains",
        description: "Sweet plantains fried until golden and caramelized",
        price: "$6.99",
        image: "https://images.unsplash.com/photo-1623690562603-5a5b7c8c508b",
      },
      {
        name: "Moin Moin",
        description: "Steamed bean pudding with peppers, onions, and spices",
        price: "$5.99",
        image: "https://images.unsplash.com/photo-1682611100210-2b68e4cbf89c",
      },
      {
        name: "African Salad",
        description:
          "Fresh vegetables with palm oil dressing and ground crayfish",
        price: "$7.99",
        image: "https://images.unsplash.com/photo-1600628422019-bb67b6850d4c",
      },
      {
        name: "Injera Bread",
        description:
          "Traditional fermented flatbread with a slightly spongy texture",
        price: "$4.99",
        image: "https://images.unsplash.com/photo-1572441710534-848f1e87fcf4",
      },
    ],
  },
  {
    label: "Desserts",
    items: [
      {
        name: "Malva Pudding",
        description:
          "South African sweet pudding with apricot jam and a caramelized exterior",
        price: "$8.99",
        image: "https://images.unsplash.com/photo-1590080877034-cf9c3eecf1c5",
      },
      {
        name: "Chin Chin",
        description: "Crunchy, sweet fried dough bites dusted with sugar",
        price: "$5.99",
        image: "https://images.unsplash.com/photo-1617191511574-cae2c0ce6f7b",
      },
      {
        name: "Koeksister",
        description: "Twisted pastry deep-fried and soaked in sweet syrup",
        price: "$6.99",
        image: "https://images.unsplash.com/photo-1611415519196-e1d58be77c0c",
      },
      {
        name: "Mbatata Cookies",
        description: "Sweet potato cookies with a hint of cinnamon",
        price: "$7.99",
        image: "https://images.unsplash.com/photo-1613141350513-2ce85b352e0a",
      },
    ],
  },
];

const FullMenu = () => {
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

        {menuCategories.map((category) => (
          <div key={category.label} className="mb-16">
            <h2 className="text-2xl font-semibold text-terracotta mb-6">
              {category.label}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
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
