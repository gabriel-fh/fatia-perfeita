import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { BaooSVG } from "../../components/Design/CustomIcons";
import { useCartStore } from "../../contexts/Cart";

const CartIcon = ({ color }: { color: string }) => {
  const buttonScale = useRef(new Animated.Value(0)).current;

  const cartContext = useCartStore();

  useEffect(() => {
    if (cartContext.cart.length > 0) {
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [cartContext.cart.length, buttonScale]);

  return (
    <View
      style={{
        position: "absolute",
        // top: -30,
        // borderRadius: 1000,
        padding: 10,
        // backgroundColor: cartContext.cart.length > 0 ? "#29ABE2" : color,
        // ...styles.shadow,
      }}
    >
      <Animated.View
        style={{ transform: [{ scale: buttonScale }] }}
        className="absolute z-50 -top-0 right-0 bg-blue-baoo w-5 h-5 rounded-full justify-center items-center"
      >
        <Text
          className={`text-white font-inter_regular ${
            cartContext.getTotalItemsInCart() >= 10 ? "text-xs" : "text-sm"
          }`}
        >
          {cartContext.getTotalItemsInCart() > 0
            ? cartContext.getTotalItemsInCart() > 99
              ? "9+"
              : cartContext.getTotalItemsInCart()
            : null}
        </Text>
      </Animated.View>
      <BaooSVG color="#999" height={30} width={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#636262",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    elevation: 5,
  },
});

export default CartIcon;
