import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from './NavBar';
import '../utils/componentCss.css'

const ViewPurchaseOrder = () => {
    const { id } = useParams();
    const [purchaseOrder, setPurchaseOrder] = useState({});
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(`http://localhost:3018/api/get-purchase-order/${id}`)
                .then(result => {
                    setPurchaseOrder(result.data);
                    setItems(result.data.items);
                    console.log(items)
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleAccept = async (e) => {
        try {
            const request = {
                purchaseOrderReference: purchaseOrder._id,
                createdAt: new Date(),
                deliveryAddress: purchaseOrder.deliveryAddress,
                requiredDate: purchaseOrder.deliveryDate,
                companyDetails: purchaseOrder.companyName,
                total: purchaseOrder.total,
                items: purchaseOrder.items
            }
            e.preventDefault();
            const response = await axios.put(`http://localhost:3018/api/accept-purchase-order/${id}`)
                .then((result) => {
                    if (result) {
                        axios.post(`http://localhost:3018/api/create-supply-orders`, request);
                        alert("Supply Order Placed Successfully")
                        navigate('/supplyOrders');
                    }
                    else {
                        console.log("Error placing Supply Order")
                    }
                })

        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3018/api/reject-purchase-order/${id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='container'>
            <div className='nav-bar'>
                <Navbar />
            </div>
            <div className='content-body'>
                <h1>Supply Order</h1>
                <p><strong>Request Reference</strong>{purchaseOrder.requestReference}</p>
                <p><strong>Created by</strong> {purchaseOrder.createdBy}</p>
                <p><strong>Approved by</strong> {purchaseOrder.approvedBy}</p>
                <p><strong>Supplier Name</strong> {purchaseOrder.supplierName}</p>
                <p><strong>Company Name</strong> {purchaseOrder.companyName}</p>
                <p><strong>Delivery Date</strong> {purchaseOrder.deliveryDate}</p>
                <p><strong>Delivery Address</strong> {purchaseOrder.deliveryAddress}</p>
                <p><strong>Total</strong> {purchaseOrder.total}</p>
                <p><strong>Order Status</strong> {purchaseOrder.status}</p>

                <h2>Items</h2>
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
                <div className="button-container">
                    <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                    <div style={{ margin: '20px' }}></div>
                    <button className="btn btn-danger" onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    );
}

export default ViewPurchaseOrder;
