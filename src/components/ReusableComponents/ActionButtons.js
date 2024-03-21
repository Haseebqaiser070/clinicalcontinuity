import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ActionButtons = (props) => {
  const { onDelete } = props;
  const { onEdit } = props;

  return (
    <div className="row">
      {/* <div className="col-1">
        <button className="btn icon-btn" onClick={onEdit}><FaEdit /></button>
      </div> */}
      <div className="col-1">
        {/* Use onDelete prop for onClick handler */}
        <button className="btn icon-btn" onClick={onDelete}><FaTrashAlt/></button>
      </div>
    </div>
  );
};

export default ActionButtons;
