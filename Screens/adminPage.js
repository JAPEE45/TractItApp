import { Text, ImageBackground, StyleSheet, View, TouchableOpacity, Image, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -250 : 0, // Slide in or out
      duration: 200,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/oclogo.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        <View style={styles.nav}>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="menu" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>ADMIN</Text>
        </View>
        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
          <View style={{ gap: 50 }}>
            <TouchableOpacity>
              <Icon style={styles.nav_icon} name="person" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon style={styles.nav_icon} name="map" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon style={styles.nav_icon} name="place" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Icon style={styles.nav_icon} name="logout" size={30} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.profileAdmin}>
          <View style={styles.up}>
            <Image
              source={require("../../assets/images/genshin.png")}
              style={styles.adminDp}
              resizeMode="contain"
            />
            <View style={styles.sides}>
              <Text style={styles.adminName}>Japee</Text>
              <TouchableOpacity style={styles.editProfileAdmin}>
                <Text style={styles.editAdminText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.down}>
            <TouchableOpacity style={styles.adminItem}>
              <Text style={styles.adminFunctions}>3</Text>
              <Text style={styles.functionName}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adminItem}>
              <Text style={styles.adminFunctions}>3</Text>
              <Text style={styles.functionName}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.adminItem}>
              <Text style={styles.adminFunctions}>3</Text>
              <Text style={styles.functionName}>Added</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "rgba(128, 0, 0, 0.9)",
  },
  nav: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  nav_icon: {},
  sideMenu: {
    paddingTop: 100,
    paddingBottom: 50,
    position: "absolute",
    top: 0,
    maxHeight: "max-content",
    alignItems: "center",
    justifyContent: "space-between",
    left: 0,
    width: 70,
    height: "80%",
    borderBottomRightRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 9,
  },
  titleHeader: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 30,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileAdmin: {
    padding: 20,
    gap: 40,
    marginTop: 10,
  },
  up: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  adminName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  editProfileAdmin: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  editAdminText: {
    color: "rgb(210,210,210)",
  },
  sides: {
    gap: 10,
    marginTop: 20,
  },
  adminDp: {
    backgroundColor: "transparent",
    width: 130,
    height: 130,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 5,
  },
  adminItem: {
    backgroundColor: "#dbc1ac",
    borderRadius: 15,
    width: 90,
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  adminFunctions: {
    color: "maroon",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  functionName: {
    color: "maroon",
    fontSize: 15,
    textAlign: "center",
  },
  down: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
