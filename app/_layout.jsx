
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";
import '../global.css';
import { Ionicons } from "@expo/vector-icons";
export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{headerShown: false}} >
          <Stack.Screen name="cover" />
          <Stack.Screen name="center"/>
          <Stack.Screen name="mission_adder"/>
          <Stack.Screen name="game_mission_adder"/>
        </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

