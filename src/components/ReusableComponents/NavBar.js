import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h1 className="navbar-brand">Clinical Continuity</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/admin-dashboard" className="nav-link active">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/incharge-dashboard" className="nav-link active">
                Charge RN
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center">
              <div className="d-flex align-items-center">
                <Link to="/profile" className="nav-link active">
                  <span className="p-2">Anima Agrawal </span>
                </Link>
                <div
                  className="rounded-circle overflow-hidden"
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#ccc",
                    marginRight: "5px",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
