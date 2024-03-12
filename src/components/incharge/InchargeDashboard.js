import React, { useState, useEffect } from "react";
import NavBar from "../ReusableComponents/NavBar";
import ColorStats from "./ColorStats";
import HospitalBeds from "./HospitalBeds";
import Discharge from "./Discharge";
import RoomAssigned from "./RoomAssigned";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  onSnapshot, // Import onSnapshot for real-time updates
} from "firebase/firestore";

const InchargeDashboard = () => {
  const [selectedRnNurse, setSelectedRnNurse] = useState("");
  const [selectedNursery, setSelectedNursery] = useState("");
  const [shiftNurses, setShiftNurses] = useState([]);

  const handleNurseryChange = async (e) => {
    try {
      const nurseryName = e.target.value;
      setSelectedNursery(nurseryName);

      // Update Firestore document
      await updateNurseStatus(nurseryName, "nurseryRN");
    } catch (error) {
      console.error("Error updating nursery RN:", error);
    }
  };

  const handleRnNurseChange = async (e) => {
    try {
      const rnName = e.target.value;
      setSelectedRnNurse(rnName);

      // Update Firestore document
      await updateNurseStatus(rnName, "chargeRN");
    } catch (error) {
      console.error("Error updating charge RN:", error);
    }
  };

  useEffect(() => {
    const fetchShiftNurses = async () => {
      try {
        const shiftNursesCollection = collection(db, "nurseshift");
        const unsubscribe = onSnapshot(shiftNursesCollection, (snapshot) => {
          const shiftNursesData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            shiftNursesData.push(...data.nurses);
          });

          // Sort shiftNursesData by date
          shiftNursesData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          });

          setShiftNurses(shiftNursesData);

          // Find the nurse with the selectedRnNurse value and update selectedRnNurse
          const selectedRnNurseDoc = shiftNursesData.find(
            (nurse) => nurse.chargeRN === true
          );
          if (selectedRnNurseDoc) {
            setSelectedRnNurse(selectedRnNurseDoc.name);
          }

          // Find the nurse with the selectedNursery value and update selectedNursery
          const selectedNurseryDoc = shiftNursesData.find(
            (nurse) => nurse.nurseryRN === true
          );
          if (selectedNurseryDoc) {
            setSelectedNursery(selectedNurseryDoc.name);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching shift nurses:", error);
      }
    };
    fetchShiftNurses();
  }, []);

  const currentDate = new Date(); // Get current date
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${currentDate.getFullYear()}`; // Format date as DD MM YYYY
  const formattedTime = `${currentDate.getHours()}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const updateNurseStatus = async (nurseName, nurseType) => {
    const shiftDocRef = doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt");

    const shiftDocSnapshot = await getDoc(shiftDocRef);
    if (shiftDocSnapshot.exists()) {
      const shiftData = shiftDocSnapshot.data();
      const updatedNurses = shiftData.nurses.map((nurse) => {
        if (nurse.name === nurseName) {
          return { ...nurse, [nurseType]: true };
        } else {
          // Update the previous nurse's value to false
          return { ...nurse, [nurseType]: false };
        }
      });

      await updateDoc(shiftDocRef, { nurses: updatedNurses });
    }
  };

  return (
    <div className="">
      <NavBar />
      <h1 className=" m-4 pt-4">MBU PNU1 DASHBOARD</h1>

      <div className="p-4 m-4">
        <p>
          <span className="stat">Date:</span>{" "}
          <span>
            {formattedDate} {formattedTime}
          </span>
        </p>
        <p>
          <span className="stat">Charge RN:</span>{" "}
          <span>
            <select
              className="bedbody nurse-input-field"
              value={selectedRnNurse}
              onChange={handleRnNurseChange}
            >
              <option value="">Select Nurse</option>
              {shiftNurses.map((nurse, index) => (
                <option key={index} value={nurse.name}>
                  {nurse.name}
                </option>
              ))}
            </select>
          </span>
        </p>
        <p>
          <span className="stat">Nursery RN:</span>{" "}
          <span>
            <select
              className="bedbody nurse-input-field"
              value={selectedNursery}
              onChange={handleNurseryChange}
            >
              <option value="">Select Nurse</option>
              {shiftNurses.map((nurse, index) => (
                <option key={index} value={nurse.name}>
                  {nurse.name}
                </option>
              ))}
            </select>
          </span>
        </p>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-7 d-flex flex-column mx-2">
          <div className="mb-4 table-card">
            <RoomAssigned />
          </div>
          <div className="mb-4 table-card">
            <Discharge />
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column mx-2">
          <div className="mb-4 table-card">
            <ColorStats />
          </div>
          <div className="table-card">
            <HospitalBeds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InchargeDashboard;
