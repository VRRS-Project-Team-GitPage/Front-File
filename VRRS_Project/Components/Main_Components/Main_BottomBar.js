import { Image, StyleSheet } from "react-native";
// navigation 사용을 위한 Props import
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// navigation으로 연결할 Screen을 import
import UserScreen from "./User_Components/UserScreen";
import ReadingScreen from "./Reading_Components/BottomSheetScreen";
// assests 사용을 위한 import
import BarIcons from "../../assets/Icons/BarIcons";
import { Gray_theme, Main_theme } from "../../assets/styles/Theme_Colors";
// stack 페이지들을 import
import HomeStack from "./Home_Components/HomeStack";
import DicStack from "./Dic_Components/DicStack";
import RecStsck from "./Recommend_Components/RecStack";
import BottomSheetScreen from "./Reading_Components/BottomSheetScreen";

// navigation Bar를 사용하기 위한 변수
const Tab = createBottomTabNavigator();
// Stack을 사용해 모달 관리
const Stack = createNativeStackNavigator();

function ReadingModal() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "transparentModal", // 모달을 투명하게 설정
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" }, // 모달의 배경을 투명하게 설정
      }}
    >
      <Stack.Screen name="Reading" component={BottomSheetScreen} />
    </Stack.Navigator>
  );
}

export default function Main_BottomBar() {
  return (
    <NavigationContainer>
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

              // Do something with the `navigation` object
              navigation.navigate("Home");
              //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
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
              // Prevent default action
              e.preventDefault();
              // Do something with the `navigation` object
              navigation.navigate("DicTab", {
                screen: "DicList",
              });
              //클릭 시 해당 페이지로 이동가능, 아래에 있던 탭이 사라지게 가능하다.
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
          component={ReadingModal}
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

const styles = StyleSheet.create({
  homeScreen_header: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
  },
});
