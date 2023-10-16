import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Navbar from './NavBar';
import '../utils/componentCss.css'

const ViewSupplyOrder = () => {
    const { id } = useParams();
    const [orderReference, setOrderReference] = useState("");
    const [purchaseOrderReference, setPurchaseOrderReference] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [requiredDate, setRequiredDate] = useState("");
    const [companyDetails, setCompanyDetails] = useState("");
    const [total, setTotal] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        try {
            axios.get(`http://localhost:3018/api/get-supply-order-by-id/${id}`)
                .then(result => {
                    setOrderReference(result.data.orderReference);
                    setPurchaseOrderReference(result.data.purchaseOrderReference);
                    setCreatedAt(result.data.createdAt);
                    setDeliveryAddress(result.data.deliveryAddress);
                    setRequiredDate(result.data.requiredDate);
                    setCompanyDetails(result.data.companyDetails);
                    setTotal(result.data.total);
                    setOrderStatus(result.data.orderStatus);
                    setItems(result.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className='container'>
            <div className='nav-bar'>
                <Navbar />
            </div>
            <div className='content-body'>
                <h1>Supply Order</h1>
                <p><strong>Order Reference:</strong> {orderReference}</p>
                <p><strong>Purchase Order Reference:</strong> {purchaseOrderReference}</p>
                <p><strong>Created At:</strong> {createdAt}</p>
                <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
                <p><strong>Required Date:</strong> {requiredDate}</p>
                <p><strong>Company Details:</strong> {companyDetails}</p>
                <p><strong>Total:</strong> {total}</p>
                <p><strong>Order Status:</strong> {orderStatus}</p>

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
            </div>
        </div>
    );
}

export default ViewSupplyOrder;
