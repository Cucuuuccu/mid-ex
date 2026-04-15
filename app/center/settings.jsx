import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../utils/ThemeContext";

export default function Settings() {
    const router = useRouter();
    const { isDark, toggleTheme, theme } = useTheme();

    return (
        <View style={[styles.Settings, { backgroundColor: theme.background }]}>

            {/* 深色模式設定列 */}
            <View style={[styles.SettingRow, { backgroundColor: theme.card }]}>
                <Text style={[styles.SettingLabel, { color: theme.text }]}>
                    深色模式
                </Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#C2C2C2", true: "#7984F9" }}
                    thumbColor={isDark ? "#FFFFFF" : "#FFFFFF"}
                />
            </View>

            {/* 目前主題狀態說明 */}
            <Text style={[styles.StatusText, { color: theme.text }]}>
                目前主題：{isDark ? "深色模式" : "淺色模式"}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    Settings: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
        width: "100%",
    },
    SettingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 16,
    },
    SettingLabel: {
        fontSize: 18,
        fontWeight: "600",
    },
    StatusText: {
        fontSize: 14,
        opacity: 0.6,
        marginTop: 4,
    },
});
