import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AddBedCat = (props) => {
  const [bedCat, setBedCat] = useState("");

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add Bed Category</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 mt-4">
          <label className="form-label">Category Name</label>
          <input
            value={bedCat}
            onChange={(e) => setBedCat(e.target.value)}
            type="text"
            className="form-control"
            id="bedCat"
          />
        </div>

        <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4">Submit</button>
            </div>
      </Modal.Body>



    </Modal>
  );
};

export default AddBedCat;
