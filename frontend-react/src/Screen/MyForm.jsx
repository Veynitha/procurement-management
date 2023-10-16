import React, { useState } from 'react';

const MyForm = () => {
  const [deliveredBy, setDeliveredBy] = useState('jone');
  const [itemName, setItemName] = useState('Sggs');
  const [quantity, setQuantity] = useState('450');
  const [agreedPrice, setAgreedPrice] = useState('10000');
  const [contactNo, setContactNo] = useState('0714537652');
  const [deliveryLocation, setDeliveryLocation] = useState('malabe');
  const [supplierOrderReference, setSupplierOrderReference] = useState('652cb9b02c19e57e583c35b3');

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

      // Reset the form fields after successful submission
      setDeliveredBy('');
      setItemName('');
      setQuantity('');
      setAgreedPrice('');
      setContactNo('');
      setDeliveryLocation('');
      setSupplierOrderReference('');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Delivered By</label>
      <input
        style={styles.input}
        value={deliveredBy}
        onChange={(e) => setDeliveredBy(e.target.value)}
      />
      <label style={styles.label}>Item Name</label>
      <input
        style={styles.input}
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
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
      <label style={styles.label}>Contact Number</label>
      <input
        style={styles.input}
        value={contactNo}
        onChange={(e) => setContactNo(e.target.value)}
        type="tel"
      />
      <label style={styles.label}>Delivery Location</label>
      <input
        style={styles.input}
        value={deliveryLocation}
        onChange={(e) => setDeliveryLocation(e.target.value)}
      />
      <label style={styles.label}>Supplier Order Reference</label>
      <input
        style={styles.input}
        value={supplierOrderReference}
        onChange={(e) => setSupplierOrderReference(e.target.value)}
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
