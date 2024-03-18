import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const getColorClass = (totalAcuity) => {
  const percent = totalAcuity * 100;
  if (percent <= 70) {
    return "orangecol";
  } else if (percent >= 71 && percent <= 89) {
    return "greencol";
  } else if (percent >= 90 && percent <= 99) {
    return "yellowcol";
  } else {
    return "redcol";
  }
};

const HospitalBeds = ({ setShiftNurses, shiftNurses }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedNurses, setSelectedNurses] = useState([]);
  const [nurseOptions, setNurseOptions] = useState([]);

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
        const shiftNursesCollection = collection(db, "nurseshift");
        const unsubscribe = onSnapshot(shiftNursesCollection, (snapshot) => {
          const shiftNursesData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            shiftNursesData.push(...data.nurses);
          });
          setShiftNurses(shiftNursesData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching shift nurses:", error);
      }
    };

    fetchNurses();
    fetchShiftNurses();
  }, []);

  useEffect(() => {
    // Populate selectedNurses when the modal opens
    if (modalShow) {
      const selectedNurseIds = shiftNurses.map((nurse) => nurse.id);
      setSelectedNurses(selectedNurseIds);
    }
  }, [modalShow, shiftNurses]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const shiftQuerySnapshot = await getDocs(collection(db, "nurseshift"));
      if (!shiftQuerySnapshot.empty) {
        const shiftDoc = shiftQuerySnapshot.docs[0];
        await updateDoc(shiftDoc.ref, {
          nurses: selectedNurses.map((nurseId) => {
            const nurse = nurseOptions.find((nurse) => nurse.id === nurseId);
            return {
              id: nurse.id,
              name: nurse.name,
              rn: "1.0",
              totalAcuity: "",
              points: "",
              chargern: false,
              nurseryrn: false,
            };
          }),
        });
        console.log("Selected nurses updated in Firestore");
      } else {
        const docRef = await addDoc(collection(db, "nurseshift"), {
          nurses: selectedNurses.map((nurseId) => {
            const nurse = nurseOptions.find((nurse) => nurse.id === nurseId);
            return {
              id: nurse.id,
              name: nurse.name,
              rn: "1.0",
              totalAcuity: "",
              points: "",
              chargern: false,
              nurseryrn: false,
            };
          }),
        });
        console.log("Selected nurses added to Firestore with ID: ", docRef.id);
      }

      setModalShow(false);
    } catch (error) {
      console.error(
        "Error updating/adding selected nurses to Firestore: ",
        error
      );
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
                <td>{nurse.rn}</td>
                <td>{nurse.totalAcuity}</td>
                <td>
                  <p
                    className={` ${getColorClass(nurse.totalAcuity)}`}
                    style={{ padding: 2, textAlign: "center" }}
                  >
                    {nurse.totalAcuity * 100}%
                  </p>
                </td>
                <td>{nurse.totalBeds}</td>
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
              {nurseOptions.map((nurse, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={nurse.name}
                  value={nurse.id}
                  checked={selectedNurses.includes(nurse.id)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
            <div className="d-grid mt-4 mb-2">
              <button
                className="btn btn-block btn-web mt-4"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HospitalBeds;
