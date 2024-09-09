// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecommendScreen from "./RecommendScreen";
import Rec_SearchScreen from "./Rec_SearchScreen";
import Rec_CateScreen from "./Rec_CateScreen";
import Rec_ResultScreen from "./Rec_ResultScreen";

const Stack = createNativeStackNavigator();

export default function DicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rec_Main"
        component={RecommendScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Rec_Search"
        component={Rec_SearchScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Rec_Cate"
        component={Rec_CateScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Rec_Result"
        component={Rec_ResultScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
