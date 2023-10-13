// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// const Home = () => {
//   const [requestId, setRequestId] = useState('');
//   const [name, setName] = useState('');
//   const [supplierName, setSupplierName] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const [address, setAddress] = useState('');
//   const [items, setItems] = useState([{ itemName: '', quantity: '', agreedPrice: '' }]);

//   const handleAddItem = () => {
//     setItems([...items, { itemName: '', quantity: '', agreedPrice: '' }]);
//   };

//   const handleItemChange = (text, index, key) => {
//     const updatedItems = [...items];
//     updatedItems[index][key] = text;
//     setItems(updatedItems);
//   };

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     console.log('Request submitted:', {
//       requestId,
//       name,
//       supplierName,
//       deliveryDate,
//       address,
//       items,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Request ID"
//         value={requestId}
//         onChangeText={(text) => setRequestId(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Supplier Name"
//         value={supplierName}
//         onChangeText={(text) => setSupplierName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Delivery Date"
//         value={deliveryDate}
//         onChangeText={(text) => setDeliveryDate(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={(text) => setAddress(text)}
//       />

//       {items.map((item, index) => (
//         <View key={index} style={styles.itemContainer}>
//           <TextInput
//             style={styles.itemInput}
//             placeholder="Item Name"
//             value={item.itemName}
//             onChangeText={(text) => handleItemChange(text, index, 'itemName')}
//           />
//           <TextInput
//             style={styles.itemInput}
//             placeholder="Quantity"
//             value={item.quantity}
//             onChangeText={(text) => handleItemChange(text, index, 'quantity')}
//           />
//           <TextInput
//             style={styles.itemInput}
//             placeholder="Agreed Price"
//             value={item.agreedPrice}
//             onChangeText={(text) => handleItemChange(text, index, 'agreedPrice')}
//           />
//         </View>
//       ))}

//       <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
//         <Text style={styles.addButtonText}>+ Add Item</Text>
//       </TouchableOpacity>

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   itemInput: {
//     flex: 1,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginRight: 10,
//     paddingHorizontal: 10,
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default Home;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [requestId, setRequestId] = useState('');
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
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
      address: address,
      items: items,
    };

    // Send request data to the backend
    axios
      .post('http://192.168.1.2:8000/api/request', requestData) // Replace with your backend API endpoint
      .then((response) => {
        console.log(response);
        Alert.alert('request submitted successfully');
        // Reset form fields after successful submission
        setRequestId('');
        setName('');
        setSupplierName('');
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

      <Button title="Submit" onPress={handleSubmit} />
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
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;

