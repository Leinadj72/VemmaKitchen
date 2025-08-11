import React, { useEffect, useState } from "react";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
}

const API = "http://localhost:5000/api/menu";

const AdminMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Omit<MenuItem, "_id">>({
    name: "",
    description: "",
    price: "",
    category: "Mains",
    image: "",
    available: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get<MenuItem[]>(API); // 👈 Add generic here
    setMenu(res.data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!form.name || !form.price || !form.category)
      return alert("Fill all fields");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("available", String(form.available));
    if (file) formData.append("file", file);

    try {
      if (isEditing && editId) {
        await axios.put(`${API}/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "Mains",
        image: "",
        available: true,
      });
      setFile(null);
      setIsEditing(false);
      setEditId(null);
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this item?")) {
      await axios.delete(`${API}/${id}`);
      fetchMenu();
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
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAvailability = async (id: string) => {
    await axios.patch(`${API}/${id}/toggle`);
    fetchMenu();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Menu Manager</h1>

      {/* Form */}
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
          <div className="flex flex-col">
            <label
              htmlFor="file"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-white"
            >
              Upload Image or Video
            </label>
            <input
              id="file"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="border p-2 rounded"
              title="Upload image or video"
              aria-label="Upload image or video"
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded col-span-1 sm:col-span-2"
          />
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
                setFile(null);
              }}
              className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Menu Items</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg bg-white dark:bg-zinc-800 shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
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
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleAvailability(item._id)}
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
