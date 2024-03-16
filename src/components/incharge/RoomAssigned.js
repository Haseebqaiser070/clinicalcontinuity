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

const RoomAssigned = () => {
  const [bedsData, setBedsData] = useState([]);
  const [nurseOptions, setNurseOptions] = useState([]);
  const [acuityOptions] = useState([
    { label: "1:1", value: 0.89 },
    { label: "1:2", value: 0.44 },
    { label: "1:3", value: 0.3 },
    { label: "1:4", value: 0.23 },
    { label: "1:5", value: 0.18 },
  ]);

  const [nurseBedCounts, setNurseBedCounts] = useState({});



  let tableIndex = 0;

  useEffect(() => {
    const fetchBedsData = async () => {
      try {
        const bedsCollection = collection(db, "beds");
        const unsubscribe = onSnapshot(bedsCollection, (snapshot) => {
          const bedsDataFromFirestore = [];
          snapshot.forEach((doc) => {
            bedsDataFromFirestore.push({ id: doc.id, ...doc.data() });
          });
          // Sort bedsData by bedNumber in ascending order
          bedsDataFromFirestore.sort((a, b) =>
            a.bedNumber.localeCompare(b.bedNumber)
          );
          setBedsData(bedsDataFromFirestore);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching beds data:", error);
      }
    };

    const fetchNurseOptions = async () => {
      try {
        const shiftDoc = await getDoc(
          doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt")
        );
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt"),
      (snapshot) => {
        const data = snapshot.data();
        setNurseOptions(data.nurses);
        // Update nurse bed counts in local state
        const nurseBedCounts = {};
        data.nurses.forEach((nurse) => {
          nurseBedCounts[nurse.id] = nurse.totalBeds || 0;
        });
        setNurseBedCounts(nurseBedCounts);
      }
    );
  
    return unsubscribe;
  }, [bedsData]);
  const handleNurseChange = async (bedId, nurseId, oldNurseId) => {
    try {
      // Update bed assignment
      await updateDoc(doc(db, "beds", bedId), { nurseId });
  
      // Update nurse bed count and total acuity in Firestore
      const shiftDocRef = doc(db, "nurseshift", "ie4Wp5jHRxIxq7r8TkRt");
      const shiftDocSnapshot = await getDoc(shiftDocRef);
      if (shiftDocSnapshot.exists()) {
        const shiftData = shiftDocSnapshot.data();
        const updatedNurses = shiftData.nurses.map((nurse) => {
          let totalBeds = 0;
          let totalAcuity = 0; // Initialize total acuity
          bedsData.forEach((bed) => {
            if (bed.nurseId === nurse.id) {
              totalBeds++;
              // Calculate total acuity for the nurse
              const acuityValue = parseFloat(
                acuityOptions.find((option) => option.value === parseFloat(bed.acuity))?.value || 0
              );
              totalAcuity += acuityValue;
            }
          });
          return { ...nurse, totalBeds, totalAcuity }; // Update total acuity for the nurse
        });
  
        // Update Firestore with the new nurse data
        await updateDoc(shiftDocRef, { nurses: updatedNurses });
      }
    } catch (error) {
      console.error("Error updating nurse:", error);
    }
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
            acuityOptions.find((option) => option.value === parseFloat(bed.acuity))?.value || 0
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
    return bedsData.filter((bed) => {
      const bedNumber = parseInt(bed.bedNumber);
      return bedNumber >= start && bedNumber <= end;
    });
  };

  return (
    <div>
      {/* 2401 -2407 */}
      <div className="table-responsive mb-4 " >
        <table
          className="table table-hover table-sm table-bordered "
          style={{ tableLayout: "fixed"}}
        >
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
        <table
          className="table-hover table-sm table-bordered table-primary"
          style={{ tableLayout: "fixed" }}
        >
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
