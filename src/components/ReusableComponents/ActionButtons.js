import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const ActionButtons = (props) => {
  return (
    <div className="row">
      <div className="col-1">
      <button className="btn icon-btn"><FaEdit /></button>

       
      </div>
      <div className=" col-1">
        <button className="btn icon-btn"><FaTrashAlt/></button>
      </div>
    </div>
  );
};

export default ActionButtons;