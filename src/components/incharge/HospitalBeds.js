import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";

const getColorClass = (percent) => {
  if (percent <= 70) {
    return "orangecol";
  } else if (percent >= 90 && percent <= 99) {
    return "yellowcol";
  } else if (percent >= 100) {
    return "redcol";
  } else {
    return "greencol";
  }
};

const HospitalBeds = () => {
  const percent = 119; // Sample percent value, replace it with your actual value
  const colorClass = getColorClass(percent);

  const [modalShow, setModalShow] = useState(false);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const nurseOptions = ["Nurse A", "Nurse B", "Nurse C", "Nurse D", "Nurse E", "Nurse F", "Nurse G", "Nurse H", "Nurse I", "Nurse J", "Nurse K", "Nurse L", "Nurse M", "Nurse N", "Nurse O", "Nurse P", "Nurse Q", "Nurse R", "Nurse S", "Nurse T", "Nurse U", "Nurse V", "Nurse W", "Nurse X", "Nurse Y", "Nurse Z"]; // Example, replace with your actual nurse list

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedNurses((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedNurses((prevSelected) =>
        prevSelected.filter((nurse) => nurse !== value)
      );
    }
  };

  const handleSubmit = () => {
    // Your submit logic here
    console.log("Selected Nurses:", selectedNurses);
    setModalShow(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-7">
          <h2>Hospital Beds</h2>
        </div>
        <div className="col-md-5 d-flex justify-content-end flex-column">
          <button className="btn btn-web" onClick={() => setModalShow(true)}>
            Add/Edit Nurses
          </button>
        </div>
      </div>

      <div className="mt-4 table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">CO</th>
              <th scope="col">RN</th>
              <th scope="col">Actual</th>
              <th scope="col">%</th>
              <th scope="col">#Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nurse A</td>
              <td>No</td>
              <td>1.0</td>
              <td>0.89</td>
              <td>
                <p className={` ${colorClass}`} style={{ padding: 2, textAlign: "center" }}>
                  {percent}%
                </p>
              </td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)}       size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"><h2>Select Nurses in Shift</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          <Form>
            <div className="columns">
              {nurseOptions.map((nurse, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={nurse}
                  value={nurse}
                  checked={selectedNurses.includes(nurse)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
            <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4">Submit</button>
            </div>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default HospitalBeds;
