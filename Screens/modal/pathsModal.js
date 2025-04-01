import { View, Modal, Text } from "react-native";

export default function PathModal({name, isShow}){
    return(
        <Modal visible={isShow} style={{position:'absolute', zIndex:9999}}>
            <View>
                <Text>hi</Text>
            </View>
        </Modal>
    )
}