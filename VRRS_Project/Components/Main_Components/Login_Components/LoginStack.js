// Login Screen과 관련된 하위 페이지를 구현한 Component 입니다.
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainStartScrren from "./MainStartScreen";
import LoginScreen from "./LoginScreen";

import Find from "./FindScreen";
import FindID from "./FindID";
import FindIDr from "./FindIDResult";
import FindPW from "./FindPW";
import FindPWr1 from "./FindPWResult1";
import FindPWr2 from "./FindPWResult2";
import FindPWr3 from "./FindPWResult3";
import Join1 from "./Join1";
import Join2 from "./Join2";
import Join3 from "./Join3";
import Joinr from "./JoinResult";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen
        name="main"
        component={MainStartScrren}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}>
      </Stack.Screen>
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
