import { FlatList } from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { checkAllMissions } from "../../utils/mission_checker";
import { loadData, saveData } from "../../utils/storage";

export default function Calendar() {
    const now = new Date();
    const [allComplete, setAllComplete] = useState(false);
    const [monthData, setMonthData] = useState([]);

    const year = now.getFullYear();
    const month = now.getMonth(); // 0~11
    const today = now.getDate();

    const getMonthKey = () => {
        return `calendar_${year}_${month + 1}`;
    };

    const createMonthData = () => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return Array.from({ length: daysInMonth }, (_, index) => ({
            day: index + 1,
            complete: false,
        }));
    };

    const handleLoadMonthData = async () => {
        const key = getMonthKey();
        let savedData = await loadData(key);

        if (!Array.isArray(savedData) || savedData.length === 0) {
            savedData = createMonthData();
            await saveData(key, savedData);
        }

        const todayComplete = await checkAllMissions();

        const updatedData = savedData.map((item) => {
            if (item.day === today) {
                return { ...item, complete: todayComplete };
            }
            return item;
        });

        await saveData(key, updatedData);

        setMonthData(updatedData);
        setAllComplete(todayComplete);
    };

    useEffect(() => {
        handleLoadMonthData();
    }, []);

    return (
        <View style={styles.Settings}>
            <FlatList
                data={monthData}
                keyExtractor={(item) => item.day.toString()}
                numColumns={5}
                contentContainerStyle={styles.calendarContainer}
                renderItem={({ item }) => (
                    <Pressable
                        style={[
                            styles.dayBox,
                            item.complete && styles.dayBoxComplete,
                            (!item.complete && item.day < today) && styles.dayBoxUnComplete,
                            item.day === today && styles.todayBox,
                        ]}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                item.complete && styles.dayTextComplete,
                            ]}
                        >
                            {item.day}
                        </Text>
                    </Pressable>
                )}
            />

            <Text style={styles.statusText}>
                {allComplete ? "今日任務已完成！" : "今日任務未完成！"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Settings: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#D9D9D9",
        width: "100%",
        paddingTop: 80,
    },
    calendarContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },
    dayBox: {
        width: 60,
        height: 60,
        margin: 6,
        borderRadius: 8,
        backgroundColor: "#C2C2C2",
        justifyContent: "center",
        alignItems: "center",
    },
    dayBoxComplete: {
        backgroundColor: "#7984F9",
    },
    dayBoxUnComplete: {
        backgroundColor: "#FF002888",
    },
    todayBox: {
        borderWidth: 2,
        borderColor: "#333333",
    },
    dayText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
    },
    dayTextComplete: {
        color: "#FFFFFF",
    },
    statusText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: "#333333",
    },
});