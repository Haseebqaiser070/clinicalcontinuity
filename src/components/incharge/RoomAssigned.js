import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const RoomAssigned = ({ setShiftNurses }) => {
  const [bedsData, setBedsData] = useState([]);
  const [nurseOptions, setNurseOptions] = useState([]);
  const [acuityOptions] = useState([
    { label: "1:1", value: 0.89 },
    { label: "1:2", value: 0.44 },
    { label: "1:3", value: 0.3 },
    { label: "1:4", value: 0.23 },
    { label: "1:5", value: 0.18 },
  ]);
  const [isLoading, setIsLoading] = useState(false); 

  const [nurseBedCounts, setNurseBedCounts] = useState({});

  useEffect(() => {
    // Fetch beds data
    const bedsCollection = collection(db, "beds");
    const unsubscribeBeds = onSnapshot(bedsCollection, (snapshot) => {
      const bedsDataFromFirestore = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      bedsDataFromFirestore.sort((a, b) =>
        a.bedNumber.localeCompare(b.bedNumber)
      );
      setBedsData(bedsDataFromFirestore);
    });

    // Fetch nurses data
    const shiftDocRef = doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt");
    const unsubscribeNurses = onSnapshot(shiftDocRef, (snapshot) => {
      const data = snapshot.data();
      setNurseOptions(data.nurses);
      const nurseBedCountsUpdate = data.nurses.reduce((acc, nurse) => {
        acc[nurse.id] = nurse.totalBeds || 0;
        return acc;
      }, {});
      setNurseBedCounts(nurseBedCountsUpdate);
    });

    // Clean up subscriptions on component unmount
    return () => {
      unsubscribeBeds();
      unsubscribeNurses();
    };
  }, []);

  const handleNurseChange = async (bedId, newNurseId) => {
    setIsLoading(true);
    try {
      // Step 1: Update the nurse assignment for the bed in Firestore
      await updateDoc(doc(db, "beds", bedId), { nurseId: newNurseId });

      // Fetch the latest beds data after the update to ensure accuracy
      const bedsSnapshot = await getDocs(collection(db, "beds"));
      const latestBedsData = bedsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Prepare to recalculate beds and acuity for nurses
      const nurseCalculations = {}; // Object to hold recalculated values

      // Initialize all nurses in nurseCalculations to ensure we correctly handle nurses with 0 beds or acuity
      nurseOptions.forEach((nurse) => {
        nurseCalculations[nurse.id] = { totalBeds: 0, totalAcuity: 0 };
      });

      // Recalculate total beds and acuity for each nurse based on the updated beds data
      latestBedsData.forEach((bed) => {
        const nurseId = bed.nurseId;
        if (nurseId && nurseCalculations[nurseId] !== undefined) {
          nurseCalculations[nurseId].totalBeds += 1;
          // Assume bed.acuity is a value that directly corresponds to one of the acuityOptions values
          const acuityValue = parseFloat(bed.acuity || 0);
          nurseCalculations[nurseId].totalAcuity += acuityValue;
        }
      });

      // Update the nurseshift document in Firestore with recalculated values
      const updatedNurses = nurseOptions.map((nurse) => ({
        ...nurse,
        totalBeds: nurseCalculations[nurse.id].totalBeds,
        // Ensure totalAcuity is rounded or formatted as needed
        totalAcuity: parseFloat(
          nurseCalculations[nurse.id].totalAcuity.toFixed(2)
        ),
      }));

      // Update Firestore
      const shiftDocRef = doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt");
      await updateDoc(shiftDocRef, { nurses: updatedNurses });

      // Update local state
      setBedsData(latestBedsData);
      setNurseOptions(updatedNurses);
    } catch (error) {
      console.error("Error updating nurse assignment:", error);
    }
    setIsLoading(false);
  };

  const handleAcuityChange = async (bedId, nurseId, value) => {
    try {
      await updateDoc(doc(db, "beds", bedId), { acuity: value });

      // Update local state
      const updatedBedsData = bedsData.map((bed) =>
        bed.id === bedId ? { ...bed, acuity: value } : bed
      );
      setBedsData(updatedBedsData);

      // Calculate the total acuity for the nurse
      let totalAcuity = 0;
      updatedBedsData.forEach((bed) => {
        if (bed.nurseId === nurseId) {
          const acuityValue = parseFloat(
            acuityOptions.find(
              (option) => option.value === parseFloat(bed.acuity)
            )?.value || 0
          );
          totalAcuity += acuityValue;
        }
      });

      // Round total acuity to 2 decimal places
      totalAcuity = totalAcuity.toFixed(2);

      // Update the nurse shift document
      const shiftDocRef = doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt");
      const shiftDocSnapshot = await getDoc(shiftDocRef);
      if (shiftDocSnapshot.exists()) {
        const shiftData = shiftDocSnapshot.data();
        const updatedNurses = shiftData.nurses.map((nurse) => {
          if (nurse.id === nurseId) {
            return { ...nurse, totalAcuity };
          } else {
            return nurse;
          }
        });
        await updateDoc(shiftDocRef, { nurses: updatedNurses });
      }
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
    return bedsData
      .filter((bed) => {
        const bedNumber = parseInt(bed.bedNumber);
        return bedNumber >= start && bedNumber <= end;
      })
      .sort((a, b) => parseInt(a.bedNumber) - parseInt(b.bedNumber));
  };

  return (
    <div>
      {/* 2401 -2407 */}
      <div className="table-responsive mb-4 ">
        <table
          className="table table-hover table-sm table-bordered table-primary"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th></th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <th key={`bed-${bed.id}`} className=" text-center bedhead">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nurse</th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>Acuity</th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={`bed-${bed.id}`}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) =>
                      handleAcuityChange(bed.id, bed.nurseId, e.target.value)
                    }
                  >
                    {acuityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th>Notes</th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>EDD</th>
              {filterBedsByRange(2401, 2407).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
        <table className="table table-hover table-sm table-bordered table-danger" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th></th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <th key={`bed-${bed.id}`} className="bedhead text-center">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nurse</th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>Acuity</th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={`bed-${bed.id}`}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) =>
                      handleAcuityChange(bed.id, bed.nurseId, e.target.value)
                    }
                  >
                    {acuityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th>Notes</th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>EDD</th>
              {filterBedsByRange(2501, 2510).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
        <table
          className="table table-hover table-sm table-bordered table-success"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th></th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <th key={`bed-${bed.id}`} className="bedhead text-center">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nurse</th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>Acuity</th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={`bed-${bed.id}`}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) =>
                      handleAcuityChange(bed.id, bed.nurseId, e.target.value)
                    }
                  >
                    {acuityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th>Notes</th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>EDD</th>
              {filterBedsByRange(2511, 2520).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
        <table className="table table-hover table-sm table-bordered table-warning " style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th></th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <th key={`bed-${bed.id}`} className="bedhead text-center">
                  {bed.bedNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nurse</th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>Acuity</th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={`bed-${bed.id}`}>
                  <select
                    className="bedbody input-field"
                    value={bed.acuity}
                    onChange={(e) =>
                      handleAcuityChange(bed.id, bed.nurseId, e.target.value)
                    }
                  >
                    {acuityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <th>Notes</th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
              <th>EDD</th>
              {filterBedsByRange(2521, 2531).map((bed) => (
                <td key={`bed-${bed.id}`}>
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
