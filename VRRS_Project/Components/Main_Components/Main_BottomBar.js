import { Image, StyleSheet } from "react-native";
import { useEffect } from "react";
// navigation 사용을 위한 Props import
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// navigation으로 연결할 Screen을 import
import UserScreen from "./User_Components/UserScreen";
// assests 사용을 위한 import
import BarIcons from "../../assets/Icons/BarIcons";
import { Gray_theme, Main_theme } from "../../assets/styles/Theme_Colors";
// stack 페이지들을 import
import HomeStack from "./Home_Components/HomeStack";
import DicStack from "./Dic_Components/DicStack";
import RecStsck from "./Recommend_Components/RecStack";
import Readingtack from "./Reading_Components/ReadingStack";
import UserStack from "./User_Components/UserStack";
import LoginStack from "./Login_Components/LoginStack";

// navigation Bar를 사용하기 위한 변수
const Tab = createBottomTabNavigator();
// Stack을 사용해 모달 관리
const Stack = createNativeStackNavigator();

export default function Main_BottomBar() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          position: "absolute",
        },
        // 특정 Screen에 해당하는 하단바가 선택되었을 때 요소의 색상입니다.
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
        name="HomeTab"
        component={HomeStack}
        // 하단바 선택 시 중첩 요소를 삭제
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
            navigation.navigate("HomeTab", { screen: "Home" });
          },
        })}
        options={{
          tabBarLabel: "홈", //화면에 표시될 텍스트
          // Screen의 헤더를 숨깁니다.
          headerShown: false,
          headerBackgroundContainerStyle: {
            backgroundColor: Main_theme.main_10,
          },
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
        name="DicTab"
        component={DicStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // 기본 동작 방지
            navigation.navigate("DicTab", {
              screen: "DicList",
            }),
              // Stack으로 값을 전달하며 navigate
              setTimeout(() => {
                navigation.navigate("DicTab", {
                  screen: "DicList",
                  params: { tabClicked: true },
                });
              }, 0);
          },
        })}
        options={{
          tabBarLabel: "사전", //화면에 표시될 텍스트
          // Screen의 헤더를 숨깁니다.
          headerShown: false,
          tabBarHideOnKeyboard: true,
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
        name="ReadTab"
        component={Readingtack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // 기본 동작 막기
            e.preventDefault();
            // BottomSheet 모달을 띄우기 위한 로직 실행
            navigation.navigate("ReadTab", { screen: "BottomSheet" });
          },
        })}
        options={{
          headerShown: false,
          tabBarIconStyle: {
            marginBottom: 36,
            borderBlockColor: Gray_theme.white,
          },
          tabBarIcon: () => {
            //화면에 표시될 아이콘
            return (
              <Image
                // 선택 여부에 따라 다른 이미지 출력
                source={BarIcons.readIcon}
                style={{
                  height: 72,
                  width: 72,
                }}
              ></Image>
            );
          },
          tabBarLabel: "",
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="RecoTab"
        component={RecStsck}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.navigate("RecoTab", {
              screen: "Rec_Main",
            });
            //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
          },
        })}
        options={{
          tabBarLabel: "추천", //화면에 표시될 텍스트
          headerShown: false,
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
        component={UserStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.navigate("User", {
              screen: "User_Main",
            });
            //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
          },
        })}
        // name="Login"
        // component={LoginStack}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     // Prevent default action
        //     e.preventDefault();
        //     // Do something with the `navigation` object
        //     navigation.navigate("Login", {
        //       screen: "Login_Main",
        //     });
        //     //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
        //   },
        // })}

        options={{
          headerShown: false,
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
  );
}

const styles = StyleSheet.create({
  homeScreen_header: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
  },
});
