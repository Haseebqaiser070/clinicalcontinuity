import React, { useState, useEffect } from "react";
import TableHeader from "../ReusableComponents/TableHeader";
import ActionButtons from "../ReusableComponents/ActionButtons";
import NavBar from "../ReusableComponents/NavBar";
import AddNewNurse from "./AddNewNurse";
import { db, auth } from "../../firebase"; // Import auth from firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
} from "firebase/auth"; // Import createUserWithEmailAndPassword and deleteUser from firebase/auth

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const AdminDashboard = () => {
  const [modalShowNurse, setModalShowNurse] = useState(false);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNurse, setEditingNurse] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "nurses"),
      (querySnapshot) => {
        const updatedNurses = [];
        querySnapshot.forEach((doc) => {
          updatedNurses.push({ id: doc.id, ...doc.data() });
        });
        setNurses(updatedNurses);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteNurse = async (id) => {
    try {
      await deleteDoc(doc(db, "nurses", id));
      console.log("Nurse deleted successfully!");
    } catch (error) {
      console.error("Error deleting nurse: ", error);
    }
  };

  const handleChargeRnToggle = async (id, currentValue, nurseEmail) => {
    const auth = getAuth();
    try {
      // Update the chargeRn status in Firestore
      const nurseRef = doc(db, "nurses", id);
      await updateDoc(nurseRef, { chargeRn: !currentValue });

      if (!currentValue) {
        // Attempt to create a new user account for the nurse
        await createUserWithEmailAndPassword(
          auth,
          nurseEmail,
          "defaultPassword"
        )
          .then((userCredential) => {
            // Signed in
            console.log(
              `User account created for email: ${nurseEmail}`,
              userCredential.user
            );
            // It's important to sign out the newly created user right away to maintain the admin session
            signOut(auth);
          })
          .catch((error) => {
            console.error("Error creating user account: ", error.message);
          });
      } else {
        // For deleting a user account, you would need the user to be signed in or use Firebase Admin SDK on the server side
        console.log(
          `User deletion for email ${nurseEmail} requires server-side implementation.`
        );
      }
    } catch (error) {
      console.error("Error updating Charge RN status: ", error);
    }
  };

  const handleEditNurse = (nurse) => {
    setEditingNurse(nurse); // Set the nurse to be edited
    setModalShowNurse(true); // Show the modal for editing
  };

  return (
    <div className="p-4">
      <NavBar />
      <h1 className="pb-4 mt-4 pt-4 mb-2">Hospital Data</h1>
      <div className="row">
        <div className="table-card d-flex flex-column m-4">
          <TableHeader title="Nurses" onClick={() => setModalShowNurse(true)} />
          <AddNewNurse
            show={modalShowNurse}
            onHide={() => {
              setModalShowNurse(false);
              setEditingNurse(null); // Reset after closing the modal
            }}
            editingNurse={editingNurse}
            onAddOrUpdateNurse={() => {
              setLoading(true);
              setEditingNurse(null); // Reset after submission
            }}
          />

          <div className="mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Charge Rn</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : (
                  nurses.map((nurse, index) => (
                    <tr key={nurse.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{nurse.name}</td>
                      <td>{nurse.email}</td>
                      <td>
                        <Form>
                          <Form.Switch
                            id={`custom-switch-${index}`}
                            checked={nurse.chargeRn}
                            onChange={() =>
                              handleChargeRnToggle(
                                nurse.id,
                                nurse.chargeRn,
                                nurse.email
                              )
                            }
                          />
                        </Form>
                      </td>
                      <td>
                        <ActionButtons
                          onDelete={() => handleDeleteNurse(nurse.id)}
                          onEdit={() => handleEditNurse(nurse)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
