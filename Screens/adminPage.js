import { Text, Modal, StyleSheet, View, TouchableOpacity, Image,
  Animated, TextInput, ScrollView, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import PathModal from "./modal/pathsModal";
import {data} from './pic'


export default function AdminPage() {
  const [imageUri, setImageUri] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImage] = useState([])
  const [pathModal, setPathModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const filteredItems = (data || []).filter(item => 
    item?.label?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleSelectItem = (value) => {
    setSelectedValue(value); // Update the selected value
    setSearchQuery(''); // Clear the search query
  };

  const selectImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Allow only images
      });
      console.log(result);
      if(result.canceled == false){
        setImage(s=>[...s, result.assets[0].uri])
        console.log(images);
        console.log("Selected Image:", result);

      }

      
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const deleteImage = async (index) => {
    const up = images.filter((_, i) => i != index);
    console.log(index);
    setImage(d => [...up]);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const [color, setColor] = useState({ primary: "#640D14" });
    
    useEffect(() => {
      const getColors = async () => {
        try {
          const storedColors = await AsyncStorage.getItem("colors");
          if (storedColors) {
            setColor(JSON.parse(storedColors));
          } else {
            const defaultColor = { primary: "#640D14" };
            await AsyncStorage.setItem("colors", JSON.stringify(defaultColor));
            setColor(defaultColor);
          }
        } catch (error) {
          console.error("Error fetching colors:", error);
        }
      };
    
      getColors();
    }, []);

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -250 : 0, // Slide in or out
      duration: 200,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };
  return (
    <SafeAreaView style={{flex:1}}>
       <PathModal name="hi" isShow={pathModal} />
      <View style={{flex: 1, backgroundColor: color.primary}}>
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon style={styles.nav_icon} name="map" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
              source={require("../assets/hutao.jpg")}
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
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      {/* Close Button */}
      <TouchableOpacity onPress={() => setModalVisible(false)} style={{...styles.closeButton, backgroundColor: color.primary}}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.topViewModal}>
        <View style={styles.sideTopView}>
          <Text style={styles.textTitles}>Building No:</Text>
          <TextInput style={{...styles.searchBar, borderColor: color.primary, borderWidth: 1.5}}></TextInput>
        </View>
        <View style={styles.sideTopView}>
          <Text style={styles.textTitles}>Room No:</Text>
          <TextInput style={{...styles.searchBar, borderColor: color.primary, borderWidth: 1.5}}></TextInput>
        </View>
      </View>

      <View style={styles.container}>
      <Text style={styles.label}>Search and Select a Fruit:</Text>

      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {searchQuery.length > 0 && filteredItems.length > 0 && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item.value)} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownList}
        />
      )}
      {selectedValue && (
        <Text style={styles.selectedValue}>
          Selected: {selectedValue}
        </Text>
      )}
    </View>

      <View style={styles.bottomViewModal}>
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <View style={{flexDirection: "row"}}>
              <Image source={{ uri: item }} style={styles.imageModal} resizeMode="cover" />
              <TouchableOpacity style={styles.deleteImage} onPress={() => deleteImage(index)}>
                <Icon name="delete" size={20}/>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  </View>
</Modal>
     
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    height: 500,
    width: 300,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
    borderRadius: 10,
    position: "absolute",
    top: 100,
    flexDirection: "column",
    gap: 60,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,

  },
  topViewModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideTopView: {
    width: "45%",
    gap: 5,
  },
  textTitles: {
    fontSize: 15,
    fontWeight: "bold",
  },
  bottomViewModal: {
    gap: 10,
  },
  topBottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageModal: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 15
  },
  scrollViewImage: {
    width: "100%",
    height: 260,
  },
  deleteImage: {
    position: "absolute",
    bottom: 25,
    right: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  dropdownList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
  },
});