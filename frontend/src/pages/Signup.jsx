import { useState } from "react";
import axios from "../utils/axios"; // axios instance with baseURL
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const register = async () => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("email", data.email);
      form.append("password", data.password);
      if (photo) form.append("photo", photo);

      const res = await axios.post("/auth/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        <div className="flex justify-center mb-4">
          <label className="cursor-pointer">
            <img
              src={preview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <button
            onClick={register}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-indigo-600 cursor-pointer font-medium">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
