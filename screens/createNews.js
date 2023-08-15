import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  // "AllStar": require("../assets/All Start Resort.ttf"),
  // "Square": require("../assets/Square (demo ver).ttf"),
};

export default class CreateNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      // previewImage: "image_1",
      dropdownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  // function
  async addStory() {
    console.log("codigo passou por aqui");
    if (this.state.title && this.state.description && this.state.story) {
      let storyData = {
        // preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        story: this.state.story,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0,
      };
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(storyData)
        .then(function (snapshot) {});
      //this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      Alert.alert(
        "Error",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();

      // let preview_images = {
      //   image_1: require("../assets/story_image_1.png"),
      //   image_2: require("../assets/story_image_2.png"),
      //   image_3: require("../assets/story_image_3.png"),
      //   image_4: require("../assets/story_image_4.png"),
      //   image_5: require("../assets/story_image_5.png"),
      // };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/DinoBrazucaa (1).png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Nova Notícia</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              {/* <Image
                  source={preview_images[this.state.previewImage]}
                  style={styles.previewImage}
                ></Image> */}

              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                {/* <DropDownPicker
                  items={[
                    { label: "Imagem 1", value: "image_1" },
                    { label: "Imagem 2", value: "image_2" },
                    { label: "Imagem 3", value: "image_3" },
                    { label: "Imagem 4", value: "image_4" },
                    { label: "Imagem 5", value: "image_5" },
                  ]}
                  // defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: RFValue(20),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{
                    backgroundColor: "#2f345d",
                  }}
                  labelStyle={styles.dropdownLabel}
                  arrowStyle={styles.dropdownLabel}
                  // // onChangeItem={(item) =>
                  // //   this.setState({
                  // //     previewImage: item.value,
                  // //   })
                  // }
                /> */}
              </View>
              <View style={{ marginHorizontal: RFValue(10) }}>
                <TextInput
                  style={styles.inputFont}
                  onChangeText={(title) => this.setState({ title })}
                  placeholder={"Título"}
                  placeholderTextColor={"white"}
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(description) => this.setState({ description })}
                  placeholder={"Descrição"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={"white"}
                />
                <TextInput
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(story) => this.setState({ story })}
                  placeholder={"Notícia"}
                  multiline={true}
                  numberOfLines={20}
                  placeholderTextColor={"white"}
                />
              </View>
              <View style={styles.submitButton}>
                <Button
                  title="Submit"
                  color="#35ceeb"
                  onPress={() => {
                    this.addStory();
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00B341",
  },

  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.2,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
    textAlign: "center",
  },

  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },

  dropdownLabel: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },

  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center",
  },
});
