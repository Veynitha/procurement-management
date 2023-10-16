import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const UpdateRequest = ({ route, navigation }) => {
  const { requestId } = route.params;
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch request details based on requestId
    axios.get(`http://192.168.1.13:3018/api/request/${requestId}`)
      .then((response) => {
        const { name, supplierName, deliveryDate, address } = response.data;
        // Set state variables with fetched data
        setName(name);
        setSupplierName(supplierName);
        setDeliveryDate(deliveryDate);
        setAddress(address);
      })
      .catch((error) => {
        console.error('Error fetching request details', error);
        Alert.alert('Error', 'Failed to fetch request details. Please try again later.');
      });
  }, [requestId]); // Fetch data whenever requestId changes

  const handleUpdate = (_id) => {
    const requestData = {
      name: name,
      supplierName: supplierName,
      deliveryDate: deliveryDate,
      address: address,
    };

    axios
      .put(`http://192.168.1.13:3018/api/request/${_id}`, requestData)
      .then((response) => {
        console.log(response);
        Alert.alert('Request updated successfully');
        // Navigate back to the previous screen after successful update
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error updating request', error);
        Alert.alert('Error', 'Failed to update request. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      {/* ... (your input fields) ... */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Supplier Name"
        value={supplierName}
        onChangeText={(text) => setSupplierName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Date"
        value={deliveryDate}
        onChangeText={(text) => setDeliveryDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UpdateRequest;
