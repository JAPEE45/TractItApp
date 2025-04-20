import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {data} from './pic'
import AsyncStorage from "@react-native-async-storage/async-storage";
import host from "../utilities/host";
import axiosConfig from "../utilities/axiosConfig";

async function adData(key, data){
  await AsyncStorage.setItem(key, JSON.stringify(data));
}


const SearchBar = ({navigation}) => { 
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [primaryColor, setPrimaryColor] = useState("")
  const [rooms, setRooms] = useState([]);
  

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const filtered = rooms.filter((item) =>
        item.name?.toString().toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(rooms);
    }
  };
  
  useEffect(()=>{
    async function getColor(){
      const color = await AsyncStorage.getItem('colors')
      setPrimaryColor(JSON.parse(color).primary) 
    }
    async function getRooms(){
      try {
        const {data} = await axiosConfig.get('/fetchRoom/')
        setRooms(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getRooms()
    getColor()
    console.log(primaryColor)
  
  },[])

  return (
    <View  style={{...styles.container, backgroundColor: primaryColor}}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="white"
        value={query}
        onChangeText={handleSearch}
      />  
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('map', {id: item}) }>
            <Image source={{uri:`${host}/media/${item.thumbnail}`}} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.des}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
  
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "poppins",
    transform: [{ translateY: -15 }],
    color: "white",
  },
  des: {
    fontSize: 12,
    transform: [{ translateX: 93}, { translateY: 5}],
    position: "absolute",
    color: "white",
  },
});

export default SearchBar;
