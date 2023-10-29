import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavBar';


import axios from "axios";

const MyForm = () => {
  const { id } = useParams();
  // let history = useHistory();
  const [deliveredBy, setDeliveredBy] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [agreedPrice, setAgreedPrice] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [supplierOrderReference, setSupplierOrderReference] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemindexx, setSelectedItemindexx] = useState({});
  const navigate = useNavigate();





// useEffect(()=>{
//   setItemName(id.itemName)
//   setQuantity(id.items.quantity)
//   setAgreedPrice(id.items.agreedPrice)
//   setDeliveryLocation(id.deliveryAddress)
//   setSupplierOrderReference(id._id)
// },[])

useEffect(() => {
  try {
      axios.get(`http://localhost:3018/api/get-supply-order-by-id/${id}`)
          .then(result => {
            
            setDeliveryLocation(result.data.deliveryAddress)
            setSupplierOrderReference(result.data._id)
            setItems(result.data.items.reverse());
              
          });
  } catch (error) {
      console.log(error);
  }
}, []);
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3018/api/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveredBy,
          item: {
            itemName,
            quantity: parseInt(quantity), // converting to integer
            agreedPrice: parseInt(agreedPrice), // converting to integer
          },
          contactNo,
          deliveryLocation,
          supplierOrderReference,
        }),
      });

      const data = await response.json();
      console.log('Data sent successfully:', data);


      const response2 = await fetch('http://localhost:3018/api/remove-item-from-supply-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:supplierOrderReference,
          itemId: selectedItem._id,
          tot: quantity*agreedPrice,
        }),
      });
      const data2 = await response2.json();
      console.log('item removed successfully:', data2);

      // Reset the form fields after successful submission
      setDeliveredBy('');
      setItemName('');
      setQuantity('');
      setAgreedPrice('');
      setContactNo('');
      setDeliveryLocation('');
      setSupplierOrderReference('');
      navigate(`/supplyOrder/${supplierOrderReference}`);

      // history.push(`/supplyOrder/${supplierOrderReference}`);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleDropdownChange = (event) => {
    const selectedIndex = event.target.options.selectedIndex;

    const selectedItem = items.find((item) => item.itemName === event.target.value);
    if (selectedItem) {
      setSelectedItem(selectedItem);
      setItemName(selectedItem.itemName);
      setQuantity(selectedItem.quantity.toString());
      setAgreedPrice(selectedItem.agreedPrice.toString());
      setSelectedItemindexx(selectedIndex - 1)
      console.log(selectedItemindexx)
    } else {
      setSelectedItem({});
      setItemName('');
      setQuantity('');
      setAgreedPrice('');
    }
  };

  return (
    <div style={styles.container}>
            <Navbar />

      <label style={styles.label}>Delivered By</label>
      <input
        style={styles.input}
        value={deliveredBy}
        onChange={(e) => setDeliveredBy(e.target.value)}
      />
       <label style={styles.label}>Contact Number</label>
      <input
        style={styles.input}
        value={contactNo}
        onChange={(e) => setContactNo(e.target.value)}
        type="tel"
      />
      <label style={styles.label}>Item Name</label>
      <select style={styles.input} onChange={handleDropdownChange}>
  <option value="">Select an item</option>
  {items.map((item, index) => (
    <option key={item._id} value={item.itemName} data-index={index}>
      {item.itemName}
    </option>
  ))}
</select>


      <label style={styles.label}>Quantity</label>
      <input
        style={styles.input}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
      />
      <label style={styles.label}>Agreed Price</label>
      <input
        style={styles.input}
        value={agreedPrice}
        onChange={(e) => setAgreedPrice(e.target.value)}
        type="number"
      />
     
      <label style={styles.label}>Delivery Location</label>
      <input
        style={styles.input}
        value={deliveryLocation}
        onChange={(e) => setDeliveryLocation(e.target.value)}
        disabled
      />
      <label style={styles.label}>Supplier Order Reference</label>
      <input
        style={styles.input}
        value={supplierOrderReference}
        onChange={(e) => setSupplierOrderReference(e.target.value)}
        disabled
      />
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 10px', // Adjusted padding
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    maxWidth: 400, // Added max width
    margin: '0 auto', // Center align
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%', // Adjusted width
    height: 40,
    border: '1px solid #ddd',
    borderRadius: 6,
    marginBottom: 20,
    padding: '0 12px',
    fontSize: 16,
    color: '#555',
  },
  button: {
    width: '100%', // Adjusted width
    padding: '12px 24px',
    backgroundColor: '#4CAF50', // Green color
    color: 'white',
    border: 'none',
    borderRadius: 20, // Rounded border
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s',
  },
};

export default MyForm;
