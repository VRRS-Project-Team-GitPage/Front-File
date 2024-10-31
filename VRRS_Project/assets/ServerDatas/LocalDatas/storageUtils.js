import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage가 초기화되었습니다.");
  } catch (error) {
    console.error("AsyncStorage 초기화 중 오류 발생:", error);
  }
};
