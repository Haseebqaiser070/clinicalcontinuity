import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const EditProfile = (props) => {
  const [name, setName] = useState("Anima Agarwal");
  const [email, setEmail] = useState("animaagrwal@gmail.com");
  const [password, setPassword] = useState("dsjjk89323@");


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Edit Profile</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 mt-4">
          <label className="form-label">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3 mt-4">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3 mt-4">
          <label className="form-label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="email"
          />
        </div>

        <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4">Update</button>
            </div>
      </Modal.Body>



    </Modal>
  );
};

export default EditProfile;
