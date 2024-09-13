// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomSheetScreen from "./BottomSheetScreen";
import UseCamera from "./UseCamera";
import ReadingIngridientScreen from "./ReadIngridientScreen";
import ReadingResultScreen from "./ReadingResultScreen";

const Stack = createNativeStackNavigator();

export default function Readingtack() {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen
        name="BottomSheet"
        component={BottomSheetScreen}
      ></Stack.Screen>
      <Stack.Screen name="Camera" component={UseCamera}></Stack.Screen>
      <Stack.Screen
        name="IngridientScreen"
        component={ReadingIngridientScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Result"
        component={ReadingResultScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
