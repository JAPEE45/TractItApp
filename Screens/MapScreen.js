import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { 
  View, ScrollView, Image, Animated, Text, StyleSheet, 
  SafeAreaView, FlatList, Modal, TouchableOpacity, Dimensions 
} from 'react-native';
import { BANNER_H } from './constants';
import TopNavigation from './TopNavigation';
import { data as rawData } from './pic';
import ListItem from './list';
import host from './../utilities/host'
import axiosConfig from '../utilities/axiosConfig';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

const screenWidth = Dimensions.get('window').width;
const imageAspectRatio = 7;
const imageWidth = screenWidth * imageAspectRatio;

const MapScreen = ({route}) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(null)
  console.log(route.params)
    useEffect(()=>{
      async function getPath(){
        try {
         const {data} = await axiosConfig(`/path/?path=${route.params.id.path_id}`)
          setEnd(data.data[0].path_name)
        } catch (error) {
          console.log(error)
        }
      }
      async function getData(){
        try {
          const {data} = await axiosConfig.get(`/room/?room=${route.params.id.id}`)
          // const {data} = await axiosConfig.get(`/path/?start=1&end=${route.params.id.}`)  
          console.log(data.data)
        } catch (error) {
          console.log(error)
        }
      }
      getPath()
      // getData()
      console.log(`end: ${end}`)
    },[])
  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setSelectedItem(null);
  }, []);

  return (
    <View style={styles.container}> 
      {/* Modal Component */}
      
      <MapModal isVisible={isVisible} closeModal={closeModal} selectedItem={selectedItem} />

      {/* Top Navigation */}
      <TopNavigation title="Home" scrollA={scrollA} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Image */}
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

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.text}>ComSci Building</Text>
          <SafeAreaView>
            <FlatList
              data={data}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)}>
                  <ListItem img={item.img} />
                </TouchableOpacity>
              )}
              initialNumToRender={5} 
              windowSize={10}
              getItemLayout={(data, index) => ({
                length: 120, offset: 120 * index, index,
              })}
            />
          </SafeAreaView>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

// Modal Component
const MapModal = ({ isVisible, closeModal }) => {
  const scrollViewRef = useRef(null);

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          onLayout={() => {
            scrollViewRef.current?.scrollTo({
              x: imageWidth / 2 - screenWidth / 2,
              animated: false
            });
          }}
        >
          <Image
            source={{uri:'http://192.168.1.37:8000/media/static/map/f31ee543-362d-4097-9dae-c3fbdd6b4f43.jpeg'}}
            style={{ height: 300, width: 300 }}
            resizeMode="cover"
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

// Styles
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default MapScreen;
