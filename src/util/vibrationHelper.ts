import { Vibration, Platform } from "react-native";

export const vibrate = (duration: number = 40) => {
  if (Platform.OS === "ios") {
    // iOS requires a pattern array
    Vibration.vibrate([0, duration]);
  } else {
    // Android accepts duration directly
    Vibration.vibrate(duration);
  }
};
