// home Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SearchScreen from "./SearchScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="MainSearch"
        component={SearchScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
