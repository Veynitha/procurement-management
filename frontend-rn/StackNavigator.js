import { StyleSheet,Image, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { useTheme } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ALLrequest from "./screens/ALLrequest";
import DeliveryNotesPage from "./screens/DeliveryNotesPage";
import Createrequest from "./screens/Createrequest";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function StackNavigatorMain() {
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
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "#1DAB87";
  return (
    <Tab.Navigator
      activeColor="#1DAB87"
      inactiveColor="#ffffff"
      activeBackgroundColor="#ffffff"
      barStyle={{
        backgroundColor: "#1D3A70",

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        overflow: "hidden",
        left: 0,
        bottom: 0,
        right: 0,
        paddingTop: 5,
      }}
    >
      <Tab.Screen
        name="Order requests"
        component={StackNavigator1}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/req.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Deliveries"
        component={StackNavigator2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/delivery.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

function StackNavigator1() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Delevery_page"
        component={Createrequest}
        options={{ title: "Create request" }}
      />
      <Stack.Screen
        name="ALLrequest"
        component={ALLrequest}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function StackNavigator2() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Delevery_page"
        component={DeliveryNotesPage}
        options={{ title: "Deliveries" }}
      />
    </Stack.Navigator>
  );
}

const StackNavigator = () => {
  return (
   
    <NavigationContainer>
    <StackNavigatorMain />
  </NavigationContainer>

   
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
