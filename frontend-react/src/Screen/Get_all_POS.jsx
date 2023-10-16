import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from '../components/NavBar';
import '../utils/componentCss.css'


const Get_all_POS = () => {
  const [purchaseOrders, setPurchaseOrder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3018/api/get-purchase-orders")
      .then(response => {
        setPurchaseOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="content-body">
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <h1>Purchase Orders</h1>
            <table className="table-bordered">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Approved By</th>
                  <th>Created By</th>
                  <th>Supplier Name</th>
                  <th>Company Name</th>
                  <th>Delivery Date </th>
                  <th>Delivery Address </th>
                  <th>Total amount </th>
                  <th>Status</th>

                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((purchaseOrder) => {
                  return purchaseOrder.items.map((item) => (
                    <tr key={`${purchaseOrder._id}`}>
                      <td>{purchaseOrder.requestReference}</td>
                      <td>{purchaseOrder.approvedBy}</td>
                      <td>{purchaseOrder.createdBy}</td>
                      <td>{purchaseOrder.supplierName}</td>
                      <td>{purchaseOrder.companyName}</td>
                      <td>{purchaseOrder.deliveryDate.slice(0, 10)}</td>
                      <td>{purchaseOrder.deliveryAddress}</td>
                      <td>{purchaseOrder.total}</td>
                      <td>{purchaseOrder.status}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Get_all_POS;
