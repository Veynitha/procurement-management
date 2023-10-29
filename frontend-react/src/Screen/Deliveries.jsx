import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import './delivery.css';

const AllDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch('http://localhost:3018/api/alldeliveries');
        const data = await response.json();
        setDeliveries(data.reverse());
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };

    fetchDeliveries();
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredDeliveries =
    selectedStatus === 'all'
      ? deliveries
      : deliveries.filter((delivery) => delivery.deliveryStatus.toLowerCase() === selectedStatus);

  return (
    <div>
      <Navbar />
      <div className="post-container">
        <h2>All Deliveries</h2>
        <div className="filter-container">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="scrollable">
          {filteredDeliveries.map((delivery, index) => (
            <div key={index} className="post">
              <p className="post-item">Delivered By: {delivery.deliveredBy}</p>
              <p className="post-item">Contact No: {delivery.contactNo}</p>
              <p className="post-item">Delivery Location: {delivery.deliveryLocation}</p>
              <p className="post-item">Item Name: {delivery.item.itemName}</p>
              <p className="post-item">Quantity: {delivery.item.quantity}</p>
              <p className="post-item">Agreed Price: {delivery.item.agreedPrice}</p>
              <p className="post-item">Delivery Status: {delivery.deliveryStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDeliveries;
