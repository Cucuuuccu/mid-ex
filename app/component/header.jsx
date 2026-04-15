import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../../utils/photoHandler";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, Image, View, Button, Pressable} from "react-native";

export default function Header({ type = "default", title = "" }) {
    const router = useRouter();

    const getHeaderContent = () => {
        switch (type) {
        case "back_button":
            return (
                <Pressable onPress={() => router.back()} title="" style={{ marginLeft: 20 }}>
                    <Image source={require("../../assets/icons/icon_back.png")} style={{ width: 32, height: 32 }} />
                </Pressable>
            );
        default:
            return (
                <Text style={[styles.HeaderText, {marginRight: 20}]}>
                    {title}
                </Text>
            );
        }
    };
    const getHeaderStyle = () => {
        switch (type) {
        case "back_button":
            return {
                alignItems: "flex-start",
                justifyContent: "center",
            };
        default:
            return {
                alignItems: "flex-end",
                justifyContent: "flex-end",
            };
        }
    };
  return (
    <View style={[styles.Header, getHeaderStyle()]}>
        {getHeaderContent()}
    </View>
  );
}
const styles = StyleSheet.create({
    Header: {
        width: "100%",
        height: 80,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
    },
    HeaderText: {
        fontSize: 24,
        fontWeight: "bold",
    }
});