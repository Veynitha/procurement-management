import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from './NavBar';
import '../utils/componentCss.css'

const ViewInvoiceOrder = () => {
    const { id } = useParams();
    const [InvoiceDate, setInvoiceDate] = useState("");
    const [DueAmount, setDueAmount] = useState("");
    const [OrderReference, setOrderReference] = useState("");
    const [POReference, setPOReference] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:3018/api/get-invoice/${id}`).then((result) => {
                setInvoiceDate(result.data.InvoiceDate);
                setDueAmount(result.data.DueAmount);
                setOrderReference(result.data.OrderReference);
                setPOReference(result.data.POReference);
                setItems([...items, ...result.data.items]);
            });
        } catch (error) {
            console.log('Demo-log')
            // Handle errors
        }
    }, [id, items]);

    return (
        <div className='container'>
            <div className='nav-bar'>
                <Navbar />
            </div>
            <div className='content-body'>
                <h1>Invoice</h1>
                <p><strong>Order Reference:</strong> {OrderReference}</p>
                <p><strong>PO Reference:</strong> {POReference}</p>
                <p><strong>Due Amount:</strong> {DueAmount}</p>
                <p><strong>Invoice Date:</strong> {InvoiceDate}</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td>{item.agreedPrice}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary mt-3">Generate Receipt</button>
            </div>
        </div>
    );
}

export default ViewInvoiceOrder;
