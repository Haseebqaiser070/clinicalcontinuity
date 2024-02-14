import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNewBed = (props) => {
  const [bed, setBed] = useState("");
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
          <h2>Add New Bed</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 mt-4">
          <label className="form-label">Bed Title</label>
          <input
            value={bed}
            onChange={(e) => setBed(e.target.value)}
            type="text"
            className="form-control"
            id="bed"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bed Category</label>
          <div className="input-group">
            <Form.Select
              value={bedCat}
              onChange={(e) => setBedCat(e.target.value)}
              aria-label="Select Bed Category"
              className="w-100"
            >
              <option>Select Bed Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Form.Select>
          </div>
        </div>
        <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4">Submit</button>
            </div>
      </Modal.Body>



    </Modal>
  );
};

export default AddNewBed;
