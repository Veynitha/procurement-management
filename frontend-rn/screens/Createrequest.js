

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Createrequest = () => {
  const [requestId, setRequestId] = useState('');
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([{ itemName: '', quantity: '', agreedPrice: '' }]);
  const navigation = useNavigation();
 

  const handleAddItem = () => {
    setItems([...items, { itemName: '', quantity: '', agreedPrice: '' }]);
  };

  const handleItemChange = (text, index, key) => {
    const updatedItems = [...items];
    updatedItems[index][key] = text;
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    const requestData = {
      requestId: requestId,
      name: name,
      supplierName: supplierName,
      deliveryDate: deliveryDate,
      companyName:companyName,
      address: address,
      items: items,
    };

    // Send request data to the backend
    axios
      .post('http://192.168.1.2:3018/api/request', requestData) // Replace with your backend API endpoint
      .then((response) => {
        console.log(response);
        
        Alert.alert('request submitted successfully');
        // Reset form fields after successful submission
        setRequestId('');
        setName('');
        setSupplierName('');
        setcompanyName('');
        setDeliveryDate('');
        setAddress('');
        setItems([{ itemName: '', quantity: '', agreedPrice: '' }]);
        navigation.replace("ALLrequest");
      })
      .catch((error) => {
        console.error('Error submitting request', error);
        Alert.alert('Error', 'Failed to submit request. Please try again later.');
      });
  };

  return (
    
    <View style={styles.container}>
       <View style={styles.separator2} />
     
      <Text style={styles.title}>Create Order Request</Text>
      {/* ... (your input fields and item components) ... */}
            <TextInput
       style={styles.input}
         placeholder="Request ID"
         value={requestId}
         onChangeText={(text) => setRequestId(text)}
       />
       <TextInput
         style={styles.input}
         placeholder="Name"
         value={name}
         onChangeText={(text) => setName(text)}
       />
       <TextInput
         style={styles.input}
         placeholder="company  Name"
         value={companyName}
         onChangeText={(text) => setcompanyName(text)}
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

       {items.map((item, index) => (
         <View key={index} style={styles.itemContainer}>
           <TextInput
             style={styles.itemInput}
             placeholder="Item Name"
             value={item.itemName}
             onChangeText={(text) => handleItemChange(text, index, 'itemName')}
           />
           <TextInput
             style={styles.itemInput}
             placeholder="Quantity"
             value={item.quantity}
             onChangeText={(text) => handleItemChange(text, index, 'quantity')}
           />
           <TextInput
             style={styles.itemInput}
             placeholder="Agreed Price"
             value={item.agreedPrice}
             onChangeText={(text) => handleItemChange(text, index, 'agreedPrice')}
           />
            
          
         </View>
       ))}
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}> + Add Item</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
      <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />
     
      <Button title="Requests" onPress={() => navigation.navigate("ALLrequest")} style={styles.allRequestsButton} />
      </View>
     
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    paddingVertical: 12,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
   
  },
  itemInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    borderRadius: 360, 
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Adjust the shadow color and opacity
  textShadowOffset: { width: 2, height: 2 }, // Shadow offset
  textShadowRadius: 5, // Shadow radiu
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
     paddingVertical: 20, // Increase the height
  paddingHorizontal: 30, // Increase the width
    
  },
 
  

  allRequestsButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 20, // Increase the height
  paddingHorizontal: 30, // Increase the width
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 50,
  },
 
});

export default Createrequest;

