import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/Home";
import ALLrequest from "./screens/ALLrequest";


const Stack = createNativeStackNavigator();

function StackNavigator2() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ALLrequest"
        component={ALLrequest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const StackNavigator = () => {
  return (
   
    <NavigationContainer>
    <StackNavigator2 />
  </NavigationContainer>

   
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
