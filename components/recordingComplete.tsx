import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

import useUser from "../hooks/useUser.hook";
import { RootStackParamList } from "../types";

import Button from "./ui/button";

const RecordingCompleteScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Recording Complete">) => {
  const { user, mutate } = useUser();

  const removeRecording = async () => {
    const recordings = user?.recordings ?? [];
    const filteredRecs = recordings.filter(
      (rec) => rec.id !== route.params.recordingId
    );

    await AsyncStorage.setItem(
      "User",
      JSON.stringify({ recordings: filteredRecs, username: user?.username })
    );

    mutate();
  };

  const handleDiscard = () => {
    removeRecording();
    navigation.navigate("Home");
  };

  const handleRetry = () => {
    removeRecording();
    navigation.navigate("New Recording");
  };

  const handleSave = () => navigation.push("Home");

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
            fontSize: 38,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Your moment to shine 😎🎤
        </Text>

        <Button onPress={handleDiscard} label="Discard" />
        <Button onPress={handleRetry} label="Retry" />
        <Button onPress={handleSave} label="Save" />
      </View>
    </View>
  );
};

export default RecordingCompleteScreen;
