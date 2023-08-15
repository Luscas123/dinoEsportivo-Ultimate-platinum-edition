import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen screenOptions={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen screenOptions={{headerShown:false}} name="Register" component={RegisterScreen} />
      <Stack.Screen screenOptions={{headerShown:false}} name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
