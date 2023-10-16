import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

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
                setOrderReference(result.data.OrderReference)
                setPOReference(result.data.POReference)
                setItems([...items, ...result.data.items])
            })
        } catch (error) {

        }
    })

    return (
        <div>
            <h1>Invoice</h1>
            <p>{OrderReference}</p>
            <p>{POReference}</p>
            <p>{DueAmount}</p>
            <p>{InvoiceDate}</p>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        Name: {item.itemName}, Price: {item.agreedPrice}, Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <button>Generate Receipt</button>
        </div>
    )
}

export default ViewInvoiceOrder
