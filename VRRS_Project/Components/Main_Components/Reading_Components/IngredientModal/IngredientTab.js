import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { Gray_theme, Main_theme } from "../../../../assets/styles/Theme_Colors";

const Tab = createMaterialTopTabNavigator();

export default function IngredientTab({ consumables, nonConsumables }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Gray_theme.balck,
        tabBarInactiveTintColor: Gray_theme.gray_40,
      }}
    >
      <Tab.Screen
        name="FirstTab"
        component={FirstTab}
        initialParams={{ consumables }}
        options={{
          title: "섭취 가능",
          tabBarLabelStyle: {
            fontFamily: "Pretendard-SemiBold",
          },
          tabBarIndicatorStyle: {
            // 라벨바 스타일 지정
            height: 3,
            borderRadius: 30,
            backgroundColor: Main_theme.main_30,
          },

          tabBarPressColor: Gray_theme.white, // 터치 시 동작하는 라벨 애니메이션 색상
        }}
      />
      <Tab.Screen
        name="SecondTab"
        component={SecondTab}
        initialParams={{ nonConsumables }}
        options={{
          title: "섭취 불가능",

          tabBarLabelStyle: {
            fontFamily: "Pretendard-SemiBold",
          },
          tabBarIndicatorStyle: {
            // 라벨바 스타일 지정
            height: 3,
            borderRadius: 30,
            backgroundColor: Main_theme.main_reverse,
          },
          tabBarPressColor: Gray_theme.white, // 터치 시 동작하는 라벨 애니메이션 색상
        }}
      />
    </Tab.Navigator>
  );
}
