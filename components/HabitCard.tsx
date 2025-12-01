import { DATABASE_ID, HABBITS_COLLECTION_ID, HABBITS_COMPLETIONS_COLLECTION_ID, db } from '@/lib/appwrite';
import { Habit } from '@/types/habits';
import React, { useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ID, Query } from 'react-native-appwrite';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Surface, Text } from 'react-native-paper';
import CompleteHabbitSwipeAction from './CompleteHabbitSwipeAction';
import DeleteHabbitSwipeAction from './DeleteHabbitSwipeAction';

type Props = {
  habit: Habit
}
const HabitCard = ({habit}: Props) => {
  const swipeRef = useRef(null);
  const isCompletedToday = async () => {
    try {
      const response = await db.listDocuments(
        DATABASE_ID,
        HABBITS_COMPLETIONS_COLLECTION_ID,
        [
          Query.equal('habbit_id', habit.$id),
          habit.frequency === 'daily' ? Query.greaterThanEqual('completed_at', new Date().toISOString().split('T')[0])
          : (habit.frequency === 'weekly' ? Query.greaterThanEqual('completed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
          : Query.greaterThanEqual('completed_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]))
        ]
      );
      if (response) {
        return response.documents.length > 0;
      }
    } catch (error) {
      console.log('there is error: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await db.deleteDocument(DATABASE_ID, HABBITS_COLLECTION_ID, habit.$id);
      if (response) {
        swipeRef.current?.close();
      }
    } catch (error) {
      console.log('there is error: ', error);
    }
  }

  const handleComplete = async () => {
    
    if (await isCompletedToday()) {
      const completeText = habit.frequency === 'daily' ? 'today' : (habit.frequency === 'weekly' ? 'this week' : 'this month');
      Alert.alert(`${habit.frequency} habit already completed ${completeText}, cannot recomplete`);
      swipeRef.current?.close();
      return;
    }
    try {
      const response = await db.createDocument(DATABASE_ID, HABBITS_COMPLETIONS_COLLECTION_ID, ID.unique(), {
        habbit_id: habit.$id,
        user_id: habit.user_id,
        completed_at: new Date().toISOString(),
      });
      if (response) {
        const newStreakCount = habit.streak_count + 1;
        await db.updateDocument(DATABASE_ID, HABBITS_COLLECTION_ID, habit.$id, {
          streak_count: newStreakCount,
        });
        swipeRef.current?.close();
      }
    } catch (error) {
      console.log('there is error: ', error);
    }
  }

  return (
    <Swipeable
      ref={swipeRef}

      renderLeftActions={() => <DeleteHabbitSwipeAction />}
      renderRightActions={() => <CompleteHabbitSwipeAction />}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          handleDelete();
        } else if (direction === 'left') {
          handleComplete();
        }
      }}
    >
      <Surface style={styles.card} >
        <View>
          <Text variant="headlineLarge" style={styles.cardTitle}>{habit.name}</Text>
          <Text variant="bodyLarge" style={styles.cardDescription}>{habit.description}</Text>

          <View style={styles.cardBadges}>
            <View style={styles.streakBadge}><Text style={styles.streakBadgeText}>Current Streak is {habit.streak_count}</Text></View>
            <View style={styles.frequencyBadge}><Text style={styles.frequencyBadgeText}>{habit.frequency}</Text></View>
          </View>
        </View>
      </Surface>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ecf5ffff',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: '#929292ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    // fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#3b3b3bff',
  },
  cardBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    width: '100%'
  },
  frequencyBadge: {
    backgroundColor: '#f4dbfeff',
    borderRadius: 20,
    padding: 10,
  },
  frequencyBadgeText: {
    color: '#ae00ffff',
  },
  streakBadge: {
    backgroundColor: '#fff3e0',
    borderRadius: 20,
    padding: 10,
  },
  streakBadgeText: {
    color: "#ff9800",
    fontWeight: 'bold'
  }
})

export default HabitCard