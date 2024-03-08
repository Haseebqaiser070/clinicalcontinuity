import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles.css";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, updateDoc, getDoc, doc } from "firebase/firestore";

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
  const [modalShow, setModalShow] = useState(false);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [nurseOptions, setNurseOptions] = useState([]);
  const [shiftNurses, setShiftNurses] = useState([]);

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

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "nurses"));
        const nursesData = [];
        querySnapshot.forEach((doc) => {
          nursesData.push({ id: doc.id, ...doc.data() });
        });
        setNurseOptions(nursesData);
      } catch (error) {
        console.error("Error fetching nurses:", error);
      }
    };

    const fetchShiftNurses = async () => {
      try {
        const shiftDoc = await getDoc(doc(db, "nurseshift", "zAbhUIEBGNlKBmt4VWQn"));
        if (shiftDoc.exists()) {
          const shiftData = shiftDoc.data();
          setShiftNurses(shiftData.nurses);
        }
      } catch (error) {
        console.error("Error fetching shift nurses:", error);
      }
    };

    fetchNurses();
    fetchShiftNurses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Check if there's an existing document in the nurseshift collection
      const shiftQuerySnapshot = await getDocs(collection(db, "nurseshift"));
      if (!shiftQuerySnapshot.empty) {
        // If there's an existing document, update it
        const shiftDoc = shiftQuerySnapshot.docs[0]; // Assuming there's only one document in the collection
        await updateDoc(shiftDoc.ref, {
          nurses: selectedNurses.map((nurseId) => {
            const nurse = nurseOptions.find((nurse) => nurse.id === nurseId);
            return { id: nurse.id, name: nurse.name, co: 'No', rn: '1.0', actual: '', percent: '', points: '' };
          }),
        });
        console.log("Selected nurses updated in Firestore");
      } else {
        // If no existing document found, add a new one
        const docRef = await addDoc(collection(db, "nurseshift"), {
          nurses: selectedNurses.map((nurseId) => {
            const nurse = nurseOptions.find((nurse) => nurse.id === nurseId);
            return { id: nurse.id, name: nurse.name, co: 'No', rn: '1.0', actual: '', percent: '', points: '' };
          }),
        });
        console.log("Selected nurses added to Firestore with ID: ", docRef.id);
      }
  
      setModalShow(false);
    } catch (error) {
      console.error("Error updating/adding selected nurses to Firestore: ", error);
    }
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
            {shiftNurses.map((nurse, index) => (
              <tr key={index}>
                <td>{nurse.name}</td>
                <td>{nurse.co}</td>
                <td>{nurse.rn}</td>
                <td>{nurse.actual}</td>
                <td>
                  <p className={` ${getColorClass(nurse.percent)}`} style={{ padding: 2, textAlign: "center" }}>
                    {nurse.percent}%
                  </p>
                </td>
                <td>{nurse.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Select Nurses in Shift</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          <Form>
          <div className="columns">
              {/* Use nurseOptions fetched from Firestore */}
              {nurseOptions.map((nurse, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={nurse.name} // Assuming 'name' is the field representing nurse name in your Firestore document
                  value={nurse.id} // Use unique identifier for each nurse, like document ID
                  checked={selectedNurses.includes(nurse.id)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
            <div className="d-grid mt-4 mb-2">
              <button className="btn btn-block btn-web mt-4" onClick={handleSubmit}>Submit</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HospitalBeds;
