import { Models } from "react-native-appwrite";

export type HabitForm = {
    name: string,
    description: string,
    frequency: string
}

export interface Habit extends Models.Row {
    $id: string;
    user_id: string;
    name: string;
    description: string;
    frequency: string;
    streak_count: number;
    $createdAt: string;
    $updatedAt: string;
}