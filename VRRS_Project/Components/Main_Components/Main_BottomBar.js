import { Text, View, Image } from "react-native";
// navigation 사용을 위한 Props import
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// navigation으로 연결할 Screen을 import
import HomeScreen from "./Home_Components/HomeScreen";
import DicScreen from "./Dic_Components/DicScreen";
import ReadingScreen from "./Reading_Components/ReadingScreen";
import RecommendScreen from "./Recommend_Components/RecommendScreen";
import UserScreen from "./User_Components/UserScreen";
import BarIcons from "../../assets/Icons/BarIcons";
import { Gray_theme, Main_theme } from "../../assets/styles/Theme_Colors";

// navigation Bar를 사용하기 위한 변수
const Tab = createBottomTabNavigator();

export default function Main_BottomBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 60,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            position: "absolute",
          },
          tabBarActiveTintColor: Main_theme.main_30,
          tabBarInactiveTintColor: Gray_theme.gray_30,
          tabBarLabelStyle: {
            fontFamily: "Pretendard-SemiBold",
            fontSize: 10,
            marginTop: -8,
            includeFontPadding: false, // 아이콘과 라벨 간 패딩 여부에 대한 option 입니다.
            marginBottom: 8,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "홈", //화면에 표시될 텍스트
            tabBarIcon: ({ focused, color }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={!focused ? BarIcons.homeIcon : BarIcons.homeIcon_C}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? color : color,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Dic"
          component={DicScreen}
          options={{
            tabBarLabel: "사전", //화면에 표시될 텍스트
            tabBarIcon: ({ focused, color }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={!focused ? BarIcons.dicIcon : BarIcons.dicIcon_C}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? color : color,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Read"
          component={ReadingScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={BarIcons.readIcon}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? color : color,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Reco"
          component={RecommendScreen}
          options={{
            tabBarLabel: "추천", //화면에 표시될 텍스트
            tabBarIcon: ({ focused, color }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={!focused ? BarIcons.recommend : BarIcons.recommed_C}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? color : color,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarLabel: "내 정보", //화면에 표시될 텍스트
            tabBarIcon: ({ focused, color }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={!focused ? BarIcons.user : BarIcons.user_C}
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? color : color,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
