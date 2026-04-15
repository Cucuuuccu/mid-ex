import React, { useState } from "react";
import { Alert, Button, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../utils/photoHandler";

export default function ImageUpload() {
  const [photo, setPhoto] = useState(null);

  const handleSelectPhoto = async () => {
    const base64String = await pickImage();
    if (base64String) {
      setPhoto(`data:image/jpeg;base64,${base64String}`);
    }
  };

  return (
    <View>
      <Button title="選擇照片" onPress={handleSelectPhoto} />

      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: 400 }}
        />
      )}
    </View>
  );
}