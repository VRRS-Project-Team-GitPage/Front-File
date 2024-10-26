import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// component
import MainStartScrren from "./MainStartScreen";
import LoginScreen from "./LoginScreen"; // 실제 로그인 화면과 유사하게 구현해두었습니다

const Stack = createNativeStackNavigator();

export default function LoginTestStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={MainStartScrren}></Stack.Screen>
      <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
