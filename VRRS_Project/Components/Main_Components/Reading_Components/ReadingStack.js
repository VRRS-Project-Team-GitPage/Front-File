// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomSheetScreen from "./BottomSheetScreen";
import useCamera from "./UseCamera";
import ReadingIngridientScreen from "./ReadIngridientScreen";

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
      <Stack.Screen name="Camera" component={useCamera}></Stack.Screen>
      <Stack.Screen
        name="IngridientScreen"
        component={ReadingIngridientScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
