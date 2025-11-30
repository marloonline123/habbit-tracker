import { Habit } from '@/types/habits'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Text } from 'react-native-paper'

type Props = {
  habit: Habit
}
const HabitCard = ({habit}: Props) => {
  return (
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
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7f2fa',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
    shadowColor: '#000',
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
    marginTop: 20,
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