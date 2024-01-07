import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../utils/componentCss.css'
import Navbar from '../components/NavBar';

const Invoices = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3018/api/get-invoices")
            .then(response => {
                setRequests(response.data);
                console.log(requests)
                console.log('Hackathon test')
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="content-body">
                <h1>Invoice Page</h1>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>PO Reference</th>
                                <th>Order Reference</th>
                                <th>Due Amount</th>
                                <th>Invoice Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.POReference}</td>
                                    <td>{request.OrderReference}</td>
                                    <td>{request.DueAmount}</td>
                                    <td>{request.InvoiceDate.slice(0, 10)}</td>
                                    <td>
                                        <Link to={`/invoices/${request._id}`} className="btn btn-success">View Invoice</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Invoices;
