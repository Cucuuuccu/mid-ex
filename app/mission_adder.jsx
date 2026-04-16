import { Button, TextInput } from "react-native";
import {KeyboardAvoidingView,Platform, StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable, Keyboard  } from "react-native";
import '../global.css';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { pickImage } from "../utils/photoHandler";
import { loadData, setData, saveData } from "../utils/storage";
import { useTheme } from "../utils/ThemeContext";

export default function MissionAdder() {
    const router = useRouter();
    const [photo, setPhoto] = useState(null);
    const [gameName, setGameName] = useState("");
    const { theme } = useTheme();

    const handleSelectPhoto = async () => {
    const base64String = await pickImage();
    if (base64String) {
        setPhoto(`data:image/jpeg;base64,${base64String}`);
    }};
    const handleAddMission = async () => {
        const newMission = {
            id: Date.now(),
            gameName: gameName.length > 0 ? gameName : "未命名遊戲",
            icon: photo,
        };
        const loadedData = await loadData("mission_list");
        const updatedData = loadedData === null ? [newMission] : [...loadedData, newMission];
        await saveData("mission_list", updatedData);
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "android" ? "padding" : (Platform.OS === "ios" ? "padding" : "height")}   
        >
            <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Pressable onPress={Keyboard.dismiss} style={[styles.MissionAdder, { backgroundColor: theme.background }]}>
                    <Pressable style={{position: "absolute", top: 20, left: 20 }} onPress={() => router.back()}>
                        <Image source={require("../assets/icons/back.png")} style={{ width: 32, height: 32, tintColor: theme.text }} />
                    </Pressable>
                    {
                        photo === null ?
                        (
                            <Pressable style={[styles.cross, { backgroundColor: theme.accent }]} onPress={handleSelectPhoto}>
                                <View style={[styles.lineHorizontal, { backgroundColor: theme.line }]} />
                                <View style={[styles.lineVertical, { backgroundColor: theme.line }]} />
                            </Pressable>
                        ):
                        (
                            <Pressable style={[styles.cross, { backgroundColor: theme.accent }]} onPress={handleSelectPhoto}>
                                <Image source={{ uri: photo }} style={{ width: 240, height: 240, borderRadius: 10 }} />
                            </Pressable>
                        )
                    }
                    <Text style={[styles.MissionAdderText, { marginTop: 40, color: theme.text }]}>
                        點擊上傳
                    </Text>
                    <Text style={[styles.MissionAdderText, { color: theme.text }]}>
                        遊戲ICON
                    </Text>
                    <TextInput 
                        style={[styles.MissionAdderInput, { backgroundColor: theme.card, color: theme.text }]}
                        onPress={() => console.log("點擊輸入遊戲名稱")}
                        value={gameName}
                        placeholder="請輸入遊戲名稱"
                        placeholderTextColor={theme.subText}
                        onChangeText={setGameName}
                    />
                    <Pressable 
                        style={[styles.MissionAdderInput, { width: 100, backgroundColor: "#7984F9", justifyContent: "center", alignItems: "center", marginTop: 50 }]}
                        onPress={() => {
                            handleAddMission();
                        }}
                    >
                        <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 24 }}>
                            新增
                        </Text>
                    </Pressable>
                    
                </Pressable>
                        
            </ScrollView>
            
        </KeyboardAvoidingView>
);};

const styles = StyleSheet.create({
    MissionAdder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 50,
        paddingTop: 120,
    },
    MissionAdderText: {
        fontWeight: "bold",
        fontSize: 32,
        width: 160,
        textAlign: "center",
    },
    MissionAdderInput: {
        width: 300,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "flex-start",
        color: "#6E6E6E",
        fontSize: 18,
        fontWeight: "bold",
    },
    cross: {
        width: 240,
        height: 240,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E6E6E",
        borderRadius:10
    },
    lineHorizontal: {
        position: "absolute",
        width: 100,
        height: 10,
        backgroundColor: "#D9D9D9",
        borderRadius:100
    },
    lineVertical: {
        position: "absolute",
        width: 10,
        height: 100,
        backgroundColor: "#D9D9D9",
        borderRadius:100
    },
});
