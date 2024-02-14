// TableHeader component
import React from "react";

const TableHeader = ({ title, onClick }) => {
  return (
    <div className="row">
      <div className="col-8">
        <h2>{title}</h2>
      </div>
      <div className="col-4 d-flex justify-content-center">
        {/* Button triggers modal */}
        <button className="btn btn-web" onClick={onClick}>
          Add New
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
