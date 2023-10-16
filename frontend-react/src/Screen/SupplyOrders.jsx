import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SupplyOrders = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3018/api/get-supply-orders")
            .then(response => {
                setRequests(response.data);
                console.log(requests)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-80 bg-white rounded p-3">
                <h1>Supply Orders Page</h1>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>purchaseOrderReference</th>
                                <th>orderReference</th>
                                <th>createdAt</th>
                                <th>deliveryAddress</th>
                                <th>requiredBy</th>
                                <th>companyDetails</th>
                                <th>total</th>
                                <th>orderStatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.purchaseOrderReference}</td>
                                    <td>{request.orderReference}</td>
                                    <td>{request.createdAt}</td>
                                    <td>{request.deliveryAddress}</td>
                                    <td>{request.requiredDate}</td>
                                    <td>{request.companyDetails}</td>
                                    <td>{request.total}</td>
                                    <td>{request.orderStatus}</td>
                                    <td><Link to={`/supplyOrder/${request._id}`} className="btn btn-success">View Order</Link></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SupplyOrders;