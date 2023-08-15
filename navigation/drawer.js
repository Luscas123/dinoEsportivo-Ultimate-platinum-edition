import React, { Component } from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./tabNavigator";
// import Profile from "../screens/profile";
// import Stack from "./stack";
// import LogOut from "../screens/logOut";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/customSideBarMenu";

const Draw = createDrawerNavigator();

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }
  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light",
        });
      });
  }
  componentDidMount() {
    this.fetchUser();
  }
  render() {
    return (
      <Draw.Navigator
        screenOptions={{
          drawerActiveTintColor: "#FFFFFF",
          drawerInactiveTintColor: this.state.light_theme ? "black" : "white",
          drawerItemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Draw.Screen
          screenOptions={{headerShown:false}}
          name="Stack"
          component={TabNavigator}
          options={{ unmountOnBlur: true }}
        />
        {/* <Draw.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        /> */}
        {/* <Draw.Screen
          name="Logout"
          component={LogOut}
          options={{ unmountOnBlur: true }}
        /> */}
      </Draw.Navigator>
    );
  }
}
