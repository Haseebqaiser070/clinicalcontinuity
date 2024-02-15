import React from "react";
import NavBar from "../ReusableComponents/NavBar";
import ColorStats from "./ColorStats";
import HospitalBeds from "./HospitalBeds";
import Discharge from "./Discharge";
import RoomAssigned from "./RoomAssigned";

const InchargeDashboard = () => {
  return (
    <div className="">
      <NavBar />
      <h1 className=" m-4 pt-4">MBU PNU1 DASHBOARD</h1>

      <div className="p-4 m-4">
        <p>
          <span className="stat">Date:</span> <span>2/08/2024 7:08</span>
        </p>
        <p>
          <span className="stat">Charge RN:</span> <span>Nurse A</span>
        </p>
        <p>
          <span className="stat">Nursery RN:</span> <span>Nurse B</span>
        </p>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-7 d-flex flex-column mx-2">
        <div className="mb-4 table-card">
            <RoomAssigned/>

          </div>
          <div className="mb-4 table-card">
            <Discharge/>

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
