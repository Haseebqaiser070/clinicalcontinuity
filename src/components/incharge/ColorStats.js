import React from "react";

const ColorStats = () => {
  return (
    <div className="p-4">

      <div className="row">

        <div className="col-6 d-flex flex-column justify-content-center">

          <p>
            <span className="stat mr-4">Staffed Beds:</span> <span>30 %</span>
          </p>
          <p>
            <span className="stat mr-4">RN Comp:</span> <span>11:00</span>
          </p>
          <p>
            <span className="stat mr-4">Floor Acuity:</span> <span>3.28</span>
          </p>
        </div>

      <div className="col-6">
        <div className="orangecol d-flex justify-content-center">
          <span className="stat mr-4">Orange </span> <span> =70%</span>
        </div>
        <div className="greencol d-flex justify-content-center">
          <span className="stat mr-4">Green </span> <span> 70% - 89%</span>
        </div>
        <div className="yellowcol d-flex justify-content-center">
          <span className="stat mr-4">Yellow </span> <span> =90% - 99%</span>
        </div>
        <div className="redcol d-flex justify-content-center">
          <span className="stat mr-4">Red </span> <span> =100%</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ColorStats;
