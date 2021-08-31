import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";

import { User } from "../types";

const fetcher = () =>
  AsyncStorage.getItem("User").then((val) =>
    val !== null ? (JSON.parse(val) as User) : null
  );

const useUser = () => {
  const { data: user, mutate } = useSWR<User | null>("user", fetcher);

  return {
    mutate,
    user,
  };
};

export default useUser;
