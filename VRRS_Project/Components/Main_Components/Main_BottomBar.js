import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// navigation으로 연결할 Screen을 import
import HomeScreen from "./Home_Components/HomeScreen";
import DicScreen from "./Dic_Components/DicScreen";
import ReadingScreen from "./Reading_Components/ReadingScreen";
import RecommendScreen from "./Recommend_Components/RecommendScreen";
import UserScreen from "./User_Components/UserScreen";
import BarIcons from "../../assets/Icons/BarIcons";
import { Gray } from "../../assets/styles/Theme_Colors";

// navigation Bar를 사용하기 위한 변수
const Tab = createBottomTabNavigator();

export default function Main_BottomBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarLabelPosition: 4,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "홈", //화면에 표시될 텍스트
            tabBarIcon: ({ focused }) => {
              //화면에 표시될 아이콘
              return (
                <Image
                  // 선택 여부에 따라 다른 이미지 출력
                  source={focused ? BarIcons.homeIcon_C : BarIcons.homeIcon}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                ></Image>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen name="Dic" component={DicScreen}></Tab.Screen>
        <Tab.Screen name="Read" component={ReadingScreen}></Tab.Screen>
        <Tab.Screen name="Reco" component={RecommendScreen}></Tab.Screen>
        <Tab.Screen name="User" component={UserScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
