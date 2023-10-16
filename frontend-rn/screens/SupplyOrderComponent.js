import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const SupplyOrderComponent = () => {
  const [supplyOrder, setSupplyOrder] = useState(null);
  
const id = "652bc9b2f6e4f7f79589966f"
  useEffect(() => {
    fetchSupplyOrder();
  }, []);

  const fetchSupplyOrder = async () => {
    try {
      const response = await fetch(`http://192.168.1.13:8000/api/get-supply-order-by-id/${id}`);
      const data = await response.json();
      setSupplyOrder(data);
    } catch (error) {
      console.error('Error fetching supply order:', error);
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const items = supplyOrder.items.map((item, index) => ({
    label: item.itemName,
    value: item.itemName,
  }));

  

  return (
    <View style={styles.container}>
      {supplyOrder ? (
        // <View>
        //   <Text style={styles.label}>Supply Order Details</Text>
        //   <Text style={styles.text}>Supply Order ID: {supplyOrder._id}</Text>
        //   {supplyOrder.items.map((item, index) => (
        //     <View key={index}>
        //       <Text style={styles.text}>Item {index + 1}</Text>
        //       <Text style={styles.text}>Item Name: {item.itemName}</Text>
        //       <Text style={styles.text}>Quantity: {item.quantity}</Text>
        //       <Text style={styles.text}>Agreed Price: {item.agreedPrice}</Text>
        //     </View>
        //   ))}
        //   {/* Display other fields as needed */}
        // </View>

<View>
{supplyOrder.items.map((item, index) => (
  <View key={index}>
    <Text>Item Name: {item.itemName}</Text>
  </View>
))}
{/* <DropDownPicker
  items={items}
  defaultValue={null}
  containerStyle={{ height: 40 }}
  style={{ backgroundColor: '#fafafa' }}
  itemStyle={{
    justifyContent: 'flex-start',
  }}
  dropDownStyle={{ backgroundColor: '#fafafa' }}
  onChangeItem={(item) => setSelectedItem(item.value)}
/> */}
</View>

       
    //    
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
 
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SupplyOrderComponent;
