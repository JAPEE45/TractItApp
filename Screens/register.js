import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome, Guest!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontFamily: 'poppins',
    color: '#303030',
  },
});

export default register;