import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Gray_theme, Main_theme } from "./assets/styles/Theme_Colors"; // 작성한 색상 코드를 import
import * as Font from "expo-font"; // custom font를 사용하기 위해 import
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications"; // Toast 라이브러리
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// 전역적으로 사용될 정보 import
import { UserProvider } from "./assets/ServerDatas/Users/UserContext"; //user 정보를 전역적으로 사용하기 위해 import
import { SearchProvider } from "./assets/ServerDatas/ReuseDatas/SearchContext";
// App의 흐름을 관리
import AuthProvider from "./assets/ServerDatas/ReuseDatas/AuthProvider"; // 로그인 여부를 전역적으로 사용하기 위해 import
import AuthNavigation from "./Components/AuthNavigation";

export default function App() {
  // 폰트 로드를 위한 state 변수
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 폰트를 로드하는 함수
  const loadFonts = async () => {
    await Font.loadAsync({
      // 따옴표로 작성된 변수명이 폰트 이름입니다.
      // Text style 지정 시 해당 변수명을 사용하여 작성해주세요.
      "Pretendard-Black": require("./assets/styles/Fonts/Pretendard-Black.ttf"),
      "Pretendard-ExtraBold": require("./assets/styles/Fonts/Pretendard-ExtraBold.ttf"),
      "Pretendard-Bold": require("./assets/styles/Fonts/Pretendard-Bold.ttf"),
      "Pretendard-SemiBold": require("./assets/styles/Fonts/Pretendard-SemiBold.ttf"),
      "Pretendard-Medium": require("./assets/styles/Fonts/Pretendard-Medium.ttf"),
      "Pretendard-Regular": require("./assets/styles/Fonts/Pretendard-Regular.ttf"),
      "Pretendard-Light": require("./assets/styles/Fonts/Pretendard-Light.ttf"),
      "Pretendard-ExtraLight": require("./assets/styles/Fonts/Pretendard-ExtraLight.ttf"),
      "Pretendard-Thin": require("./assets/styles/Fonts/Pretendard-Thin.ttf"),
    });
    setFontsLoaded(true); // 폰트 로드가 완료되면 상태를 변경
  };

  // 로컬 저장 내용을 초기화
  // 로컬에 저장된 내용을 삭제하고 싶을 때 사용하시면 됩니다. (그 외 사용 x)
  // useEffect 내부에 함수 선언하면 사용 가능합니다
  // 로컬 초기화 후 선언한 함수는 지워주세요
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage가 초기화되었습니다.");
    } catch (error) {
      console.error("AsyncStorage 초기화 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    loadFonts(); // 앱이 시작될 때 폰트를 로드
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Main_theme.main_30} />
      </View>
    ); // 폰트가 로드되기 전에는 아무것도 렌더링하지 않음
  }

  // 로그인 Stack을 Main_BottomBar 위에 작성 후 조건에 따라(어플 시용자가 로그인 한 경우)
  // 해당 Stack의 여부를 볼 수 있게 함
  return (
    <AuthProvider>
      <UserProvider>
        <SearchProvider>
          <ToastProvider>
            <NavigationContainer>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthNavigation />
              </GestureHandlerRootView>
            </NavigationContainer>
          </ToastProvider>
        </SearchProvider>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white, //이렇게 사용하실 수 있습니다.
  },
});
