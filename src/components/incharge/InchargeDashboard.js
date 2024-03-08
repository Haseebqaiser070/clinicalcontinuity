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
} from "firebase/firestore";

const InchargeDashboard = () => {
  const [selectedRnNurse, setSelectedRnNurse] = useState("");
  const [selectedNursery, setSelectedNursery] = useState("");
  const [shiftNurses, setShiftNurses] = useState([]);

  const handleNurseryChange = (e) => {
    setSelectedNursery(e.target.value);
  };

  const handleRnNurseChange = (e) => {
    setSelectedRnNurse(e.target.value);
  };

  useEffect(() => {
    const fetchShiftNurses = async () => {
      try {
        const shiftDoc = await getDoc(
          doc(db, "nurseshift", "zAbhUIEBGNlKBmt4VWQn")
        );
        if (shiftDoc.exists()) {
          const shiftData = shiftDoc.data();
          setShiftNurses(shiftData.nurses);
        }
      } catch (error) {
        console.error("Error fetching shift nurses:", error);
      }
    };
    fetchShiftNurses();
  }, []);

  const currentDate = new Date(); // Get current date
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`; // Format date as MM/DD/YYYY
  const formattedTime = `${currentDate.getHours()}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

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
