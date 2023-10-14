import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";


const Get_all_rqs = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/request")
      .then(response => {
        setRequests(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
              <th>requestId</th>
              <th>name</th>
              <th>supplierName</th>
              <th>deliveryDate</th>
              <th>address</th>
              <th>item name</th>
              <th>qty</th>
              <th>price</th>
              <th>total</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => {
              return request.items.map((item, index) => (
                <tr key={`${request.requestId}-${index}`}>
                  <td>{request.requestId}</td>
                  <td>{request.name}</td>
                  <td>{request.supplierName}</td>
                  <td>{request.deliveryDate}</td>
                  <td>{request.address}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.agreedPrice}</td>
                  <td>{request.total}</td>
                  <td>{request.status}</td>
                  <td>
                  <Link to={`/update/${request.requestId}`} className="btn btn-success">
                      Update
                    </Link>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Get_all_rqs;
