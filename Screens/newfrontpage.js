import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [color, setColor] = useState({ primary: "#640D14" });

  useEffect(() => {
    async function getColors() {
      await AsyncStorage.setItem(
        "colors",
        JSON.stringify({ primary: "#640D14" })
      );
      const storedColors = await AsyncStorage.getItem("colors");
      if (storedColors) setColor(JSON.parse(storedColors));
    }
    getColors();
  }, []);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts load
  }

  SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView vertical style={{ ...styles.mainContainer, backgroundColor: color.primary }}>
        <View style={styles.topView}>
          <View style={styles.circleOnTop}></View>
          <Text style={{ ...styles.greet, color: color.primary}}>
            Welcome to TrackIT!
          </Text>
          <Text style={{...styles.hero, color: color.primary}}>Your guide to every room</Text>
        </View>

        <TouchableOpacity style={styles.searchContainer}>
          <Text style={styles.searchText}>Search room # or building name</Text>
          <Icon name="search" size={20} color="black"></Icon>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <View style={styles.textContainer2}>
            <Text style={styles.tag}>World's first campus navigation app!</Text>
          </View>
          <Image
            source={require("../assets/newww.png")}
            style={styles.displayImage}
            resizeMode="contain"
          />

          <LinearGradient
              colors={["transparent", color.primary]} 
              style={styles.gradientOverlay}
          />
        </View>

        <View style={styles.overviewContainer}>
          <Text style={styles.overview}>Overview</Text>
          <Icon name="question-circle" size={30} color={'white'}/>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.appDescription}>TrackIT makes campus navigation effortless for students,
              faculty, and visitors by providing clear pathways and real-time guidance to classrooms,
              offices, and key facilities.
          </Text>
          <Text style={styles.appDescription}>
            Say goodbye to getting lost and hello to effortless exploration. This is TrackIT, your guide
            to every room!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    overflow: "hidden",
    gap: 20
  },
  topView: {
    height: 110,
    justifyContent: "flex-end",
    paddingLeft: 20,
    marginBottom: 20
  },
  circleOnTop: {
    position: "absolute",
    top: -150,
    left:-150,
    borderTopWidth: 100,
    borderLeftWidth: 100,
    borderRightWidth: 380,
    borderBottomWidth: 210,
    borderTopRightRadius: 2500,
    borderBottomRightRadius: 3000,
    borderBottomLeftRadius: 5000,
    borderColor: "white"
  },
  greet: {
    fontSize: 25,
    fontWeight: "900"
  },
  hero: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 70,
    marginBottom: 20
  },
  searchText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
  },
  imageContainer: {
    marginBottom: 20,
  },
  displayImage: {
    height: 500,
    width: 500,
    opacity: 0.8
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  tag: {
    fontSize: 33,
    // fontFamily: "Poppins-SemiBold",
    color: "#DFCCAF",
    fontWeight: "900"
  },
  
  textContainer2: {
    position: "absolute",
    zIndex: 1,
    paddingLeft: 20,
    width: 200,
  },
  overview: {
    fontSize: 25,
    color: "white",
    fontWeight: "900"
  },
  textContainer: {
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    gap: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  appDescription: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "white"
  },
  overviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20
  }
});
