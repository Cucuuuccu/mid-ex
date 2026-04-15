import { Button, TextInput } from "react-native";
import {KeyboardAvoidingView,Platform, StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable, Keyboard  } from "react-native";
import '../global.css';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { pickImage } from "../utils/photoHandler";
import { loadData, setData, saveData } from "../utils/storage";
export default function MissionAdder() {
    
    const { id, title, type } = useLocalSearchParams();
    const router = useRouter();
    const [photo, setPhoto] = useState(null);
    const [gameName, setGameName] = useState("");
    const handleSelectPhoto = async () => {
    const base64String = await pickImage();
    if (base64String) {
        setPhoto(`data:image/jpeg;base64,${base64String}`);
    }};
    const handleAddMission = async () => {
        const newMission = {
            id: Date.now(),
            gameName: gameName.length > 0 ? gameName : "未命名任務",
            icon: photo,
            complete: false,
        };
        console.log("新增的任務：", newMission, "id:", id);
        const loadedData = await loadData(`mission_list_${id}`);
        const updatedData = loadedData === null ? [newMission] : [...loadedData, newMission];
        await saveData(`mission_list_${id}`, updatedData);
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "android" ? "padding" : (Platform.OS === "ios" ? "padding" : "height")}   
        >
            <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Pressable onPress={Keyboard.dismiss} style={styles.MissionAdder}>
                    <Pressable style={{position: "absolute", top: 20, left: 20 }} onPress={() => router.back()}>
                        <Image source={require("../assets/icons/back.png")} style={{ width: 32, height: 32}} />
                    </Pressable>
                    {
                        photo === null ?
                        (
                            <Pressable style={styles.cross} onPress={handleSelectPhoto}>
                                <View style={styles.lineHorizontal} />
                                <View style={styles.lineVertical} />
                            </Pressable>
                        ):
                        (
                            <Pressable style={styles.cross} onPress={handleSelectPhoto}>
                                <Image source={{ uri: photo }} style={{ width: 240, height: 240, borderRadius: 10 }} />
                            </Pressable>
                        )
                    }
                    <Text style={[styles.MissionAdderText, { marginTop: 40 }]}>
                        點擊上傳
                    </Text>
                    <Text style={styles.MissionAdderText}>
                        任務ICON
                    </Text>
                    <TextInput 
                        style={[styles.MissionAdderInput]}
                        onPress={() => console.log("點擊輸入任務名稱")}
                        value={gameName}
                        placeholder="請輸入任務名稱"
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
        backgroundColor: "#D9D9D9",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 50,
        paddingTop: 120,
    },
    MissionAdderText: {
        fontWeight: "bold",
        fontSize: 32,
        color: "a#333333",
        fontFamily:"roboto-regular",
        fontFamily:"inter",
        width: 160,
        textAlign: "center",
    },
    MissionAdderInput: {
        width: 300,
        height: 50,
        backgroundColor: "#C2C2C2",
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