import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";
import '../global.css';
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../utils/ThemeContext";

function RootLayoutContent() {
  const { theme, isDark } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name="index" />
        <Stack.Screen name="center"/>
        <Stack.Screen name="mission_adder"/>
        <Stack.Screen name="game_mission_adder"/>
        <Stack.Screen name="image_upload"/>
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
