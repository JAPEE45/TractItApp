import React, { useRef } from 'react';
import { View, ScrollView, Image, Animated, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { BANNER_H } from './constants';
import TopNavigation from './TopNavigation';
import {data} from './pic'
import ListItem from './list';

const MapScreen = () => {
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}> 
      <TopNavigation title="Home" scrollA={scrollA} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={[styles.banner, {
              transform: [
                {
                  translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
                  }),
                },
                {
                  scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [2, 1, 0.5, 0.5],
                  }),
                },
              ],
            }]}
            source={require('../assets/bg.png')}
          />
        </View>
        <View style={styles.contentContainer}>
        <Text style={styles.text}>
          ComSci Building
        </Text>
            <SafeAreaView>
            <FlatList
              data={data}
              horizontal
              keyExtractor={(item) => item.id.toString()} 
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ListItem img={item.img} />}
            />

            </SafeAreaView>

      </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'crimson',
  },
  contentContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: '100%',
    transform: [{ translateY: -50 }],
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
    
  },
  banner: {
    height: BANNER_H,
    width: '100%',
    resizeMode: 'cover',

  },
  text: {
    fontSize: 16,
    padding: 20,
    paddingBottom: 50,
    fontFamily: 'poppins',
    
  },
});

export default MapScreen;
