import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const ViewInvoiceOrder = () => {

    const { id } = useParams();

    const [InvoiceDate, setInvoiceDate] = useState("");
    const [DueAmount, setDueAmount] = useState("");
    const [OrderReference, setOrderReference] = useState("");
    const [POReference, setPOReference] = useState("");

    useEffect(() => {
        try {
            axios.get(`http://localhost:3018/api/get-invoice/${id}`).then((result) => {
                setInvoiceDate(result.data.InvoiceDate);
                setDueAmount(result.data.DueAmount);
                setOrderReference(result.data.OrderReference)
                setPOReference(result.data.POReference)
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
            <button>Generate Receipt</button>
        </div>
    )
}

export default ViewInvoiceOrder
