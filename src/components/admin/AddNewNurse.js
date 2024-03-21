import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AddNewNurse = ({ show, onHide, editingNurse, onAddOrUpdateNurse }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNurse) {
      setName(editingNurse.name);
      setEmail(editingNurse.email);
    } else {
      setName("");
      setEmail("");
    }
    setMessage("");
  }, [editingNurse]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!name || !email) {
        throw new Error("Please fill in all fields.");
      }

      // Check for duplicate emails, excluding the current editing nurse's email
      const nurseQuery = query(collection(db, "nurses"), where("email", "==", email));
      const querySnapshot = await getDocs(nurseQuery);
      const isDuplicateEmail = querySnapshot.docs.some(doc => editingNurse ? doc.id !== editingNurse.id : true);

      if (isDuplicateEmail) {
        throw new Error("Nurse with this email already exists.");
      }

      if (editingNurse) {
        // Update existing nurse, including email
        await updateDoc(doc(db, "nurses", editingNurse.id), { name, email });
        setMessage("Nurse updated successfully!");
      } else {
        // Add new nurse
        await addDoc(collection(db, "nurses"), { name, email, chargeRn: false });
        setMessage("Nurse added successfully!");
      }
    } catch (error) {
      console.error("Error adding/updating nurse: ", error);
      setMessage(error.message || "Failed to add/update nurse. Please try again.");
    } finally {
      setLoading(false);
      if (message.includes("successfully")) {
        // Reset form and close modal after successful add/update
        setName("");
        setEmail("");
        onAddOrUpdateNurse();
        onHide(); // Assuming onHide is the function to hide the modal
      }
    }
};


  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingNurse ? "Edit Nurse" : "Add New Nurse"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <p
            className={
              message.includes("successfully")
                ? "alert alert-success"
                : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </p>
        )}
        <div className="mb-3">
          <label className="form-label">Nurse Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nurse Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            disabled={loading }
          />
        </div>
        <div className="d-grid mb-2">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : editingNurse ? "Update Nurse" : "Add Nurse"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewNurse;
