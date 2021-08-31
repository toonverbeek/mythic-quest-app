import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import NewRecordingScreen from "./components/newRecording";
import RecordingCompleteScreen from "./components/recordingComplete";
import RecordingsScreen from "./components/recordings";
import RegisterScreen from "./components/register";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={RecordingsScreen}
        />

        <Stack.Screen
          name="New Recording"
          options={{ headerShown: false }}
          component={NewRecordingScreen}
        />

        <Stack.Screen
          name="Recording Complete"
          options={{ headerShown: false }}
          component={RecordingCompleteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
