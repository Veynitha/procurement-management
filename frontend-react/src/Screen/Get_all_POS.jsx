import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";


const Get_all_POS = () => {
  const [purchaseOrders, setPurchaseOrder] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-purchase-orders")
      .then(response => {
        setPurchaseOrder(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <h1>Purchase Orders</h1>
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Manager Name</th>
              <th>Approved By</th>
              <th>Supplier Name</th>
              <th>Company Name</th>
              <th>Delivery Date </th>
              <th>Delivery Address </th>
              <th>Item name</th>
              <th>Quantity</th>
              <th>Agreed Price</th>
              <th>Total amount </th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((purchaseOrder) => {
              return purchaseOrder.items.map((item) => (
                <tr key={`${purchaseOrder._id}`}>
                  <td>{purchaseOrder.requestReference}</td>
                  <td>{purchaseOrder.createdBy}</td>
                  <td>{purchaseOrder.approvedBy}</td>
                  <td>{purchaseOrder.supplierName}</td>
                  <td>{purchaseOrder.companyName}</td>
                  <td>{purchaseOrder.deliveryDate}</td>
                  <td>{purchaseOrder.deliveryAddress}</td>
                  
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.agreedPrice}</td>
                  <td>{purchaseOrder.total}</td>
                  <td>{purchaseOrder.status}</td>
            
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Get_all_POS;
