import React, { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
}

const initialMenu: MenuItem[] = [
  {
    id: 1,
    name: "Jollof Rice",
    description:
      "Fragrant rice cooked in tomato sauce with aromatic herbs and spices",
    price: "$15.99",
    category: "Mains",
    image: "https://images.unsplash.com/photo-1613145999275-6d9d7cf83b9b",
    available: true,
  },
  {
    id: 2,
    name: "Fried Plantains",
    description: "Sweet plantains fried until golden and caramelized",
    price: "$6.99",
    category: "Sides",
    image: "https://images.unsplash.com/photo-1623690562603-5a5b7c8c508b",
    available: false,
  },
];

const AdminMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [form, setForm] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    price: "",
    category: "Mains",
    image: "",
    available: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.price || !form.category)
      return alert("Fill all fields");

    if (isEditing && editId !== null) {
      setMenu((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...form } : item))
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        ...form,
      };
      setMenu((prev) => [...prev, newItem]);
    }

    setForm({
      name: "",
      description: "",
      price: "",
      category: "Mains",
      image: "",
      available: true,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenu((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item: MenuItem) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available,
    });
    setIsEditing(true);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAvailability = (id: number) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Menu Manager</h1>

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Mains</option>
            <option>Sides</option>
            <option>Desserts</option>
          </select>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded col-span-1 sm:col-span-2"
          />
          <div className="mt-1 flex items-center gap-2 col-span-1 sm:col-span-2">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 text-sm font-medium text-gray-700 dark:text-white"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter dish name"
                className="border p-2 rounded"
              />
            </div>

            <label className="text-sm text-gray-700 dark:text-white">
              Available
            </label>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAddOrUpdate}
            className="px-6 py-2 bg-terracotta text-white rounded hover:bg-terracotta/90"
          >
            {isEditing ? "Update Item" : "Add Item"}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  category: "Mains",
                  image: "",
                  available: true,
                });
              }}
              className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Menu List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Menu Items</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg bg-white dark:bg-zinc-800 shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-white/60 mb-1">
                {item.description}
              </p>
              <p className="font-semibold text-terracotta">{item.price}</p>
              <p className="text-xs mt-1 italic">Category: {item.category}</p>
              <p
                className={`text-sm font-medium mt-1 ${
                  item.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </p>
              <div className="flex space-x-4 mt-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className="text-yellow-500 hover:underline text-sm"
                >
                  {item.available ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
