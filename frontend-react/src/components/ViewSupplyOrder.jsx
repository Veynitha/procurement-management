import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const ViewSupplyOrder = () => {

    const { id } = useParams()
    const [orderReference, setOrderReference] = useState("")
    const [purchaseOrderReference, setPurchaseOrderReference] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [requiredDate, setRequiredDate] = useState("")
    const [companyDetails, setCompanyDetails] = useState("")
    const [total, setTotal] = useState("")
    const [orderStatus, setOrderStatus] = useState("")
    const [items, setItems] = useState([])
    const [status, setStatus] = useState("")


    useEffect(() => {
        try {
            axios.get(`http://localhost:3018/api/get-supply-order-by-id/${id}`)
                .then(result => {
                    setOrderReference(result.data.orderReference)
                    setPurchaseOrderReference(result.data.purchaseOrderReference)
                    setCreatedAt(result.data.createdAt)
                    setDeliveryAddress(result.data.deliveryAddress)
                    setRequiredDate(result.data.requiredDate)
                    setCompanyDetails(result.data.companyDetails)
                    setTotal(result.data.total)
                    setOrderStatus(result.data.orderStatus)
                    setItems([...items, ...result.data.items])
                    console.log(items)
                    console.log(result.data.items)
                    console.log(result.data.total)
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <h1>Supply Order</h1>
            <p>{orderReference}</p>
            <p>{purchaseOrderReference}</p>
            <p>{createdAt}</p>
            <p>{deliveryAddress}</p>
            <p>{requiredDate}</p>
            <p>{companyDetails}</p>
            <p>{total}</p>
            <h2>Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        Name: {item.itemName}, Price: {item.agreedPrice}, Quantity: {item.quantity}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ViewSupplyOrder;

