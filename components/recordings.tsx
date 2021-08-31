import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

import useUser from "../hooks/useUser.hook";
import { RootStackParamList } from "../types";
import { formatDate, formatDuration } from "../utils/time";

import Button from "./ui/button";

export const RecordingsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  const { user } = useUser();

  const handleAddRecording = () => {
    navigation.navigate("New Recording");
  };

  if (!user)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

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
          🎙️ Recordings by {user.username}
        </Text>

        {user.recordings?.length === 0 ? (
          <Text
            style={{
              color: "white",
              fontSize: 28,
              marginVertical: 24,
              textAlign: "center",
            }}
          >
            No recordings yet!
          </Text>
        ) : (
          user.recordings?.map((r) => (
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginVertical: 12,
                textAlign: "center",
              }}
              key={r.id}
            >
              Recording of{" "}
              <Text style={{ fontWeight: "500" }}>
                {formatDuration(r.duration)}
              </Text>{" "}
              saved on {formatDate(r.endTime)}
            </Text>
          ))
        )}

        <Button onPress={handleAddRecording} label="Add recording" />
      </View>
    </View>
  );
};

export default RecordingsScreen;
