export type RootStackParamList = {
  Home: undefined;
  "New Recording": undefined;
  "Recording Complete": { recordingId: Recording["id"] };
  Register: undefined;
};

export type User = {
  recordings: Recording[];
  username: string;
};

export type Duration = {
  minutes: number;
  seconds: number;
};

export type Recording = {
  duration: Duration;
  endTime: Date;
  id: number;
  startTime: Date;
};

export type UserUpdate = {
  recordings: User["recordings"];
  username: User["username"];
};
