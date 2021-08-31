import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import useUser from "../hooks/useUser.hook";
import { Duration, RootStackParamList } from "../types";
import { formatDuration } from "../utils/time";

import Button from "./ui/button";

const NewRecordingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "New Recording">) => {
  const { user, mutate } = useUser();
  const [countdown, setCountdown] = useState(3);

  const [duration, setDuration] = useState<Duration>({
    minutes: 0,
    seconds: 0,
  });

  const startTime = new Date();

  const resetTimers = () => {
    setCountdown(3);
    setDuration({ minutes: 0, seconds: 0 });
  };

  // Handle countdown
  useFocusEffect(
    useCallback(() => {
      resetTimers();

      const runCountdown = async () => {
        for (let x = 3; x > 0; x--) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              setCountdown(x - 1);
              resolve();
            }, 1000);
          });
        }
      };

      runCountdown();
    }, [])
  );

  // Handle duration
  useFocusEffect(
    useCallback(() => {
      let minutes = 0;
      let seconds = 0;
      let isActive = false;

      const startRecording = async () => {
        isActive = true;

        while (isActive) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              setDuration({ minutes, seconds });
              resolve();
            }, 1000);

            if (seconds === 59) {
              minutes += 1;
              seconds = 0;
            } else {
              seconds++;
            }
          });
        }
      };

      if (countdown === 0 && !isActive) {
        startRecording();
      }

      // Cleanup
      return () => {
        isActive = false;
        isActive && resetTimers();
      };
    }, [countdown])
  );

  const handleStop = async () => {
    const rec = {
      duration,
      endTime: new Date(),
      id: user?.recordings?.length ?? 1,
      startTime,
    };

    const recs = user?.recordings ? [...user.recordings] : [];

    await AsyncStorage.setItem(
      "User",
      JSON.stringify({ recordings: [...recs, rec], username: user?.username })
    );

    mutate();
    navigation.navigate("Recording Complete", { recordingId: rec.id });
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
          Your moment to shine 😎🎤
        </Text>

        {countdown > 0 && (
          <Text
            style={{
              color: "white",
              fontSize: 38,
              fontWeight: "500",
              marginVertical: 40,
              textAlign: "center",
            }}
          >
            {countdown}
          </Text>
        )}

        {countdown === 0 && (
          <Text
            style={{
              color: "white",
              fontSize: 38,
              fontWeight: "500",
              marginVertical: 40,
              textAlign: "center",
            }}
          >
            {formatDuration(duration)}
          </Text>
        )}

        {countdown === 0 && <Button label={"Stop"} onPress={handleStop} />}
      </View>
    </View>
  );
};

export default NewRecordingScreen;
