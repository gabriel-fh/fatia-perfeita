import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'



const SecondaryCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>SecondaryCard</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    height: 100,
    backgroundColor: '#1FF'
  }
})

export default SecondaryCard