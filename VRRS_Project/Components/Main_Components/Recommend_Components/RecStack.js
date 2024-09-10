// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecommendScreen from "./RecommendScreen";
import Rec_KeywordScreen from "./Rec_KeywordScreen";
import Rec_CateScreen from "./Rec_CateScreen";
import Rec_KeyResultScreen from "./Rec_KeyResultScreen";
import Rec_CateResultScreen from "./Rec_CateResultScreen";

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
        name="Rec_Key"
        component={Rec_KeywordScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Rec_Cate"
        component={Rec_CateScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Key_Result"
        component={Rec_KeyResultScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Cate_Result"
        component={Rec_CateResultScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
