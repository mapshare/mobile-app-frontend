import { Platform } from "react-native";

const constants = {
  IS_ENV_DEVELOPMENT: __DEV__,
  IS_IOS: Platform.OS === "ios",
  IS_ANDROID: Platform.OS === "android",
  IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent)
};

export default constants;