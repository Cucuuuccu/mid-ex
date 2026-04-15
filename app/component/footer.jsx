import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { pickImage } from "../../utils/photoHandler";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, Image, View, Button, Pressable} from "react-native";

export default function Footer({ type = "default", title = "" }) {
    const router = useRouter();

    const getFooterContent = () => {
        switch (type) {
        default:
            return (
                <View style={{flexDirection: "row", justifyContent: "space-around", width: "100%", paddingHorizontal: 40, alignItems: "center"}}>
                    <Pressable onPress={() => router.push({pathname: "/center/mission_list", params: {type: "default", title: "任務表"}})} title="">
                        <Image source={require("../../assets/icons/Home.png")} style={{ width: 32, height: 32 }} />
                    </Pressable>
                    <Pressable onPress={() => router.push({pathname: "/center/calendar", params: {type: "default", title: "日曆"}})} title="">
                        <Image source={require("../../assets/icons/Calendar.png")} style={{ width: 32, height: 32 }} />
                    </Pressable>
                    <Pressable onPress={() => router.push({pathname: "/center/settings", params: {type: "default", title: "設定"}})} title="">
                        <Image source={require("../../assets/icons/Settings.png")} style={{ width: 32, height: 32 }} />
                    </Pressable>
                </View>
            );
        }
    };
    const getFooterStyle = () => {
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
    <View style={[styles.Footer]}>
        {getFooterContent()}
    </View>
  );
}
const styles = StyleSheet.create({
    Footer: {
        width: "100%",
        height: 70,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 0,
        left: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
});