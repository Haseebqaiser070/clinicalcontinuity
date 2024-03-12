import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";

const Discharge = () => {
  const [dischargeData, setDischargeData] = useState([]);

  useEffect(() => {
    const bedsCollection = collection(db, "beds");

    const unsubscribe = onSnapshot(bedsCollection, (snapshot) => {
      const dischargeDataFromFirestore = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.edd) {
          if (data.edd in dischargeDataFromFirestore) {
            dischargeDataFromFirestore[data.edd] += 1;
          } else {
            dischargeDataFromFirestore[data.edd] = 1;
          }
        }
      });

      const dischargeArray = Object.entries(dischargeDataFromFirestore).map(
        ([date, dcCount]) => ({
          date: formatDate(date), // Format date as DD MM YYYY
          dcCount
        })
      );

      // Sort the discharge data by date
      dischargeArray.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      setDischargeData(dischargeArray);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  // Function to format date as DD MM YYYY
// Function to format date as DD Mon YYYY
const formatDate = (dateString) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [year, month, day] = dateString.split("-");
  const monthIndex = parseInt(month) - 1;
  const monthAbbreviation = months[monthIndex];
  return `${day} ${monthAbbreviation} ${year}`;
};


  return (
    <div>
      <h2>Upcoming Discharge</h2>
      <div className="mt-4 table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Date</th>
              <th>DCs</th>
            </tr>
          </thead>
          <tbody>
            {dischargeData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.dcCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discharge;
