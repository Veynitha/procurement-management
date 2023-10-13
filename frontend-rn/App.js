import "react-native-gesture-handler";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";
import { NavigationContainer } from "@react-navigation/native";


import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <>
      <UserContext>
       <StackNavigator/>
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
