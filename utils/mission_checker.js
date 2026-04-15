import { loadData } from "./storage";

export const checkAllMissions = async () => {
    const data = await loadData("mission_list");
    console.log("遊戲列表:", data);

    let complete = true;

    if (data && Array.isArray(data) && data.length > 0) {
        for (const item of data) {
            const data2 = await loadData(`mission_list_${item.id}`);
            console.log(`mission_list_${item.id}:`, data2);

            if (data2 && Array.isArray(data2)) {
                for (const mission of data2) {
                    if (!mission.complete) {
                        complete = false;
                        break;
                    }
                }
            }

            if (!complete) break;
        }
    } else {
        complete = false;
    }

    return complete;
};
export const RefreshAllMissions = async () => {
    const data = await loadData("mission_list");
    console.log("遊戲列表:", data);

    if (!data || !Array.isArray(data) || data.length === 0) {
        return false;
    }

    for (const item of data) {
        const data2 = await loadData(`mission_list_${item.id}`);
        console.log(`mission_list_${item.id}:`, data2);

        if (data2 && Array.isArray(data2)) {
            const updatedData = data2.map((mission) => ({
                ...mission,
                complete: false,
            }));

            await saveData(`mission_list_${item.id}`, updatedData);

            console.log(`已重置 mission_list_${item.id}:`, updatedData);
        }
    }

    return true;
};