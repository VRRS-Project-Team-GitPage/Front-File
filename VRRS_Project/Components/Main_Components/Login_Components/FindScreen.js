import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FindID from '../Login_Components/FindID';
import FindPW from '../Login_Components/FindPW';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
// createMaterialTopTabNavigator 오류창 숨기기
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: A props object containing a "key" prop is being spread into JSX']);

const Tab = createMaterialTopTabNavigator();
export default function FindScreen({ navigation, route }) {
   useTabBarVisibility(false);

    const [currentTab, setCurrentTab] = useState('아이디 찾기');

    return (
      <SafeAreaView style={styles.container}>
        <BackHeader onPress={() => navigation.goBack()}>{currentTab}</BackHeader>

        <Tab.Navigator
          initialRouteName={route.params?.initial || 'FindID'}  // 여기서 초기 화면 설정
          screenOptions={{
            tabBarStyle: { backgroundColor: Gray_theme.white },
            tabBarIndicatorStyle: { backgroundColor: Main_theme.main_30 },
          }}
          screenListeners={{
            state: (e) => {
              const routeName = e.data.state.routes[e.data.state.index].name;
              setCurrentTab(routeName === 'FindID' ? '아이디 찾기' : '비밀번호 찾기');
            },
          }}
        >
          <Tab.Screen
            name="FindID"
            component={FindID}
            options={{
              tabBarLabel: '아이디 찾기',
              tabBarLabelStyle: { fontFamily: "Pretendard-SemiBold", fontSize: 16 },
            }}
          />
          <Tab.Screen
            name="FindPW"
            component={FindPW}
            options={{
              tabBarLabel: '비밀번호 찾기',
              tabBarLabelStyle: { fontFamily: "Pretendard-SemiBold", fontSize: 16 },
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
      },
});
