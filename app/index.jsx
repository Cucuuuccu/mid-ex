import { Button } from "react-native";
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";
import '../global.css';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { clearAllData, loadData, saveData } from "../utils/storage";
import { RefreshAllMissions } from "../utils/mission_checker";
import { useTheme } from "../utils/ThemeContext";

export default function Cover() {
    const router = useRouter();
    const { theme } = useTheme();

    const checkIsNewDay = async () => {
    const now = new Date();

    const todayString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const lastCheckDate = await loadData("last_check_date");

    const isNewDay = lastCheckDate !== todayString;

    if (isNewDay) {
            await saveData("last_check_date", todayString);
        }

        return isNewDay;
    };
    useEffect(() => {
    const handleCheckDay = async () => {
        const isNewDay = await checkIsNewDay();

        if (isNewDay) {
            await RefreshAllMissions();
            console.log("已換日");
        } else {
            console.log("還是同一天");
        }
    };

    handleCheckDay();
}, []);
    return (
        <Pressable style={[styles.Cover, { backgroundColor: theme.background }]} onPress={() => router.push({ pathname: "/center/mission_list", params: { type: "default", title: "任務表" } })}>
            <View style={{justifyContent:"center", alignItems:"flex-start"}}>
                <Text style={[styles.CoverText, { color: theme.text }]}>
                    Daily
                </Text>
                <Text style={[styles.CoverText, { color: theme.text }]}>
                    Mission
                </Text>
                <Text style={[styles.CoverText, { color: theme.text }]}>
                    Reminder
                </Text>
            </View>
            <Text style={[styles.CoverText, {fontSize:30, color: theme.text }]}>
                每日任務簽到器
            </Text>
            <Text style={[styles.CoverText, {fontSize:30, marginTop: 60, color: theme.text }]}>
                Tap To Start
            </Text>
        </Pressable>
);};

const styles = StyleSheet.create({
    Cover: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
        width: "100%",
    },
    CoverText: {
        fontWeight: "bold",
        fontSize: 48,
        color: "#333333",
    }
});
