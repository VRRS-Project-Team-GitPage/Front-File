import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FirstTab from "./FirstTab"; // 첫 번째 탭 화면
import SecondTab from "./SecondTab"; // 두 번째 탭 화면

const Tab = createMaterialTopTabNavigator();

export default function IngredientTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FirstTab"
        component={FirstTab}
        options={{ title: "섭취 가능" }}
      />
      <Tab.Screen
        name="SecondTab"
        component={SecondTab}
        options={{ title: "섭취 불가능" }}
      />
    </Tab.Navigator>
  );
}
