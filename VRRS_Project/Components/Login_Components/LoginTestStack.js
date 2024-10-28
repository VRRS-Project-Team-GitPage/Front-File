import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// component
import MainStartScrren from "../Main_Components/Login_Components/MainStartScreen";
import LoginScreen from "../Main_Components/Login_Components/LoginScreen"; // 실제 로그인 화면과 유사하게 구현해두었습니다
// subcomponent
import Find from "../Main_Components/Login_Components/FindScreen";
import FindID from "../Main_Components/Login_Components/FindID";
import FindIDr from "../Main_Components/Login_Components/FindIDResult";
import FindPW from "../Main_Components/Login_Components/FindPW";
import FindPWr1 from "../Main_Components/Login_Components/FindPWResult1";
import FindPWr2 from "../Main_Components/Login_Components/FindPWResult2";
import FindPWr3 from "../Main_Components/Login_Components/FindPWResult3";
import Join1 from "../Main_Components/Login_Components/Join1";
import Join2 from "../Main_Components/Login_Components/Join2";
import Join3 from "../Main_Components/Login_Components/Join3";
import Joinr from "../Main_Components/Login_Components/JoinResult";

const Stack = createNativeStackNavigator();

export default function LoginTestStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={MainStartScrren}></Stack.Screen>
      <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name="Find"
        component={Find}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindID"
        component={FindID}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindIDr"
        component={FindIDr}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindPW"
        component={FindPW}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindPWr1"
        component={FindPWr1}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindPWr2"
        component={FindPWr2}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FindPWr3"
        component={FindPWr3}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Join1"
        component={Join1}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Join2"
        component={Join2}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Join3"
        component={Join3}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Joinr"
        component={Joinr}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
