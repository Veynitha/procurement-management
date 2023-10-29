import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Modal, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const ALLrequest = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [updateData, setUpdateData] = useState({
    name: '',
    supplierName: '',
    companyName:'',
    deliveryDate: '',
    address: '',
    items: [],
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...updateData.items];
    updatedItems[index][key] = value;
    setUpdateData({ ...updateData, items: updatedItems });
  };

  const handleAddItem = () => {
    const newItem = { itemName: '', quantity: 0, agreedPrice: 0 };
    setUpdateData({ ...updateData, items: [...updateData.items, newItem] });
  };

  useEffect(() => {
    // Fetch requests data from the backend API
    axios.get('http://192.168.1.5:3018/api/request')
      .then((response) => {
        setRequests(response.data);
        setFilteredRequests(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching requests', error);
      });
  }, []); 

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter requests based on search query
    const filtered = requests.filter(request =>
      request.requestId.toString().includes(query)
    );
    setFilteredRequests(filtered);
  };
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredRequests(requests); // Reset filteredRequests to show all requests
  };

  const handleDelete = (_id) => {
    axios.delete(`http://192.168.1.5:3018/api/request/${_id}`)
      .then((response) => {
        setRequests(requests.filter(request => request.requestId !== _id));
        Alert.alert('Request deleted successfully');
        navigation.replace("ALLrequest");
      })
      .catch((error) => {
        console.error('Error deleting request', error);
        Alert.alert('Error', 'Failed to delete request. Please try again later.');
      });
  };

  const handleUpdate = (_id) => {
    axios.put(`http://192.168.1.5:3018/api/request/${_id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      Alert.alert('Request updated successfully');
      setModalVisible(false);
      navigation.replace("ALLrequest");
    })
    .catch((error) => {
      console.error('Error updating request', error);
      Alert.alert('Error', 'Failed to update request. Please try again later.');
    });
  };

  const renderItemsFields = () => {
    return updateData.items.map((item, index) => (
      
      <View key={index}>
      <Text style={styles.label}>Item Name {index + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter Item Name ${index + 1}`}
        value={item.itemName}
        onChangeText={(text) => handleItemChange(index, 'itemName', text)}
      />

      <Text style={styles.label}>Quantity {index + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter Quantity ${index + 1}`}
        value={item.quantity.toString()}
        onChangeText={(text) => handleItemChange(index, 'quantity', parseInt(text))}
        keyboardType="numeric" // Set the keyboard type to numeric for quantity input
      />

      <Text style={styles.label}>Agreed Price {index + 1}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter Agreed Price ${index + 1}`}
        value={item.agreedPrice.toString()}
        onChangeText={(text) => handleItemChange(index, 'agreedPrice', parseFloat(text))}
        keyboardType="numeric" // Set the keyboard type to numeric for agreed price input
      />
    </View>
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
       <View style={styles.separator2} />
      <Text style={styles.label}>Request ID:{item.requestId} </Text>
      <Text style={styles.label}>Name: {item.name}</Text>
      <Text style={styles.label}>Company Name: {item.companyName}</Text>
      <Text style={styles.label}>approved By: {item.approvedBy}</Text>
      <Text style={styles.label}>Supplier Name: {item.supplierName}</Text>
      <Text style={styles.label}>Delivery Date: {item.deliveryDate}</Text>
      <Text style={styles.label}>Address: {item.address}</Text>
      <View style={styles.separator2} />
      <Text style={styles.label}>Items:</Text>
      <View style={styles.separator2} />
      <FlatList
        data={item.items}
        keyExtractor={(item) => item.itemName}
        renderItem={({ item: listItem }) => (
          <View style={styles.item}>
            
            <Text style={styles.label}>Item Name: {listItem.itemName}</Text>
            <Text style={styles.label}>Quantity: {listItem.quantity}</Text>
            <Text style={styles.label}>Agreed Price: {listItem.agreedPrice}</Text>
            <View style={styles.separator1} />
          </View>
        )}
      />
       <View style={styles.separator2} />
      <Text style={styles.label}>Total: {item.total}</Text>
      <Text style={{ ...styles.label, color: item.status === 'approved' ? 'green' : 'red' }}>
          Status: {item.status}
      </Text>

      <Button title="Delete" onPress={() => handleDelete(item._id)}  color="#ff8080" />
      <Button title="Update" onPress={() => { setUpdateData(item); setModalVisible(true); }} />
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {/* <Button title="back" onPress={() => navigation.navigate("Delevery_page")} style={styles.allRequestsButton} /> */}
      <Text style={styles.pageTitle}> Order Requests</Text>

      <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search by Request ID"
        value={searchQuery}
        onChangeText={handleSearch}
        width="80%"
      />
      <Button title="Clear" onPress={clearSearch} color="red" height="100%" />
      
      </View>
      <FlatList
       data={filteredRequests} // Render the filtered requests instead of all requests
       keyExtractor={(item) => item.requestId.toString()}
       renderItem={renderItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.pageTitle}>Update Page</Text>
          <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updateData.name}
              onChangeText={(text) => setUpdateData({ ...updateData, name: text })}
            />
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updateData.companyName}
              onChangeText={(text) => setUpdateData({ ...updateData, companyName: text })}
            />
            <Text style={styles.label}>supplier Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Supplier Name"
              value={updateData.supplierName}
              onChangeText={(text) => setUpdateData({ ...updateData, supplierName: text })}
            />
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Delivery Date"
              value={updateData.deliveryDate}
              onChangeText={(text) => setUpdateData({ ...updateData, deliveryDate: text })}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={updateData.address}
              onChangeText={(text) => setUpdateData({ ...updateData, address: text })}
            />
            {renderItemsFields()}
            {/* <Button title="Add Item" onPress={handleAddItem} /> */}
            <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={() => handleUpdate(updateData._id)} style={styles.submitButton} />
            <Button title="Cancel" onPress={() => setModalVisible(false)}  style={styles.cancelButton} color="red"/>
            </View>
          </View>
        </View>
        </ScrollView>
      </Modal>
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
  allRequestsButton: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 20, // Increase the height
  paddingHorizontal: 30, // Increase the width
  backgroundColor:'	#008000',
    
  },
  item: {
    marginLeft: 16,
    marginTop: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    padding: 35, // Increase the padding to make the content area larger
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: 'black', // You can change the color here
    marginVertical: 10,
  },
  separator1: {
    width:'80%',
    borderBottomWidth: 2,
    borderBottomColor: 'white', // You can change the color here
    marginVertical: 10,
  },
  separator2: {
    borderBottomWidth: 2,
    borderBottomColor: 'white', // You can change the color here
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Text shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 50,
  },
  submitButton: {
    marginRight: 10, // Add margin between the buttons
  },
  cancelButton: {
    marginLeft: 10, // Add margin between the buttons
    color:"#ff8080",
  },
});

export default ALLrequest;