import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Alert,ScrollView} from 'react-native';
import axios from 'axios';


const DeliveryNotesPage = () => {
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [deliveryANStatus, setDeliveryANStatus] = useState('');
  const [suppid, setSuppid] = useState('');
  const [supplyOrder, setSupplyOrder] = useState(null);
  


  useEffect(() => {
    fetchDeliveryNotes();
  }, [deliveryANStatus]);

  const fetchDeliveryNotes = async () => {
    try {
      const response = await fetch('http://192.168.1.13:3018/api/alldeliverynotes');
      const data = await response.json();
      setDeliveryNotes(data);
    } catch (error) {
      console.error('Error fetching delivery notes:', error);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const response = await axios.put(`http://192.168.1.13:3018/api/updateDilivery/${id}`, {
        deliveryANStatus: deliveryANStatus,
        // supplierOR: suppid,
        // dcount: supplyOrder.deliverCount,
      });
      // Handle the response
      Alert.alert('Success', response.data.message);
    } catch (error) {
      // Handle errors
      Alert.alert('Error', 'An error occurred while updating the status.');
    }
  };

  
  const fetchSupplyOrder = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.13:3018/api/get-supply-order-by-id/${id}`);
      const data = await response.json();
      setSupplyOrder(data);
    } catch (error) {
      console.error('Error fetching supply order:', error);
    }
  };

  const incrementDeliveryCount = async () => {
    try {
      const response = await axios.put(`http://192.168.1.13:3018/api/increment-delivery-count`, {
        id: suppid, 
        deliverCount: supplyOrder.deliverCount, 
        itemCount: supplyOrder.itemCount
        
        
      });
      // Handle the response
      //Alert.alert('Success', response.data.message);
    } catch (error) {
      // Handle errors
      Alert.alert('Error', 'An error occurred while updating the status.');
    }
  };

  const handleAccept = (idd, supid) =>{
    setDeliveryANStatus("accept")
    setSuppid(supid)
    fetchSupplyOrder(supid)
    handleUpdateStatus(idd)
    incrementDeliveryCount()
    fetchDeliveryNotes()
  }

  const handleReject = (idd) =>{
    setDeliveryANStatus("reject")
    handleUpdateStatus(idd)
    fetchDeliveryNotes()
  }

  const renderDeliveryNoteItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Supplier Order Reference: {item.supplierOrderReference}</Text>
      <Text style={styles.text}>Delivery ID: {item.deliveryid}</Text>
      <Text style={styles.text}>Total: {item.total}</Text>
      {/* <Text style={styles.text}>Delivery Note Status: {item.deliveryAdviceNoteStatus}</Text> */}
      {/* Rendering item details */}
      <Text style={styles.text}>Item Name: {item.item.itemName}</Text>
      <Text style={styles.text}>Quantity: {item.item.quantity}</Text>
      <Text style={styles.text}>Agreed Price: {item.item.agreedPrice}</Text>
      {item.deliveryAdviceNoteStatus == "accept" ? (
        <Text style={styles.textacc}>Accepted</Text>
      ) : item.deliveryAdviceNoteStatus == "reject" ? (
        <Text style={styles.textrej}>Rejected</Text>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {handleAccept(item._id,item.supplierOrderReference)}}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => {handleReject(item._id)}}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Delivery Notes</Text>
        <FlatList
          data={deliveryNotes}
          renderItem={renderDeliveryNoteItem}
          keyExtractor={(item) => item._id} // Make sure to use a unique key here
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 110
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 2,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  textacc:{
    backgroundColor: 'green',
   
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  textrej:{
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
    
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DeliveryNotesPage;
