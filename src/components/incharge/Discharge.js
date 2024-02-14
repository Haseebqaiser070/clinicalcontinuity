import React from "react";

const Discharge = () => {
  const beds = [
    { date: "18 Feb", dc: "0.0", hxadmit: "03", bedcensus: "22.0" },
    { date: "19 Feb", dc: "1.0", hxadmit: "05", bedcensus: "24.0" },
    { date: "20 Feb", dc: "2.0", hxadmit: "07", bedcensus: "26.0" },
    { date: "20 Feb", dc: "2.0", hxadmit: "07", bedcensus: "26.0" },
    { date: "20 Feb", dc: "2.0", hxadmit: "07", bedcensus: "26.0" },
  ];

  return (
    <div>
      <h2>Upcoming Discharge</h2>

      <div className="mt-4 table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th></th>
              {beds.map((bed, index) => (
                <th key={index}>{bed.date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class>
                <p className="subheading">DC's</p>
              </td>
              {beds.map((bed, index) => (
                <td key={index}>{bed.dc}</td>
              ))}
            </tr>
            <tr>
              <td>
                <p className="subheading">HX Admit</p>
              </td>
              {beds.map((bed, index) => (
                <td key={index}>{bed.hxadmit}</td>
              ))}
            </tr>
            <tr>
              <td>
                <p className="subheading">Bed Census</p>
              </td>
              {beds.map((bed, index) => (
                <td key={index}>{bed.bedcensus}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discharge;
