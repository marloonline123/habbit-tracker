import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CompleteHabbitSwipeAction = () => {
  return (
      <View style={styles.container}>
          <Feather name="check-circle" size={30} color="white" />
          <Text style={{ color: 'white', marginTop: 5, fontWeight: 'bold' }}>Check</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        marginBottom: 10,
    }
})

export default CompleteHabbitSwipeAction