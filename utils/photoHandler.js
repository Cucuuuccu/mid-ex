import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("抱歉", "我們需要相簿權限才能讓你上傳圖片哦！");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.4,
    base64: true,
  });

  if (!result.canceled && result.assets?.length > 0) {
    return result.assets[0].base64;
  }

  return null;
};