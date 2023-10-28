import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from '../components/NavBar';
import '../utils/componentCss.css'

const Get_all_POS = () => {
  const [purchaseOrders, setPurchaseOrder] = useState([]);
  const [filterStatus, setFilterStatus] = useState(''); // Initialize filterStatus

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

  // Filter function to get filtered purchase orders
  const filteredPurchaseOrders = purchaseOrders.flatMap((purchaseOrder) => {
    return purchaseOrder.items.filter((item) => {
      return filterStatus === '' || purchaseOrder.status === filterStatus;
    }).map((item) => ({
      requestReference: purchaseOrder.requestReference,
      companyName: purchaseOrder.companyName,
      approvedBy: purchaseOrder.approvedBy,
      createdBy: purchaseOrder.createdBy,
      deliveryDate: purchaseOrder.deliveryDate,
      deliveryAddress: purchaseOrder.deliveryAddress,
      total: purchaseOrder.total,
      status: purchaseOrder.status,
      _id: purchaseOrder._id,
    }));
  });

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="content-body">
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
          <div className="w-80 bg-white rounded p-3">
            <div className='headers'>
              <h1>Purchase Orders</h1>
              <div>
                <label>Filter by Status: </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="placed">Placed</option>
                  <option value="halted">Halted</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Request ID</th>
                    <th>Company Name</th>
                    <th>Approved By</th>
                    <th>Created By</th>
                    <th>Delivery Date</th>
                    <th>Delivery Address</th>
                    <th>Total amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchaseOrders.map((purchaseOrder) => (
                    <tr key={purchaseOrder._id}>
                      <td>{purchaseOrder.requestReference}</td>
                      <td>{purchaseOrder.companyName}</td>
                      <td>{purchaseOrder.approvedBy}</td>
                      <td>{purchaseOrder.createdBy}</td>
                      <td>{purchaseOrder.deliveryDate.slice(0, 10)}</td>
                      <td>{purchaseOrder.deliveryAddress}</td>
                      <td>{purchaseOrder.total}</td>
                      <td>{purchaseOrder.status}</td>
                      <td>
                        <Link to={`/purchaseOrder/${purchaseOrder._id}`} className="btn btn-success">View Order</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Get_all_POS;
