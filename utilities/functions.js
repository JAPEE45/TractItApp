import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storeData(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));

}

export async function getData(key) {
    const jsonValue = JSON.parse(await AsyncStorage.getItem(key));
    return jsonValue
}