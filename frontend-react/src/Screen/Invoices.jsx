import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Invoices = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3018/api/get-invoices")
            .then(response => {
                setRequests(response.data);
                console.log(requests)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="invoice-page">
            <h1>Invoice Page</h1>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>POReference</th>
                            <th>OrderReference</th>
                            <th>DueAmount</th>
                            <th>InvoiceDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.POReference}</td>
                                <td>{request.OrderReference}</td>
                                <td>{request.DueAmount}</td>
                                <td>{request.InvoiceDate}</td>
                                <td><Link to={`/invoices/${request._id}`} className="btn btn-success">View Invoice</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invoices;