import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

SplashScreen.preventAutoHideAsync();

let customFonts = {
    // "AllStar": require("./assets/All Start Resort.ttf"),
    // "Square": require("./assets/Square (demo ver).ttf"),
};

export default class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
      isLiked: false,
      likes: this.props.story.value.likes,
    };
  }

  likeAction = () => {
    if (this.state.isLiked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), isLiked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), isLiked: true });
    }
  };
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

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  render() {
    let story = this.state.story_data;
    // let images = {
    //   image_1: require("../assets/story_image_1.png"),
    //   image_2: require("../assets/story_image_2.png"),
    //   image_3: require("../assets/story_image_3.png"),
    //   image_4: require("../assets/story_image_4.png"),
    //   image_5: require("../assets/story_image_5.png"),
    // };
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("StoryScreen", { story: story, story_id: this.state.story_id })
          }
        >
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
           
            <View style={styles.titleContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.storyTitleTextLight
                    : styles.storyTitleText
                }
              >
                {story.title}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.storyAuthorTextLight
                    : styles.storyAuthorText
                }
              >
                {story.description}
              </Text>
              <Text
                style={
                  this.state.light_theme
                    ? styles.descriptionTextLight
                    : styles.descriptionText
                }
              >
                {story.story}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.likeButton}
                onPress={()=>{this.likeAction()}}
              >
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={styles.likeText}>{this.state.likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#068735",
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Square",
    color: "white",
  },
  storyTitleTextLight: {
    fontSize: RFValue(25),
    fontFamily: "Square",
    color: "#2f345d",
  },
  storyAuthorTextLight: {
    fontSize: RFValue(18),
    fontFamily: "Square",
    color: "#2f345d",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Square",
    color: "white",
  },
  descriptionText: {
    fontFamily: "Square",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  descriptionTextLight: {
    fontFamily: "Square",
    fontSize: 13,
    color: "#2f345d",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Square",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
