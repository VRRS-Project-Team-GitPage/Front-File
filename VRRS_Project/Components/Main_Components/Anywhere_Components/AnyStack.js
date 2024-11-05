// User Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyDic from "./MyDicScreen";
import ProInfo from "./ProductInfo";

const Stack = createNativeStackNavigator();

export default function Any_Stack() {
  return (
    <Stack.Navigator
      initialRouteName="My"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MyDic"
        component={MyDic}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductInfo"
        component={ProInfo}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
