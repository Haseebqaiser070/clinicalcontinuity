import React from "react";
import "../styles.css";

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
  const percent = 119; // Sample percent value, replace it with your actual value
  const colorClass = getColorClass(percent);

  return (
    <div>

        <h2>Hospital Beds</h2>

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
            <tr>
              <td>Nurse A</td>
              <td>No</td>
              <td>1.0</td>
              <td>0.89</td>
              <td>
                <p
                  className={` ${colorClass}`}
                  style={{ padding: 2, textAlign: "center" }}
                >
                  {percent}%
                </p>
              </td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalBeds;
