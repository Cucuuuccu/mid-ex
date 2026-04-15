
import {Alert, Button, FlatList, StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, Pressable  } from "react-native";
import { saveData, loadData, deleteData } from "../../utils/storage";
import { useLocalSearchParams,useFocusEffect, useRouter, Stack } from "expo-router";
import { useEffect, useCallback, useState } from "react";

export default function MissionList() {
    const { id, title, type } = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [complete, setComplete] = useState(false);
    const handleToggleComplete = async (item) => {
        const loadedData = await loadData(`mission_list_${id}`);
        console.log("載入的任務列表：", loadedData, "id:",id);
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
        }, [])
    );
    
    return (
        <FlatList style={styles.MissionList}
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
                    style={styles.MissionTab}
                    onPress={() => {
                        console.log("點擊了這筆資料");
                        console.log("id:", item.id);
                        console.log("gameName:", item.gameName);
                        handleToggleComplete(item);
                        
                    }}
                >
                    {
                        item.complete ? (
                            <View style={[{marginLeft: 15, backgroundColor: "transparent"},styles.MissionTabImage]}>
                                <Image source={require("../../assets/icons/check.png")} style={[{zIndex: 5,position: "absolute",width: "100%", height: "100%", backgroundColor: "transparent"}]} />
                                <Image style={[{backgroundColor: "transparent"},styles.MissionTabImage]}  source={{ uri: item.icon }}   />
                            </View>
                        ) : (
                            <Image style={[{marginLeft: 15},styles.MissionTabImage]} source={{ uri: item.icon }} />
                        )
                    }
                    <View style={{ marginLeft: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.MissionTabText}>
                            {item.gameName.length > 6 ? item.gameName.slice(0, 5) + "..." : item.gameName}
                        </Text>
                    </View>
                    <Pressable style={{ position: "absolute", right: 10 }} onPress={() => {
                        Alert.alert(
                            `刪除任務[${item.gameName}]`,
                            "確定要刪除這個任務嗎？",
                            [
                                {
                                    text: "取消",   
                                    style: "cancel"
                                },
                                {
                                    text: "確定",
                                    onPress: async () => {
                                        await deleteData(`mission_list_${id}`, item.id);
                                        handleLoad();
                                    }
                                }
                            ]
                        );
                    }}>
                        <Image source={require("../../assets/icons/trash.png")} style={{ width: 24, height: 24 }} />
                    </Pressable>
                </Pressable>
            )}
            ListFooterComponent={
                <Pressable style={styles.MissionTab} onPress={() => router.push({pathname: "/game_mission_adder", params: {id: id, title: ``, type: "back_button"}})}>
                    <View style={[{marginLeft: 15},styles.cross]}>
                        <View style={styles.lineHorizontal} />
                        <View style={styles.lineVertical} />
                    </View>
                    <View style={{ marginLeft: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.MissionTabText}>
                            點選加入任務
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