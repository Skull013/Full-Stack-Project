import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let isMounted = true;

    axios
      .get("/auth/me")
      .then((res) => {
        if (isMounted) setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Dashboard
        </h2>

        {user ? (
          <div className="space-y-4 text-center">

            {(user.photo || user.avatar) && (
              <img
                src={
                  user.photo
                    ? `https://full-stack-project-1pi6.onrender.com/${user.photo}`
                    : user.avatar
                }
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover border"
              />
            )}

         
            <div className="text-gray-700">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}
