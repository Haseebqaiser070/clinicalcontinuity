import React, { useState } from "react";
import TableHeader from "../ReusableComponents/TableHeader";
import ActionButtons from "../ReusableComponents/ActionButtons";
import NavBar from "../ReusableComponents/NavBar";
import AddNewBed from "./AddNewBed";
import Modal from "react-bootstrap/Modal";
import AddBedCat from "./AddBedCat";
import AddNewNurse from "./AddNewNurse";
import Form from "react-bootstrap/Form";

const AdminDashboard = () => {
  const [modalShowBed, setModalShowBed] = useState(false);
  const [modalShowCat, setModalShowCat] = useState(false);
  const [modalShowNurse, setModalShowNurse] = useState(false);

  return (
    <div className="p-4">
      <NavBar />
      <h1 className="pb-4 mt-4 pt-4 mb-2">Hospital Data</h1>
      {/* <div className="row">
        <div className="col-md-7 table-card d-flex flex-column m-4">
          <TableHeader
            title="Hospital Beds"
            onClick={() => setModalShowBed(true)}
          />
          <AddNewBed
            show={modalShowBed}
            onHide={() => setModalShowBed(false)}
          />

          <div className="mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th className="col-2">#</th>
                  <th className="col-3">BEDS</th>
                  <th className="col-4">CATEGORY</th>
                  <th className="col-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>2401</td>
                  <td>PNU</td>
                  <td>
                    <ActionButtons />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>2402</td>
                  <td>PNN</td>
                  <td>
                    <ActionButtons />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4 table-card d-flex flex-column m-4">
          <TableHeader
            title="Beds Categories"
            onClick={() => setModalShowCat(true)}
          />
          <AddBedCat
            show={modalShowCat}
            onHide={() => setModalShowCat(false)}
          />

          <div className=" mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>PNU</td>
                  <td>
                    <ActionButtons />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>PNN</td>
                  <td>
                    <ActionButtons />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="table-card d-flex flex-column m-4">
          <TableHeader title="Nurses" onClick={() => setModalShowNurse(true)} />
          <AddNewNurse
            show={modalShowNurse}
            onHide={() => setModalShowNurse(false)}
          />

          <div className="mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Charge Rn</th>

                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Nurse A</td>
                  <td>nursea@gmail.com</td>
                  <td>
                    {" "}
                    <Form>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        checked

                       
                      />
                    </Form>
                  </td>

                  <td>
                    <ActionButtons />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Nurse B</td>
                  <td>nurseb@gmail.com</td>
                  <td>
                    <Form>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        
                      />
                    </Form>
                  </td>
                  <td>
                    <ActionButtons />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
