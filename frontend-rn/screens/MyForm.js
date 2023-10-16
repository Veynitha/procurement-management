import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      const response = await fetch('http://192.168.1.13:8000/api/delivery', {
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
    <View style={styles.container}>
      <Text style={styles.label}>Delivered By</Text>
      <TextInput
        style={styles.input}
        value={deliveredBy}
        onChangeText={setDeliveredBy}
      />
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric" // to display numeric keyboard
      />
      <Text style={styles.label}>Agreed Price</Text>
      <TextInput
        style={styles.input}
        value={agreedPrice}
        onChangeText={setAgreedPrice}
        keyboardType="numeric" // to display numeric keyboard
      />
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contactNo}
        onChangeText={setContactNo}
        keyboardType="phone-pad" // to display phone number keyboard
      />
      <Text style={styles.label}>Delivery Location</Text>
      <TextInput
        style={styles.input}
        value={deliveryLocation}
        onChangeText={setDeliveryLocation}
      />
      <Text style={styles.label}>Supplier Order Reference</Text>
      <TextInput
        style={styles.input}
        value={supplierOrderReference}
        onChangeText={setSupplierOrderReference}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default MyForm;
