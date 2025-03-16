import { Text, ImageBackground, StyleSheet, View, TouchableOpacity, Image, Animated } from "react-native";
import React, { useState, useRef, useEffect, useFocusEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {storeData, getData } from "../utilities/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function HomeScreen() {
    const [color, setColor] = useState({});
    useEffect(()=>{
        
    storeData('colors', {
    primary: '#640D14',
  })
  async function get(){
    const a = JSON.parse(await AsyncStorage.getItem('colors'));
    setColor(a);
  }
  get()
    },[])
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{...styles.mainContainer,backgroundColor: color.primary}}>
        <View style={styles.topView}>
            <Text>Hello User</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
	
  },
});
