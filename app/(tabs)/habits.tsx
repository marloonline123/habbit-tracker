import HabitCard from "@/components/HabitCard";
import { useAuthContext } from "@/context/AuthProvider";
import { DATABASE_ID, HABBITS_COLLECTION_ID, tableDb } from "@/lib/appwrite";
import { Habit } from "@/types/habits";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthContext();
  const [habbits, setHabbits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHabbits();
  }, [user]);

  const fetchHabbits = async () => {
    try {
      setIsLoading(true);
      const response = await tableDb.listRows(
        DATABASE_ID,
        HABBITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      )

      if (response) {
        setHabbits(response.rows);
      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View>
        <View>
          <FlatList
            data={habbits}
            renderItem={({ item }) => <HabitCard habit={item} />}
            keyExtractor={(item) => item.$id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
})
