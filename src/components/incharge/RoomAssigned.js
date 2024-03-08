import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, doc, updateDoc, getDoc } from "firebase/firestore";

const RoomAssigned = () => {
  const [bedsData, setBedsData] = useState([]);
  const [nurseOptions, setNurseOptions] = useState([]);
  const [acuityOptions] = useState(["1:1", "1:2", "1:3", "1:4", "1:5"]);
  const tableColors = ["table-primary", "table-success", "table-warning", "table-info"];
  let tableIndex = 0;
  

  useEffect(() => {
    const fetchBedsData = async () => {
      try {
        const bedsCollection = collection(db, "beds");
        const bedsSnapshot = await getDocs(bedsCollection);
        const bedsDataFromFirestore = [];
        bedsSnapshot.forEach((doc) => {
          bedsDataFromFirestore.push({ id: doc.id, ...doc.data() });
        });
        // Sort bedsData by bedNumber in ascending order
        bedsDataFromFirestore.sort((a, b) => a.bedNumber.localeCompare(b.bedNumber));
        setBedsData(bedsDataFromFirestore);
      } catch (error) {
        console.error("Error fetching beds data:", error);
      }
    };

    const fetchNurseOptions = async () => {
      try {
        const shiftDoc = await getDoc(doc(db, "nurseshift", "zAbhUIEBGNlKBmt4VWQn"));
        if (shiftDoc.exists()) {
          const shiftData = shiftDoc.data();
          setNurseOptions(shiftData.nurses);
        }
      } catch (error) {
        console.error("Error fetching nurse options:", error);
      }
    };

    fetchBedsData();
    fetchNurseOptions();
  }, []);

  const handleNurseChange = async (bedId, nurseId) => {
    try {
      await updateDoc(doc(db, "beds", bedId), { nurseId });
      // Update local state
      const updatedBedsData = bedsData.map((bed) =>
        bed.id === bedId ? { ...bed, nurseId } : bed
      );
      setBedsData(updatedBedsData);
    } catch (error) {
      console.error("Error updating nurse:", error);
    }
  };

  const handleAcuityChange = async (bedId, value) => {
    try {
      await updateDoc(doc(db, "beds", bedId), { acuity: value });
      // Update local state
      const updatedBedsData = bedsData.map((bed) =>
        bed.id === bedId ? { ...bed, acuity: value } : bed
      );
      setBedsData(updatedBedsData);
    } catch (error) {
      console.error("Error updating acuity:", error);
    }
  };

  const handleNotesChange = async (bedId, value) => {
    try {
      await updateDoc(doc(db, "beds", bedId), { notes: value });
      // Update local state
      const updatedBedsData = bedsData.map((bed) =>
        bed.id === bedId ? { ...bed, notes: value } : bed
      );
      setBedsData(updatedBedsData);
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  const handleEDDChange = async (bedId, value) => {
    try {
      await updateDoc(doc(db, "beds", bedId), { edd: value });
      // Update local state
      const updatedBedsData = bedsData.map((bed) =>
        bed.id === bedId ? { ...bed, edd: value } : bed
      );
      setBedsData(updatedBedsData);
    } catch (error) {
      console.error("Error updating EDD:", error);
    }
  };

    // Function to filter beds based on bed number range
    const filterBedsByRange = (start, end) => {
      return bedsData.filter((bed) => {
        const bedNumber = parseInt(bed.bedNumber);
        return bedNumber >= start && bedNumber <= end;
      });
    };

  return (
    <div>

      {/* 2401 -2407 */}
      <div className="table-responsive mb-4">
        <table className='table table-hover table-sm table-bordered' style={{ tableLayout: "fixed" }}>
          <thead>
          <tr>
              <th></th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <th key={bed.id} className="bedhead">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nurse</td>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.nurseId}
                    onChange={(e) => handleNurseChange(bed.id, e.target.value)}
                  >
                    <option value="">Select Nurse</option>
                    {nurseOptions.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Acuity</td>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) => handleAcuityChange(bed.id, e.target.value)}
                  >
                    {acuityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Notes</td>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="text"
                    value={bed.notes}
                    onChange={(e) => handleNotesChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>EDD</td>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="date"
                    value={bed.edd}
                    onChange={(e) => handleEDDChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

{/* 2501 -2510 */}

      <div className="table-responsive mb-4">
        <table className="table-hover table-sm table-bordered">
          <thead>
          <tr>
              <th></th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <th key={bed.id} className="bedhead">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nurse</td>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.nurseId}
                    onChange={(e) => handleNurseChange(bed.id, e.target.value)}
                  >
                    <option value="">Select Nurse</option>
                    {nurseOptions.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Acuity</td>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) => handleAcuityChange(bed.id, e.target.value)}
                  >
                    {acuityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Notes</td>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="text"
                    value={bed.notes}
                    onChange={(e) => handleNotesChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>EDD</td>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="date"
                    value={bed.edd}
                    onChange={(e) => handleEDDChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

{/* 2511 -2520 */}

      <div className="table-responsive mb-4 table-primary">
        <table className="table-hover table-sm table-bordered table-primary" style={{ tableLayout: "fixed" }}>
          <thead>
          <tr>
              <th></th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <th key={bed.id} className="bedhead">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nurse</td>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.nurseId}
                    onChange={(e) => handleNurseChange(bed.id, e.target.value)}
                  >
                    <option value="">Select Nurse</option>
                    {nurseOptions.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Acuity</td>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) => handleAcuityChange(bed.id, e.target.value)}
                  >
                    {acuityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Notes</td>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="text"
                    value={bed.notes}
                    onChange={(e) => handleNotesChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>EDD</td>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="date"
                    value={bed.edd}
                    onChange={(e) => handleEDDChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

{/* 2521 -2531 */}

      <div className="table-responsive">
        <table className="table-hover table-sm table-bordered">
          <thead>
          <tr>
              <th></th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <th key={bed.id} className="bedhead">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nurse</td>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.nurseId}
                    onChange={(e) => handleNurseChange(bed.id, e.target.value)}
                  >
                    <option value="">Select Nurse</option>
                    {nurseOptions.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Acuity</td>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={bed.id}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) => handleAcuityChange(bed.id, e.target.value)}
                  >
                    {acuityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Notes</td>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="text"
                    value={bed.notes}
                    onChange={(e) => handleNotesChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>EDD</td>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={bed.id}>
                  <input
                    className="bedbody input-field"
                    type="date"
                    value={bed.edd}
                    onChange={(e) => handleEDDChange(bed.id, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomAssigned;
