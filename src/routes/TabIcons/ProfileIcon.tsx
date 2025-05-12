import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { Icon } from "react-native-elements";
import { useNotifications } from "../../contexts/Notifications";

const ProfileIcon = ({ color, focused }: { color: string; focused: boolean }) => {
  const buttonScaleNotifications = useRef(new Animated.Value(0)).current;
  const { hasNotifications } = useNotifications();

  useEffect(() => {
    if (hasNotifications) {
      Animated.timing(buttonScaleNotifications, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonScaleNotifications, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [hasNotifications, buttonScaleNotifications]);

  return (
    <View className="relative">
      {!focused && (
        <View className="absolute -top-1 -right-0">
          <Animated.View
            style={{
              transform: [{ scale: buttonScaleNotifications }],
              width: 15,
              height: 15,
            }}
            className="bg-blue-baoo rounded-full "
          />
        </View>
      )}
      <Icon name={"person-outline"} type={"material"} size={30} color={color} />
    </View>
  );
};

export default ProfileIcon;
