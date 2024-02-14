import React, { useState } from "react";
import NavBar from "../ReusableComponents/NavBar";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100 p-4">
      <NavBar />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center m-4">
        <div className="m-4 p-4 table-card d-flex flex-column justify-content-center align-items-center w-100" style={{ height: '65vh' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="Avatar" className="mb-3" style={{ width: '100px' }} />
          <h2 className="mt-3">Anima Agarwal</h2>
          <h6 className="mb-3">Animaagarwal@gmail.com</h6>
          <button className="btn btn-web mt-4 px-4 py-2" onClick={() => setModal(true)} >Edit Profile</button>
          <EditProfile
            show={modal}
            onHide={() => setModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
