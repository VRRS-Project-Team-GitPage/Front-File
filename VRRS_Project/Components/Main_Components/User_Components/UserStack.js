// User Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User_Main from "./UserScreen";
import User_Update from "./User_UpdateScreen";
import User_Setting from "./User_setting";
import User_Review from "./User_ReviewScreen";
import User_Feedback from "./User_Feedback";
import User_Logout from "./User_Logout";
import User_Withdrawal from "./User_Withdrawal";
import Login_Main from "../Login_Components/LoginScreen";
import Login_Start from "../Login_Components/MainStartScreen";
import Any_Stack from "../Anywhere_Components/AnyStack"; //사전 페이지를 위함

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AnyStack" component={Any_Stack}></Stack.Screen>
      <Stack.Screen name="User_Main" component={User_Main}></Stack.Screen>
      <Stack.Screen name="User_Update" component={User_Update}></Stack.Screen>
      <Stack.Screen name="User_Setting" component={User_Setting}></Stack.Screen>
      <Stack.Screen name="User_Review" component={User_Review}></Stack.Screen>
      <Stack.Screen name="User_Feedback" component={User_Feedback}></Stack.Screen>
      <Stack.Screen name="User_Logout" component={User_Logout}></Stack.Screen>
      <Stack.Screen name="User_Withdrawal" component={User_Withdrawal}></Stack.Screen>
      <Stack.Screen name="Login_Main" component={Login_Main}></Stack.Screen>
      <Stack.Screen name="Login_Start" component={Login_Start}></Stack.Screen>

    </Stack.Navigator>
  );
}
