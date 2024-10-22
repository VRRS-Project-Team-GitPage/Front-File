import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import MainIcons from "../../../assets/Icons/MainIcons";

import Octicons from '@expo/vector-icons/Octicons';

// Server data를 사용하기 위해 저장한 component들을 import(현재는 더미 데이터를 사용)
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function UserScreen({ navigation }) {
  // 사용자 정보
  const { user, name, vegTypeName } = useUser();
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >내 정보
      </BackHeader>
      {/* 상단 섹션 - 사용자 이름 및 채식 유형 */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>
          <Text style={styles.username}>{name || "이름이 없습니다."}</Text> 님, 안녕하세요!
        </Text>
        <TouchableOpacity style={styles.vegTypeBox}
          onPress={() => {
            navigation.navigate("User_Modify");
          }}>
          
          <Image source={MainIcons.user_profile} style={{ width: 72, height: 72 }} />
          <View style={styles.vegTypeText}>
            <Text style={styles.vegTypeLabel}>나의 채식 유형은...</Text>
            <Text style={styles.vegType}>{vegTypeName}</Text>
          </View>
          <Octicons name="chevron-right" size={16} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 활동 섹션 - 내 후기 및 사진 등록 */}
      <View style={styles.activityContainer}>
        <Text style={styles.titleText}> 내 활동 </Text>
        <View style={styles.activityBox}>
          <TouchableOpacity style={styles.activity}
            onPress={() => {
              navigation.navigate("User_Review");
            }}>
            <Image source={MainIcons.review} style={{ width: 41.25, height: 52.5 }} />
            <Text style={styles.activityText}>내 후기</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 48, fontFamily: "Pretendard-Regular", color: Gray_theme.gray_20 }}>|</Text>
          <TouchableOpacity style={styles.activity}
            onPress={() => {
              navigation.navigate("User_Dic");
            }}>
            <Image source={MainIcons.udictionary} style={{ width: 56, height: 45.88 }} />
            <Text style={styles.activityText}>내 사전</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.spaceContainer}>
        {/* 공백 공간입니다. */}
      </View>

      {/* 하단 메뉴 섹션 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}
          onPress={() => {
            navigation.navigate("User_Feedback");
          }}>
          <Text style={styles.menuText}>오류 제보하기</Text>
          <Octicons name="chevron-right" size={16} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}
        onPress={() => {
          navigation.navigate("User_Logout");
        }}>
          <Text style={styles.menuText}>로그아웃 및 탈퇴하기</Text>
          <Octicons name="chevron-right" size={16} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  headerContainer: {
    //flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_30,
    //paddingHorizontal: 16,
    paddingVertical: 24,
    marginHorizontal: 16,
  },
  activityContainer: {
    //flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  spaceContainer: {
    borderTopWidth: 48,
    borderTopColor: Gray_theme.gray_20,
  },
  menuContainer: {
    //flex: 1,
    paddingHorizontal: 16,
  },

  greetingText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.balck,
    marginBottom: 24,
    paddingLeft:8,
  },
  username: {
    fontSize: 20,
    fontFamily: "Pretendard-ExtraBold",
    color: Main_theme.main_30,
    marginBottom: 24,
  },
  vegTypeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  vegTypeText: {
    flexDirection: 'column',
    marginLeft: 16,
  },
  vegTypeLabel: {
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_60,
    paddingBottom: 4,
  },
  vegType: {
    fontSize: 20,
    fontFamily: "Pretendard-Bold",
    color: Gray_theme.balck,
  },
  icon: {
    marginLeft: 'auto',
    paddingRight: 8,
  },

  titleText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: Gray_theme.balck,
    marginBottom: 24,
  },
  activityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activity: {
    alignItems: 'center',
  },
  activityText: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
    marginTop: 8,
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_30,
  },
  menuText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    paddingLeft: 8,
  },
});
