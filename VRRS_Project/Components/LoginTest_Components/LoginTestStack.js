import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// component
import LoginScreen from "./LoginScreen"; // 로그인을 담당하는 화면입니다.

const Stack = createNativeStackNavigator();

export default function LoginTestStack() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
