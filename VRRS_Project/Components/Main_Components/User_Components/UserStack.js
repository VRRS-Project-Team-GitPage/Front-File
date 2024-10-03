// User Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User_Main from "./UserScreen";
import User_Modify from "./User_ModifyScreen";
import User_Review from "./User_ReviewScreen";
import User_Dic from "./User_DicScreen";
import User_Feedback from "./User_Feedback";
import User_Logout from "./User_Logout";
import User_Withdrawal from "./User_Withdrawal";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User_Main"
        component={User_Main}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Modify"
        component={User_Modify}
       options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Review"
        component={User_Review}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Dic"
        component={User_Dic}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Feedback"
        component={User_Feedback}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Logout"
        component={User_Logout}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="User_Withdrawal"
        component={User_Withdrawal}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
