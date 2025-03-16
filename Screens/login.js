import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome back!</Text>
      <View style={{marginTop: 50}}>
        <TextInput
          style={styles.username}
          placeholder="Enter your Email"
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.username}
          placeholder="Enter your Password"
          placeholderTextColor="white"
        />
        <Text style={{fontSize: 15, fontFamily: 'poppinreg', color: 'white', marginTop: 10, marginLeft: 237}}>Forgot Password?</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#792828', 
  },
  text: {
    fontSize: 35,
    fontFamily: 'poppinmed',
    color: 'white',
    marginTop: 25,
    marginLeft: 20
  },
  username: {
    fontSize: 18,
    fontFamily: 'poppinmed',
    color: 'white',
    marginTop: 22,
    marginHorizontal: 20,
    paddingLeft: 15,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
});
  
export default login