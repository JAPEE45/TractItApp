import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {data} from './pic'



const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const filtered = data.filter((item) =>
        item.name?.toString().toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  

  return (
    <LinearGradient colors={['#792828', '#E6E4E4']} style={styles.container}>
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
          <View style={styles.item}>
            <Image source={ item.img } style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.des}>{item.description}</Text>
          </View>
        )}
      />
    </LinearGradient>
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
