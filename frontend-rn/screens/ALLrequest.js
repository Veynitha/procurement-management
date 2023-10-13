import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ALLrequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests data from the backend API
    axios.get('http://192.168.1.2:8000/api/request') // Replace with your backend API endpoint
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requests', error);
      });
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text>Request ID: {item.requestId}</Text>
      <Text>Name: {item.name}</Text>
      <Text>Supplier Name: {item.supplierName}</Text>
      <Text>Delivery Date: {item.deliveryDate}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Items:</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item) => item.itemName}
        renderItem={({ item: listItem }) => (
          <View style={styles.item}>
            <Text>Item Name: {listItem.itemName}</Text>
            <Text>Quantity: {listItem.quantity}</Text>
            <Text>Agreed Price: {listItem.agreedPrice}</Text>
          </View>
        )}
      />
      <Text>Total: {item.total}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.requestId.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  requestItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  item: {
    marginLeft: 16,
    marginTop: 8,
  },
});

export default ALLrequest;

