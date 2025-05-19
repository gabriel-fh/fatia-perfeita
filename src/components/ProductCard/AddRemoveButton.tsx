import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import useAddRemove from "./useAddRemove";
import { colors } from "@/src/utils/styles";
import ProdutoPedido from "@/src/model/ProdutoPedido";
type AddRemoveButtonProps = {
  produto: ProdutoPedido;
};

const AddRemoveButton = ({ produto}: AddRemoveButtonProps) => {
  const {
    counterValue,
    product,
    addProduct,
    removeProduct,
    handleClickProduct,
  } = useAddRemove({ produto });

  return !product ? (
    <Pressable style={styles.button} onPress={handleClickProduct}>
      <Text style={styles.text}>Adicionar</Text>
    </Pressable>
  ) : (
    <View style={[styles.button, styles.buttonPressed]}>
      <Pressable onPress={() => removeProduct(1)} >
        <FontAwesome name="minus" size={15} color="white" />
      </Pressable>
      <Text accessibilityLiveRegion="assertive" style={styles.text}>{counterValue || 0}</Text>
      <Pressable onPress={() => addProduct(1)} >
        <FontAwesome name="plus" size={15} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  buttonPressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
  },
});

export default AddRemoveButton;
