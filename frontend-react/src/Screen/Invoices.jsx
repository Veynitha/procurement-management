import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import '../utils/componentCss.css'
import Navbar from '../components/NavBar';

const Invoices = () => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:3018/api/get-invoices")
            .then(response => {
                setRequests(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Filter function to search invoices by PO Reference or Order Reference
    const filteredInvoices = requests.filter(request => {
        const searchString = searchQuery.toLowerCase();
        return (
            request.POReference.toLowerCase().includes(searchString) ||
            request.OrderReference.toLowerCase().includes(searchString)
        );
    });

    return (
        <div className="container">
            <div className="nav-bar">
                <Navbar />
            </div>
            <div className="content-body">
                <h1>Invoice Page</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by PO Reference or Order Reference"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
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
                            {filteredInvoices.map(request => (
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
