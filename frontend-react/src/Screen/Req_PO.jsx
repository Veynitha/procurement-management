import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/NavBar';
import '../utils/componentCss.css'

const Req_PurchenOrder = () => {
  const { id } = useParams();
  const [requestId, setRequestId] = useState();
  const [name, setName] = useState();
  const [approvedBy, setApprovedBy] = useState();
  const [supplierName, setSupplier] = useState();
  const [companyName, setCompany] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [address, setAddress] = useState();
  const [itemName, setItemName] = useState();
  const [quantity, setQuantity] = useState();
  const [agreedPrice, setAgreedPrice] = useState();
  const [total, setTotal] = useState();
  const [status, setStatus] = useState();

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3018/api/get-request/" + id)
      .then((result) => {
        console.log("data", result);
        setRequestId(result.data.requestId);
        setName(result.data.name);
        setApprovedBy(result.data.approvedBy);
        setSupplier(result.data.supplierName);
        setCompany(result.data.companyName);
        setDeliveryDate(result.data.deliveryDate);
        setAddress(result.data.address);
        setTotal(result.data.total);
        setStatus(result.data.status);

        const itemData = result.data.items;
        if (Array.isArray(itemData) && itemData.length > 0) {
          const firstItem = itemData[0];
          setItemName(firstItem.itemName);
          setQuantity(firstItem.quantity);
          setAgreedPrice(firstItem.agreedPrice);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const Submit = (e) => {
    e.preventDefault();

    const items = [
      {
        itemName: itemName,
        quantity: quantity,
        agreedPrice: agreedPrice,
      },
    ];

    axios
      .post(
        "http://localhost:3018/api/create-purchase-orders",
        JSON.stringify({
          requestReference: id,
          createdBy: name,
          approvedBy: approvedBy,
          supplierName: supplierName,
          companyName: companyName,
          deliveryDate: deliveryDate,
          deliveryAddress: address,
          total: total,
          items: items,
          status: status,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((result) => {
        console.log("PO", result);
        nav("/");
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
          <div className="w-50 bg-white rounded p-3" >
            <h1>Crete Purchase Order</h1>
            <form onSubmit={Submit}>
              <div className="form-group">
                <label htmlFor="requestId">Request ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={requestId}
                  readOnly
                  onChange={(e) => setRequestId(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Manager Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  readOnly
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="approvedBy">Approved by</label>
                <input
                  type="text"

                  className="form-control"
                  placeholder="Enter Approved Manager's Name"
                  onChange={(e) => setApprovedBy(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address"> Supplier Name</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={supplierName}
                  onChange={(e) => setRequestId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company name</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={companyName}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Deliver Address</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="total">Total Amount</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>

              <Link to={"/po"} className="btn btn-success">
                {" "}
                Submit
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Req_PurchenOrder;
