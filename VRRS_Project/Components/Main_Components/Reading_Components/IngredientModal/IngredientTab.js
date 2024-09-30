import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { Gray_theme, Main_theme } from "../../../../assets/styles/Theme_Colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Tab = createMaterialTopTabNavigator();

export default function IngredientTab({ ingredientText }) {
  return (
    <Tab.Navigator
      screenOption={{
        tabBarActiveTintColor: {
          color: Gray_theme.balck,
        },
        tabBarInactiveTintColor: {
          color: Gray_theme.gray_40,
        },
      }}
    >
      <Tab.Screen
        name="FirstTab"
        component={FirstTab}
        initialParams={{ ingredientText }}
        options={{
          title: "섭취 가능",

          tabBarLabelStyle: {
            ...styles.labelFont,
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
        initialParams={{ ingredientText }}
        options={{
          title: "섭취 불가능",

          tabBarLabelStyle: {
            ...styles.labelFont,
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

const styles = StyleSheet.create({
  labelFont: {
    fontFamily: "Pretendard-SemiBold",
  },
});
