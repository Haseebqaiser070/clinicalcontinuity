import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHomeTabVisible, setIsHomeTabVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        console.log("data");
        const userEmail = user.email;
        console.log("User email:", userEmail);

        if (userEmail === "admin@admin.com") {
          setIsHomeTabVisible(true); // Show Home tab for admin user
        } else {
          const userRef = doc(db, "nurses", user.uid);
          const userDocSnap = await getDoc(userRef);
          setIsHomeTabVisible(userDocSnap.exists()); // Show Home tab if user exists in nurse collection
        }
      } else {
        console.log("lost");

        setIsHomeTabVisible(false); // Ensure Home tab is not visible for non-authenticated users
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
            {!loading && isHomeTabVisible ? (
              <li className="nav-item">
                <Link to="/admin-dashboard" className="nav-link active">
                  Home
                </Link>
              </li>
            ) : null}

            <li className="nav-item">
              <Link to="/incharge-dashboard" className="nav-link active">
                Charge RN
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link active" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
