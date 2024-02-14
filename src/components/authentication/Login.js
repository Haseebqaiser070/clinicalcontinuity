import React, { useState } from "react";
import "../styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background-image d-flex justify-content-center align-items-center">
      <div className="login-card col-md-6 col-lg-4">
        <div className="card p-4">
          <h1 className="text-center mb-4">Login to Dashboard</h1>
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
              <button className="btn btn-block btn-web mt-4">Submit</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
