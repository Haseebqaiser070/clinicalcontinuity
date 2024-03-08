import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AddNewNurse = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Initially not loading

  const handleAddNurse = async () => {
    try {
      setLoading(true); // Start loading

      // Check if nurse with the same email already exists
      const nurseQuery = query(collection(db, "nurses"), where("email", "==", email));
      const nurseQuerySnapshot = await getDocs(nurseQuery);
      if (!nurseQuerySnapshot.empty) {
        setMessage("Nurse with this email already exists.");
        setLoading(false); // End loading
        return;
      }

      // Add nurse if not already exists
      await addDoc(collection(db, "nurses"), {
        name: name,
        email: email,
        chargeRn: false,
      });
      console.log("Nurse added successfully!");
      setMessage("Nurse added successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding nurse: ", error);
      setMessage("Failed to add nurse. Please try again.");
    } finally {
      setLoading(false); // End loading in finally block to handle both success and error cases
    }
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
        {message && (
          <p
            className={
              message.includes("success")
                ? "alert alert-success"
                : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </p>
        )}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="email"
          />
        </div>

        <div className="d-grid mt-4 mb-2">
          <button
            className="btn btn-block btn-web mt-4"
            onClick={handleAddNurse}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Adding..." : "Submit"} {/* Show "Adding..." when loading */}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewNurse;
