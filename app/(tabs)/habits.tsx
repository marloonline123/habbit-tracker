import HabitCard from "@/components/HabitCard";
import { useAuthContext } from "@/context/AuthProvider";
import { client, DATABASE_ID, db, HABBITS_COLLECTION_ID } from "@/lib/appwrite";
import { Habit } from "@/types/habits";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthContext();
  const [habbits, setHabbits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const channel = `databases.${DATABASE_ID}.collections.${HABBITS_COLLECTION_ID}.documents`;
      const handleSubscribe = client.subscribe(channel, response => {
        fetchHabbits();
      });

      fetchHabbits();
      return () => {
        handleSubscribe();
      }
    }
  }, [user]);

  const fetchHabbits = async () => {
    try {
      setIsLoading(true);
      const response = await db.listDocuments(
        DATABASE_ID,
        HABBITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? ''), Query.orderDesc('$createdAt')]
      )

      if (response) {
        setHabbits(response.documents as Habit[]);
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
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
              <FlatList
                data={habbits}
                renderItem={({ item }) => <HabitCard habit={item} />}
                keyExtractor={(item) => item.$id}
                showsVerticalScrollIndicator={false}
              />
          )}
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
