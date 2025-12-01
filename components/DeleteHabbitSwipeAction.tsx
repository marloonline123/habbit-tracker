import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DeleteHabbitSwipeAction = () => {
  return (
    <View style={styles.container}>
      <Feather name="trash-2" size={30} color="white" />
      <Text style={{ color: 'white', marginTop: 5, fontWeight: 'bold' }}>Delete</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ff4d4d',
        borderRadius: 10,
        marginBottom: 10,
    }
})

export default DeleteHabbitSwipeAction