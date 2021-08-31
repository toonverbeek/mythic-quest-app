/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import useUser from "../hooks/useUser.hook";
import { RootStackParamList } from "../types";

import Button from "./ui/button";

export const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const [username, setUsername] = useState("Toon");
  const { mutate } = useUser();

  const handleRegister = async () => {
    await AsyncStorage.setItem(
      "User",
      JSON.stringify({ recordings: [], username })
    );

    mutate();
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#E22F41",
        display: "flex",
        height: "100%",
        paddingVertical: 100,
      }}
    >
      <View
        style={{
          marginHorizontal: "auto",
          width: "75%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 43,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Hi there 👋
        </Text>

        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 4,
            fontSize: 20,
            marginVertical: 32,
            padding: 12,
          }}
          placeholder="Your name"
          onChangeText={(text) => setUsername(text)}
          defaultValue={username}
        />

        <Button
          onPress={() =>
            username ? handleRegister() : alert("Please enter your name")
          }
          label="Register"
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
