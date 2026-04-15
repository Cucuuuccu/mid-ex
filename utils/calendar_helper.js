import { loadData, saveData } from "./storage";

export const getMonthKey = (year, month) => {
    return `calendar_${year}_${month + 1}`;
};

export const createMonthData = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => ({
        day: index + 1,
        complete: false,
    }));
};

export const getOrCreateMonthData = async (year, month) => {
    const key = getMonthKey(year, month);
    const savedData = await loadData(key);

    if (Array.isArray(savedData) && savedData.length > 0) {
        return savedData;
    }

    const newMonthData = createMonthData(year, month);
    await saveData(key, newMonthData);
    return newMonthData;
};

export const updateMonthDayComplete = async (year, month, day, complete) => {
    const key = getMonthKey(year, month);
    const savedData = await loadData(key);

    const monthData = Array.isArray(savedData) ? savedData : createMonthData(year, month);

    const updatedData = monthData.map((item) =>
        item.day === day ? { ...item, complete } : item
    );

    await saveData(key, updatedData);
    return updatedData;
};