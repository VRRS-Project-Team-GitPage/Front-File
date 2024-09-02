// Dictionary Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DicScreen from "./DicScreen";
import ProducInfotScreen from "./DicProductScreen";

const Stack = createNativeStackNavigator();

export default function DicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DicList"
        component={DicScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductInfo"
        component={ProducInfotScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
