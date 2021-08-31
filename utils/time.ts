import { format } from "date-fns";

import { Duration } from "../types";

export const formatDuration = ({ minutes, seconds }: Duration) =>
  `${minutes.toString().padStart(2, "00")}:${seconds
    .toString()
    .padStart(2, "00")}`;

export const formatDate = (
  date: Date | string,
  dateFormat = "dd-MM-yyyy HH:mm:ss"
) => format(new Date(date), dateFormat);
