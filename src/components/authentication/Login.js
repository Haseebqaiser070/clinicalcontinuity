import React, { useState, useEffect } from "react";
import "../styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [User, setUser] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Check if the user's email is admin@admin.com
      if (user.email === "admin@admin.com") {
        // If admin, navigate to admin dashboard
        navigate("/admin-dashboard");
      } else {
        // If not admin, navigate to nurse screen
        navigate("/incharge-dashboard");
      }
    } catch (error) {
      // Handle specific error cases
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else {
        // Handle other errors
        console.error("Error logging in:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div className="background-image d-flex justify-content-center align-items-center">
      <div className="login-card col-md-6 col-lg-4">
        <div className="card p-4">
          <h1 className="text-center mb-4">Login to Dashboard</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3 mt-4">
            <label className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y px-2"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <label className="form-label text-end">Forgot Password?</label>

          <Link to="/admin-dashboard">
            <div className="d-grid">
              <button
                className="btn btn-block btn-web mt-4"
                onClick={handleLogin}
              >
                Submit
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
