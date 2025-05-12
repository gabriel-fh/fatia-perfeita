import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../utils/styles';

const AddRemoveButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Adicionar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button : {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
  }
})

export default AddRemoveButton