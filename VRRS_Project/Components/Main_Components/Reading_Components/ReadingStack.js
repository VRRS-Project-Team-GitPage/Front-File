// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReadingIngridientScreen from "./ReadIngridientScreen";

const Stack = createNativeStackNavigator();

export default function Readingtack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IngridientScreen"
        component={ReadingIngridientScreen}
        options={{ headerShown: false, presentation: "modal" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
