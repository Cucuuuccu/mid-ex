import { Alert, FlatList, StyleSheet, Text, Image, View, Pressable } from "react-native";
import { saveData, loadData, deleteData } from "../utils/storage";
import { useLocalSearchParams, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTheme } from "../utils/ThemeContext";

export default function ImageUpload() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const { theme } = useTheme();

    const handleToggleComplete = async (item) => {
        const loadedData = await loadData(`mission_list_${id}`);
        const updatedData = loadedData.map((mission) => {
            if (mission.id === item.id) {
                return { ...mission, complete: !mission.complete };
            }
            return mission;
        });
        await saveData(`mission_list_${id}`, updatedData);
        setData(updatedData);
    };

    const handleLoad = async () => {
        const loadedData = await loadData(`mission_list_${id}`);
        setData(loadedData || []);
    };

    useFocusEffect(
        useCallback(() => {
            handleLoad();
        }, [id])
    );

    return (
        <View style={[styles.Container, { backgroundColor: theme.background }]}>

            <Pressable 
                style={styles.BackButton} 
                onPress={() => router.back()}
            >
                <Image 
                    source={require("../assets/icons/back.png")} 
                    style={{ width: 32, height: 32, tintColor: theme.text }} 
                />
            </Pressable>

            <FlatList
                style={styles.MissionList}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.FlatListContent}
                renderItem={({ item }) => (
                    <Pressable
                        style={[styles.MissionTab, { backgroundColor: theme.card }]}
                        onPress={() => handleToggleComplete(item)}
                    >
                        {item.complete ? (
                            <View style={[styles.MissionTabImage, { marginLeft: 15, backgroundColor: "transparent" }]}>
                                <Image 
                                    source={require("../assets/icons/check.png")} 
                                    style={styles.CheckIcon} 
                                />
                                <Image 
                                    style={[styles.MissionTabImage, { backgroundColor: "transparent" }]} 
                                    source={{ uri: item.icon }} 
                                />
                            </View>
                        ) : (
                            <Image 
                                style={[styles.MissionTabImage, { marginLeft: 15, backgroundColor: theme.accent }]} 
                                source={{ uri: item.icon }} 
                            />
                        )}

                        <View style={styles.TextContainer}>
                            <Text style={[styles.MissionTabText, { color: theme.text }]}>
                                {item.gameName.length > 6 ? item.gameName.slice(0, 5) + "..." : item.gameName}
                            </Text>
                        </View>

                        <Pressable 
                            style={styles.DeleteButton} 
                            onPress={() => {
                                Alert.alert(
                                    `刪除任務[${item.gameName}]`,
                                    "確定要刪除這個任務嗎？",
                                    [
                                        { text: "取消", style: "cancel" },
                                        {
                                            text: "確定",
                                            onPress: async () => {
                                                await deleteData(`mission_list_${id}`, item.id);
                                                handleLoad();
                                            }
                                        }
                                    ]
                                );
                            }}
                        >
                            <Image 
                                source={require("../assets/icons/trash.png")} 
                                style={{ width: 24, height: 24, tintColor: theme.text }} 
                            />
                        </Pressable>
                    </Pressable>
                )}
                ListFooterComponent={
                    <Pressable 
                        style={[styles.MissionTab, { backgroundColor: theme.card }]} 
                        onPress={() => router.push({
                            pathname: "/game_mission_adder", 
                            params: { id: id, type: "back_button" }
                        })}
                    >
                        <View style={[styles.cross, { marginLeft: 15, backgroundColor: theme.accent }]}>
                            <View style={[styles.lineHorizontal, { backgroundColor: theme.line }]} />
                            <View style={[styles.lineVertical, { backgroundColor: theme.line }]} />
                        </View>
                        <View style={styles.TextContainer}>
                            <Text style={[styles.MissionTabText, { color: theme.text }]}>點選加入任務</Text>
                        </View>
                    </Pressable>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#D9D9D9",
    },
    BackButton: {
        position: "absolute",
        top: 20, 
        left: 20,
        zIndex: 10,
    },
    MissionList: {
        width: "100%",
    },
    FlatListContent: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 100, // 給返回按鈕留空間
        paddingBottom: 40,
    },
    MissionTab: {
        width: 300,
        height: 100,
        backgroundColor: "#C2C2C2",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
    },
    TextContainer: {
        marginLeft: 15,
        justifyContent: "center",
        alignItems: "center",
        flex: 1, // 讓文字區域自動撐開
    },
    MissionTabText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#6E6E6E",
        textAlign: "center",
    },
    MissionTabImage: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E6E6E",
        borderRadius: 10
    },
    CheckIcon: {
        zIndex: 5,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    DeleteButton: {
        position: "absolute",
        right: 15,
    },
    cross: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6E6E6E",
        borderRadius: 10
    },
    lineHorizontal: {
        position: "absolute",
        width: 30,
        height: 5,
        backgroundColor: "#D9D9D9",
        borderRadius: 100
    },
    lineVertical: {
        position: "absolute",
        width: 5,
        height: 30,
        backgroundColor: "#D9D9D9",
        borderRadius: 100
    },
});
