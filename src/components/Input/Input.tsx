import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "@/src/utils/styles";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
  password?: boolean;
  onChangeText: (text: string) => void;
};

const Input = ({ label, placeholder, value, required, password, onChangeText }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: colors.primary }}> *</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={"#fff"}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={password && !showPassword}
          autoCapitalize={password ? "none" : "sentences"}
        />
        {password && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    borderRadius: 5,
    padding: 12,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: colors.bgSecondary,
  },
  inputContainer: {
    position: "relative",
  },

  icon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
});

export default Input;
