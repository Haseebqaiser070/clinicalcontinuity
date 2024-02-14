import React from "react";
import NavBar from "../ReusableComponents/NavBar";
import ColorStats from "./ColorStats";
import HospitalBeds from "./HospitalBeds";
import Discharge from "./Discharge";
import RoomAssigned from "./RoomAssigned";

const InchargeDashboard = () => {
  return (
    <div className="p-4">
      <NavBar />
      <h1 className="pb-2 mt-4 pt-4">MBU PNU1 DASHBOARD</h1>

      <div className="p-4">
        <p>
          <span className="stat">Date:</span> <span>2/08/2024 7:08</span>
        </p>
        <p>
          <span className="stat">Charge RN:</span> <span>Nurse A | 0.89</span>
        </p>
        <p>
          <span className="stat">Nursery RN:</span> <span>Nurse B | 0.89</span>
        </p>
      </div>
      <div className="row">
        <div className="col-md-7 d-flex flex-column m-4">
        <div className="mb-4 table-card">
            <RoomAssigned/>

          </div>
          <div className="mb-4 table-card">
            <Discharge/>

          </div>
        </div>
        <div className="col-md-4 d-flex flex-column m-4">
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
