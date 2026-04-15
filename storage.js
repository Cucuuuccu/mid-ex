import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
    console.log("AsyncStorage:", AsyncStorage);
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
export const clearAllData = async () => {
  await AsyncStorage.clear();
}
export const deleteAllData = async (key) => {
  await AsyncStorage.removeItem(key);
};
export const deleteData = async (key, id) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        const currentData = jsonValue != null ? JSON.parse(jsonValue) : [];

        const newData = currentData.filter((item) => item.id !== id);

        await AsyncStorage.setItem(key, JSON.stringify(newData));
    } catch (e) {
        console.log("刪除資料失敗:", e);
    }
};