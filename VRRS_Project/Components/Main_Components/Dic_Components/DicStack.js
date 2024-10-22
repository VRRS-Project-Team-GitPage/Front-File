// Dictionary Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import DicScreen from "./DicScreen";
import DicScreenOwn from "./DicScreenown";
import ProducInfotScreen from "./DicProductScreen";
import ReportProScreen from "./ReportProScreen";
import DicProductReviewScreen from "./DicProductReviewScreen";

const Stack = createNativeStackNavigator();

export default function DicStack() {
  return (
    <Stack.Navigator initialRouteName="DicList">
      <Stack.Screen
        name="DicList"
        component={DicScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="OwnDic"
        component={DicScreenOwn}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductInfo"
        component={ProducInfotScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="reportPro"
        component={ReportProScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductReview"
        component={DicProductReviewScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
