import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";

const OrdersIcon = ({ color }: { color: string }) => {
  // const opacity = new Animated.Value(1);
  // const { runningOrderInfos } = useOrder();

  // useEffect(() => {
  //   const loopAnim = Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(opacity, {
  //         toValue: 0,
  //         duration: 600,
  //         useNativeDriver: false,
  //       }),
  //       Animated.timing(opacity, {
  //         toValue: 1,
  //         duration: 600,
  //         useNativeDriver: false,
  //       }),
  //     ])
  //   );

  //     loopAnim.start();

  //   return () => {
  //     loopAnim.stop();
  //   };
  // }, [runningOrderInfos]);

  return (
    <View className="relative">
      <Icon name={"clipboard"} type={"feather"} size={25} color={color} />
      {/* {runningOrderInfos?.length > 0 && (
        <View className="absolute -top-2 -right-2">
          <Animated.View
            style={{
              width: 15,
              height: 15,
              borderRadius: 10000,
              backgroundColor: "#29ABE2",
              opacity: opacity,
            }}
          />
        </View>
      )} */}
    </View>
  );
};

export default OrdersIcon;
