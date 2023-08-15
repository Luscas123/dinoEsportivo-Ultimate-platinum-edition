import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/feed";
import CreateNews from "../screens/createNews";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";


const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Create News") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        barStyle={styles.bottomTabStyle}
        labeled = {false}
      >
        <Tab.Screen screenOptions={{headerShown:false}} name="Feed" component={Feed} options={{headerShown: false}} />
        <Tab.Screen screenOptions={{headerShown:false}} name="Create News" component={CreateNews} options={{headerShown: false}} />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#068735",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: { width: RFValue(30), height: RFValue(30) },
});
