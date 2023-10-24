import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../utils/componentCss.css'
import Navbar from '../components/NavBar';

const Update_Rq = () => {

  const { id } = useParams();
  const [requests, setRequests] = useState({});
  const [requestId, setRqID] = useState();
  const [name, setName] = useState();
  const [supplierName, setSupplier] = useState();
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
        setRequests(result.data);
        setRqID(result.data.requestId);
        setName(result.data.name);
        setSupplier(result.data.supplierName);
        setDeliveryDate(result.data.deliveryDate);
        setAddress(result.data.address);
        setItemName(result.data.itemName);
        setQuantity(result.data.quantity);
        setAgreedPrice(result.data.agreedPrice);
        setTotal(result.data.total);
        setStatus(result.data.status);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3018/api/updateRequest/" + id, {
        newStatus: status,
      })
      .then((result) => { 
        if(status==='approved'){
          nav(`/rq2po/${id}`);

        } else{
          nav(`/requests`)
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="content-body">
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Update}>
              <h1>Approve Requisition</h1>

              <div className="form-group">
                <label htmlFor="requestId">Request ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={requestId}
                  readOnly
                />
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Agreed Price</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.items &&
                    requests.items.map((item) => (
                      <tr key={`${item._id}`}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.agreedPrice}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className="mb-2">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="approved">Approve</option>
                  <option value="reject">Reject</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <button className="btn btn-success">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Rq;
