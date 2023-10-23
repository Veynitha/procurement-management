import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/NavBar';
import '../utils/componentCss.css'

const Req_PurchaseOrder = () => {
  const { id } = useParams();
  const [requestId, setRequestId] = useState("");
  const [name, setName] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [supplierName, setSupplier] = useState("");
  const [companyName, setCompany] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [address, setAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [agreedPrice, setAgreedPrice] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3018/api/get-request/${id}`)
      .then((result) => {
        console.log("data", result.data);
        const data = result.data;
        setRequestId(data.requestId);
        setName(data.name);
        setApprovedBy(data.approvedBy);
        setSupplier(data.supplierName);
        setCompany(data.companyName);
        setDeliveryDate(data.deliveryDate);
        setAddress(data.address);
        setTotal(data.total);
        setStatus(data.status);

        if (Array.isArray(data.items) && data.items.length > 0) {
          const firstItem = data.items[0];
          setItemName(firstItem.itemName);
          setQuantity(firstItem.quantity);
          setAgreedPrice(firstItem.agreedPrice);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  console.log(id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = [
      {
        itemName: itemName,
        quantity: quantity,
        agreedPrice: agreedPrice,
      },
    ];

    const request = {
      requestReference: id,
      createdBy: name,
      approvedBy: approvedBy,
      supplierName: supplierName,
      companyName: companyName,
      deliveryDate: deliveryDate,
      deliveryAddress: address,
      total: total,
      items: items,
    };

    const purchaseOrder = await axios.post(
      "http://localhost:3018/api/create-purchase-orders",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((result) => {
        console.log("PO", result);
        (result) ? alert("Purchase Order Created Successfully") : alert("Purchase Order Creation Failed");
        nav("/po");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="content-body">
        <div className="d-flex vh-80 bg-light justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <h1>Create Purchase Order</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="requestId">Request ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={requestId}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Manager Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="approvedBy">Approved by</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Approved Manager's Name"
                  value={approvedBy}
                  onChange={(e) => setApprovedBy(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="supplierName">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={supplierName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company name</label>
                <input
                  type="text"
                  className="form-control"
                  value={companyName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={deliveryDate}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="total">Total Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={total}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  readOnly
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Req_PurchaseOrder;
