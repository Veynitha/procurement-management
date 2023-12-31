import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import '../utils/componentCss.css'
import Navbar from '../components/NavBar';

const SupplyOrders = () => {
    const [requests, setRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState(''); // Initialize filterStatus

    useEffect(() => {
        axios
            .get("http://localhost:3018/api/get-supply-orders")
            .then(response => {
                setRequests(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Filter function to get filtered supply orders
    const filteredOrders = requests.filter(request => {
        return filterStatus === '' || request.orderStatus === filterStatus;
    });

    return (
        <div className="container">
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className="w-80 bg-white rounded p-3">
                    <div className='headers'>
                        <h2>Supply Orders</h2>
                        <div>
                            <label>Filter by Status: </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Purchase Order</th>
                                    <th>Created At</th>
                                    <th>Delivery Address</th>
                                    <th>Required By</th>
                                    <th>Company Details</th>
                                    <th>Total</th>
                                    <th>Order Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.purchaseOrderReference}</td>
                                        <td>{request.createdAt.slice(0, 10)}</td>
                                        <td>{request.deliveryAddress}</td>
                                        <td>{request.requiredDate.slice(0, 10)}</td>
                                        <td>{request.companyDetails}</td>
                                        <td>{request.total}</td>
                                        <td>{request.orderStatus}</td>
                                        <td>
                                            <Link to={`/supplyOrder/${request._id}`} className="btn btn-success">View Order</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupplyOrders;
