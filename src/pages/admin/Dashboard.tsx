import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const email = localStorage.getItem("user_email"); // or from auth context
      if (!email) {
        navigate("/");
        return;
      }

      const res = await fetch(
        `/api/admin/check?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (!data.isAdmin) {
        navigate("/"); // redirect if not admin
      } else {
        setLoading(false);
      }
    }
    checkAdmin();
  }, [navigate]);

  if (loading) {
    return <p>Checking admin status...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <a href="/admin/menu">Manage Menu</a>
        </li>
        <li>
          <a href="/admin/bookings">Manage Bookings</a>
        </li>
        <li>
          <a href="/admin/reservations">Manage Reservations</a>
        </li>
        <li>
          <a href="/admin/contact">Manage Contact Requests</a>
        </li>
        <li>
          <a href="/admin/users">Manage Users</a>
        </li>
      </ul>
    </div>
  );
}
