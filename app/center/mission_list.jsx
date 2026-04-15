import { Alert, Button, FlatList } from "react-native";
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";
import { saveData, loadData, deleteData, clearAllData } from "../../utils/storage";
import { useLocalSearchParams,useFocusEffect, useRouter, Stack } from "expo-router";
import { useEffect, useCallback, useState } from "react";
import { useTheme } from "../../utils/ThemeContext";

export default function MissionList() {
    const { title, type } = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const { theme } = useTheme();


    const handleLoad = async () => {
        const loadedData = await loadData("mission_list");
        setData(loadedData || []);
    };

    useFocusEffect(
        useCallback(() => {
            handleLoad();
            console.log("載入的任務列表：", data);
        }, [])
    );
    
    return (
        <FlatList style={[styles.MissionList, { backgroundColor: theme.background }]}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
            }}
            renderItem={({ item }) => (
                <Pressable
                    style={[styles.MissionTab, { backgroundColor: theme.card }]}
                    onPress={() => {
                        console.log("點擊了這筆資料");
                        console.log("id:", item.id);
                        console.log("gameName:", item.gameName);
                        router.push({ pathname: "/center/game_mission_list", params: { id: item.id, title: `${item.gameName}-${title}`, type: type } });
                        
                    }}
                >
                    <Image
                        style={[{ marginLeft: 15 }, styles.MissionTabImage]}
                        source={{ uri: item.icon }}
                    />
                    <View style={{ marginLeft: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.MissionTabText, { color: theme.text }]}>
                            {item.gameName.length > 6 ? item.gameName.slice(0, 5) + "..." : item.gameName}
                        </Text>
                    </View>

                    <Pressable
                        style={{ position: "absolute", right: 10 }}
                        onPress={() => {
                            Alert.alert(
                                `刪除遊戲[${item.gameName}]`,
                                "確定要刪除這個遊戲嗎？",
                                [
                                    { text: "取消", style: "cancel" },
                                    {
                                        text: "確定",
                                        onPress: async () => {
                                            await deleteData("mission_list", item.id);
                                            handleLoad();
                                        }
                                    }
                                ]
                            );
                        }}
                    >
                        <Image
                            source={require("../../assets/icons/trash.png")}
                            style={{ width: 24, height: 24, tintColor: theme.text }}
                        />
                    </Pressable>
                </Pressable>
            )}
            ListFooterComponent={
                <Pressable style={[styles.MissionTab, { backgroundColor: theme.card }]} onPress={() => router.push("/mission_adder")}>
                    <View style={[{marginLeft: 15},styles.cross]}>
                        <View style={styles.lineHorizontal} />
                        <View style={styles.lineVertical} />
                    </View>
                    <View style={{ marginLeft: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.MissionTabText, { color: theme.text }]}>
                            點選加入遊戲
                        </Text>
                    </View>
                </Pressable>
            }
        >
        </FlatList>
    );
};

const styles = StyleSheet.create({
    MissionList: {
        backgroundColor: "#D9D9D9",
        marginTop: 80,
        width: "100%",
    },
    MissionTab: {
        width: 300,
        height: 100,
        backgroundColor: "#C2C2C2",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
        flexDirection: "row",
    },
    MissionTabText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 6,
        color: "#6E6E6E",
        textAlign: "center",
    },
    MissionTabImage:{
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E6E6E",
        borderRadius:10
    },
    cross: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E6E6E",
        borderRadius:10
    },
    lineHorizontal: {
        position: "absolute",
        width: 30,
        height: 5,
        backgroundColor: "#D9D9D9",
        borderRadius:100
    },
    lineVertical: {
        position: "absolute",
        width: 5,
        height: 30,
        backgroundColor: "#D9D9D9",
        borderRadius:100
    },
});
