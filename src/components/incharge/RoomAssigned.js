import React, { useState } from "react";

const RoomAssigned = (props) => {
  const [bedsTable1, setBedsTable1] = useState([
    {
      bedNumber: "2401",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2402",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2403",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2404",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2405",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2406",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2407",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    // Add more beds for Table 1 as needed
  ]);

  const [bedsTable2, setBedsTable2] = useState([
    {
      bedNumber: "2501",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2502",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2503",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2504",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2505",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2506",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2507",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2508",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2509",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2510",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
  ]);

  const [bedsTable3, setBedsTable3] = useState([
    {
      bedNumber: "2511",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2512",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2513",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2514",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2515",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2516",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2517",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2518",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2519",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2520",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
  ]);

  const [bedsTable4, setBedsTable4] = useState([
    {
      bedNumber: "2521",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },
    {
      bedNumber: "2522",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2523",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2524",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2525",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2526",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2527",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2528",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2529",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2530",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },    {
      bedNumber: "2531",
      nurse: "Nurse A",
      acuity: "0.89",
      notes: "",
      edd: "13 Feb 2024",
    },   

  ]);

  const acuityOptions = ["1:1", "1:2", "1:3", "1:4", "1:5"];
  const nurseOptions = ["Nurse A", "Nurse B", "Nurse C", "Nurse D", "Nurse E"];

  // Function to update nurse information
  const updateNurseInfo = (tableIndex, bedIndex, value) => {
    const setBeds = getSetBedsFunction(tableIndex);
    const updatedBeds = [...setBeds];
    updatedBeds[bedIndex].nurse = value;
    switch (tableIndex) {
      case 1:
        setBedsTable1(updatedBeds);
        break;
      case 2:
        setBedsTable2(updatedBeds);
        break;
      case 3:
        setBedsTable3(updatedBeds);
        break;
      case 4:
        setBedsTable4(updatedBeds);
        break;
      default:
        break;
    }
  };

  // Function to update acuity information
  const updateAcuityInfo = (tableIndex, bedIndex, value) => {
    const setBeds = getSetBedsFunction(tableIndex);
    const updatedBeds = [...setBeds];
    updatedBeds[bedIndex].acuity = value;
    switch (tableIndex) {
      case 1:
        setBedsTable1(updatedBeds);
        break;
      case 2:
        setBedsTable2(updatedBeds);
        break;
      case 3:
        setBedsTable3(updatedBeds);
        break;
      case 4:
        setBedsTable4(updatedBeds);
        break;
      default:
        break;
    }
  };

  // Function to update notes information
  const updateNotesInfo = (tableIndex, bedIndex, value) => {
    const setBeds = getSetBedsFunction(tableIndex);
    const updatedBeds = [...setBeds];
    updatedBeds[bedIndex].notes = value;
    switch (tableIndex) {
      case 1:
        setBedsTable1(updatedBeds);
        break;
      case 2:
        setBedsTable2(updatedBeds);
        break;
      case 3:
        setBedsTable3(updatedBeds);
        break;
      case 4:
        setBedsTable4(updatedBeds);
        break;
      default:
        break;
    }
  };

  // Function to update EDD information
  const updateEDDInfo = (tableIndex, bedIndex, value) => {
    const setBeds = getSetBedsFunction(tableIndex);
    const updatedBeds = [...setBeds];
    updatedBeds[bedIndex].edd = value;
    switch (tableIndex) {
      case 1:
        setBedsTable1(updatedBeds);
        break;
      case 2:
        setBedsTable2(updatedBeds);
        break;
      case 3:
        setBedsTable3(updatedBeds);
        break;
      case 4:
        setBedsTable4(updatedBeds);
        break;
      default:
        break;
    }
  };

  // Function to return the appropriate setBeds function based on tableIndex
  const getSetBedsFunction = (tableIndex) => {
    switch (tableIndex) {
      case 1:
        return bedsTable1;
      case 2:
        return bedsTable2;
      case 3:
        return bedsTable3;
      case 4:
        return bedsTable4;
      default:
        return bedsTable1;
    }
  };
  const tableColors = ["table-primary", "table-secondary", "table-success", "table-danger"];

  return (
    <div>
      {/* Render each table separately */}
      {[bedsTable1, bedsTable2, bedsTable3, bedsTable4].map(
        (beds, tableIndex) => (
          <div key={tableIndex} className="m-4">
            <div className={`table-responsive ${tableColors[tableIndex]} `}>
              <table className={`table-hover table-sm table table-bordered ${tableColors[tableIndex]}`}>

                <thead>
                  <tr>
                    <th  className="bedhead ">Beds</th>
                    {beds.map((bed, bedIndex) => (
                      <th className="bedhead" key={bedIndex}>
                        {bed.bedNumber}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="bedhead">Nurse</th>
                    {beds.map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <select
                          className="bedbody input-field"
                          value={bed.nurse}
                          onChange={(e) =>
                            updateNurseInfo(
                              tableIndex + 1,
                              bedIndex,
                              e.target.value
                            )
                          }
                        >
                          {nurseOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="bedhead">Acuity</th>
                    {beds.map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <select
                          className="bedbody input-field"
                          value={bed.acuity}
                          onChange={(e) =>
                            updateAcuityInfo(
                              tableIndex + 1,
                              bedIndex,
                              e.target.value
                            )
                          }
                        >
                          {acuityOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="bedhead">Notes</th>
                    {beds.map((bed, bedIndex) => (
                      <td key={bedIndex} className="col-1">
                        <input
                          className="bedbody input-field"
                          type="text"
                          value={bed.notes}
                          onChange={(e) =>
                            updateNotesInfo(
                              tableIndex + 1,
                              bedIndex,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="bedhead">EDD</th>
                    {beds.map((bed, bedIndex) => (
                      <td key={bedIndex} >
                        <input
                          className="bedbody input-field"
                          type="date"
                          value={bed.edd}
                          onChange={(e) =>
                            updateEDDInfo(
                              tableIndex + 1,
                              bedIndex,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default RoomAssigned;
