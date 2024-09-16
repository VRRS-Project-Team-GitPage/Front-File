// Recommend Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomSheetScreen from "./BottomSheetScreen";
import UseCamera from "./UseCamera";
import UseImagePicker from "./UseImagePicker";
import ReadingIngridientScreen from "./ReadIngridientScreen";
import ReadingResultScreen from "./ReadingResultScreen";
import DicUploadScreen from "./DicUploadScreen";

const Stack = createNativeStackNavigator();

export default function Readingtack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomSheet"
        component={BottomSheetScreen}
        options={{
          presentation: "modal",
        }}
      ></Stack.Screen>
      <Stack.Screen name="Camera" component={UseCamera}></Stack.Screen>
      <Stack.Screen name="Image" component={UseImagePicker}></Stack.Screen>
      <Stack.Screen
        name="IngridientScreen"
        component={ReadingIngridientScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Result"
        component={ReadingResultScreen}
      ></Stack.Screen>
      <Stack.Screen name="Upload" component={DicUploadScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
