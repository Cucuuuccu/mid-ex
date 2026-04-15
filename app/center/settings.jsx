import { Button } from "react-native";
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";

import { useLocalSearchParams, useRouter, Stack } from "expo-router";

export default function Settings() {
    const router = useRouter();
    return (
        <View style={styles.Settings}>
            <Text>
                settings
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Settings: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
        width: "100%",
    }
});