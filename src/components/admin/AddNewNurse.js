import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AddNewNurse = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nurseOptions = ["Day", "Night"];
  const [selectedNurse, setSelectedNurse] = useState("");

  const handleNurseChange = (e) => {
    setSelectedNurse(e.target.value);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add New Nurse</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 mt-4">
          <label className="form-label">Nurse Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3 mt-4">
          <label className="form-label">Nurse Email</label>
          <input
            value={name}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3 mt-4">
        <label className="form-label">Select shift</label>
        <select
              className="shift-input-field"
              value={selectedNurse}
              onChange={handleNurseChange}
            >
              <option value="">Select Shift</option>
              {nurseOptions.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
        </div>

        <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4">Submit</button>
            </div>
      </Modal.Body>



    </Modal>
  );
};

export default AddNewNurse;
