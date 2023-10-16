import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const Get_all_rqs = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3018/api/request")
      .then(response => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-80 rounded p-3">
        <table className="table table-bordered table-striped ">
          <thead className="bg-dark text-light">
            <tr>
              <th>Request ID</th>
              <th>Manager Name</th>
              <th>Company Name</th>
              <th>supplier Name</th>
              <th>Delivery Date</th>
              <th>address</th>
            
              <th>total</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              return  (
                <tr key={`${request._id}`}>
                  <td>{request.requestId}</td>
                  <td>{request.name}</td>
                  <td>{request.supplierName}</td>
                  <td>{request.companyName}</td>
                  <td>{request.deliveryDate}</td>
                  <td>{request.address}</td>
                  <td>{request.total}</td>
                  <td>{request.status}</td>
                  <td>
                    <Link to={`/update/${request._id}`} className="btn btn-success">
                      Approve/Decline
                    </Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default Get_all_rqs;
