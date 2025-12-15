import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  // LOCAL LOGIN
  const login = async () => {
    try {
      const res = await axios.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  // GOOGLE LOGIN
  const googleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/auth/google-login", {
        credential: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80 space-y-4">

        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={login}>Login</button>

        <GoogleLogin
          onSuccess={googleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>
    </div>
  );
}

// import { useState } from "react";
// import axios from "../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// export default function Login() {
//   const [data, setData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await axios.post("/auth/login", data);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   const googleSuccess = async (credentialResponse) => {
//     try {
//       const res = await axios.post("/auth/google-login", {
//         credential: credentialResponse.credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.log("Google login failed", err);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Login
//         </h2>

//         <div className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e) =>
//               setData({ ...data, email: e.target.value })
//             }
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             onChange={(e) =>
//               setData({ ...data, password: e.target.value })
//             }
//           />

//           <button
//             onClick={login}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>

          
//           <div className="flex justify-center">
//             <GoogleLogin
//               onSuccess={googleSuccess}
//               onError={() => console.log("Google Login Failed")}
//             />
//           </div>
//         </div>

//         <p className="text-center mt-4 text-sm">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/")}
//             className="text-indigo-600 cursor-pointer font-medium"
//           >
//             Signup
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
