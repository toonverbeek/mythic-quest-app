import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};
const Button = ({ onPress, label }: Props) => {
  return (
    <TouchableOpacity
      style={{
        alignContent: "center",
        backgroundColor: "#831E2D",
        borderRadius: 8,
        marginVertical: 20,
        opacity: 1,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "500",
          padding: 12,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
