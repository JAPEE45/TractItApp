import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ListItem = ({ img }) => {
    return <Image source={img} style={styles.image} />;
};


export default ListItem

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 300,
        marginRight: 10,
        borderRadius: 30
    }
});