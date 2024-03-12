import React, { useState, useEffect } from "react";
import NavBar from "../ReusableComponents/NavBar";
import EditProfile from "./EditProfile";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRef = collection(db, "nurses");
        const querySnapshot = await getDocs(userRef);
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            setUserData(doc.data());
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 p-4">
      <NavBar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center m-4">
        <div className="m-4 p-4 table-card d-flex flex-column justify-content-center align-items-center w-100" style={{ height: '65vh' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="Avatar" className="mb-3" style={{ width: '100px' }} />
          {user && userData && (
            <>
              <h2 className="mt-3">{userData.name}</h2>
              <h6 className="mb-3">{user.email}</h6>
            </>
          )}
          <button className="btn btn-web mt-4 px-4 py-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
