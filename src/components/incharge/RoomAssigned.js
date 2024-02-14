import React, { useState } from "react";

const RoomAssigned = (props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  // Dummy data for beds
  const [categories, setCategories] = useState([
    {
      name: "PNU",
      beds: [
        {
          bedNumber: "2401",
          nurse: "Nurse A",
          acuity: "0.89",
          notes: "-",
          edd: "13 Feb 2024",
        },
        {
          bedNumber: "2403",
          nurse: "Nurse A",
          acuity: "0.89",
          notes: "-",
          edd: "13 Feb 2024",
        },
        {
          bedNumber: "2404",
          nurse: "Nurse A",
          acuity: "0.89",
          notes: "-",
          edd: "13 Feb 2024",
        },
        {
          bedNumber: "2405",
          nurse: "Nurse A",
          acuity: "0.89",
          notes: "-",
          edd: "13 Feb 2024",
        },
        {
          bedNumber: "2403",
          nurse: "Nurse A",
          acuity: "0.89",
          notes: "-",
          edd: "13 Feb 2024",
        },
        // Add more beds for Category 1 as needed
      ],
      currentPage: 1,
      bedsPerPage: 4,
    },
    {
      name: "Category 2",
      beds: [
        {
          bedNumber: "2402",
          nurse: "Nurse B",
          acuity: "0.75",
          notes: "-",
          edd: "15 Feb 2024",
        },
        // Add more beds for Category 2 as needed
      ],
      currentPage: 1,
      bedsPerPage: 4,
    },
    // Add more categories as needed
  ]);

  // Function to update nurse information
  const updateNurseInfo = (categoryIndex, bedIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].beds[bedIndex].nurse = value;
    setCategories(updatedCategories);
    setShowSnackbar(true);
    // Hide the snackbar after 1-2 seconds
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  };

  // Function to update acuity information
  const updateAcuityInfo = (categoryIndex, bedIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].beds[bedIndex].acuity = value;
    setCategories(updatedCategories);
  };

  // Function to update notes information
  const updateNotesInfo = (categoryIndex, bedIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].beds[bedIndex].notes = value;
    setCategories(updatedCategories);
  };

  // Function to update EDD information
  const updateEDDInfo = (categoryIndex, bedIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].beds[bedIndex].edd = value;
    setCategories(updatedCategories);
  };

  // Function to handle pagination within a category
  const handlePageChange = (categoryIndex, pageNumber) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].currentPage = pageNumber;
    setCategories(updatedCategories);
  };

  return (
    <div>
      {categories.map((category, categoryIndex) => (
        <div className="card m-4" key={categoryIndex}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>{category.name}</h2>
            {/* <button className="btn btn-web">Update</button> */}
          </div>
          <div className="card-body table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th></th>
                  {category.beds
                    .slice(
                      (category.currentPage - 1) * category.bedsPerPage,
                      category.currentPage * category.bedsPerPage
                    )
                    .map((bed, bedIndex) => (
                      <th key={bedIndex}>{bed.bedNumber}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="subheading">Nurses</p>
                  </td>
                  {category.beds
                    .slice(
                      (category.currentPage - 1) * category.bedsPerPage,
                      category.currentPage * category.bedsPerPage
                    )
                    .map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <input
                          type="text"
                          value={bed.nurse}
                          onChange={(e) =>
                            updateNurseInfo(categoryIndex, bedIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                </tr>
                <tr>
                  <td>
                    <p className="subheading">Acuity</p>
                  </td>
                  {category.beds
                    .slice(
                      (category.currentPage - 1) * category.bedsPerPage,
                      category.currentPage * category.bedsPerPage
                    )
                    .map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <input
                          type="text"
                          value={bed.acuity}
                          onChange={(e) =>
                            updateAcuityInfo(categoryIndex, bedIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                </tr>
                <tr>
                  <td>
                    <p className="subheading">Notes</p>
                  </td>
                  {category.beds
                    .slice(
                      (category.currentPage - 1) * category.bedsPerPage,
                      category.currentPage * category.bedsPerPage
                    )
                    .map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <input
                          type="text"
                          value={bed.notes}
                          onChange={(e) =>
                            updateNotesInfo(categoryIndex, bedIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                </tr>
                <tr>
                  <td>
                    <p className="subheading">EDD</p>
                  </td>
                  {category.beds
                    .slice(
                      (category.currentPage - 1) * category.bedsPerPage,
                      category.currentPage * category.bedsPerPage
                    )
                    .map((bed, bedIndex) => (
                      <td key={bedIndex}>
                        <input
                          type="text"
                          value={bed.edd}
                          onChange={(e) =>
                            updateEDDInfo(categoryIndex, bedIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
            <nav>
              <ul className="pagination justify-content-center ">
                {Array.from(
                  { length: Math.ceil(category.beds.length / category.bedsPerPage) },
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        category.currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(categoryIndex, index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      ))}
            {/* Snackbar */}
            {showSnackbar && (
        <div className="snackbar">Updated successfully!</div>
      )}
    </div>
  );
};

export default RoomAssigned;
