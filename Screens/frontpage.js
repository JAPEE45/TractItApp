import React from 'react';

import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FrontPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.Image}
        source={require('../assets/background.png')} 
      />
      <Image 
        style={styles.logo}
        source={require('../assets/osmlogo.jpg')} 
      />

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('login')}>
        <Text style={{color: 'white', fontSize: 19, fontFamily: 'poppins', textAlign: 'center', top: '22%'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SigninBtn} onPress={() => navigation.navigate('register')}>
        <Text style={{color: '#303030', fontSize: 19, fontFamily: 'poppins', textAlign: 'center', top: '22%'}}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestBtn} onPress={() => navigation.navigate('GuestPage')}>
        <Text style={{color: '#792828', fontSize: 15, fontFamily: 'poppins', textAlign: 'center'}}>Continue as a Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    height: '100%',
    width: '100%',
  },
  logo: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    borderRadius: 190,
    opacity: 0.7,
    width: '80%', 
    height: '40%',
  },
  loginBtn: {
    position: 'absolute',
    top: '70%',
    left: '5%',
    backgroundColor: '#303030',
    borderRadius: 10,
    width: '91%', 
    height: '7%',
  },
  SigninBtn:{
    position: 'absolute',
    top: '79%',
    left: '5%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 10,
    width: '91%', 
    height: '7%',
  },
  guestBtn: {
    position: 'absolute',
    top: '90%',
    left: '32%',
    backgroundColor: 'transparent',
  }
});

export default FrontPage;