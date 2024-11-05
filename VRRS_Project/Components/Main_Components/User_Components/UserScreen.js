import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import MainIcons from "../../../assets/Icons/MainIcons";

import Octicons from "@expo/vector-icons/Octicons";
import Line from "../../../assets/styles/ReuseComponents/LineComponent";

// Server data
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function UserScreen({ navigation }) {
  // 사용자 정보
  const { user, name, vegTypeName } = useUser();

  useEffect(() => {
    // 네비게이션이 이동할 때 상태를 초기화하는 코드
    const unsubscribe = navigation.addListener('focus', () => {
      // 상태 초기화 로직 (예: 입력 필드 초기화 등)
      // 예: setUsername('');
      // 예: setPassword('');
    });

    return unsubscribe; // 컴포넌트 언마운트 시 리스너 정리
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>

      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >내 정보
      </BackHeader>
      <TouchableOpacity
        style={{
          position: "absolute",
          right:"8%",
          top: '7.4%',
        }}
        onPress={() => {
          navigation.navigate("User_Setting");
        }}
      >
        <Octicons name="info" size={18} color="gray" />
      </TouchableOpacity>
      {/* 상단 섹션 - 사용자 이름 및 채식 유형 */}
      <View style={styles.headerContainer}>
        <View style={styles.mainTitle}>
          <Text style={styles.greetingText}>
            <Text style={styles.username}>{name || "이름이 없습니다."}</Text>{" "}
            님, 안녕하세요!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.vegTypeBox}
          onPress={() => {
            navigation.navigate("User_Update");
          }}
          activeOpacity={0.8}
        >
          <Image
            source={MainIcons.user_profile}
            style={{ width: 72, height: 72 }}
          />
          <View style={styles.vegTypeText}>
            <Text style={styles.vegTypeLabel}>나의 채식 유형은...</Text>
            <Text style={styles.vegType}>{vegTypeName}</Text>
          </View>
          <Octicons
            name="chevron-right"
            size={16}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* 활동 섹션 - 내 후기 및 사진 등록 */}
      <View style={styles.activityContainer}>
        <Text style={styles.titleText}> 내 활동 </Text>
        <View style={styles.activityBox}>
          <TouchableOpacity
            style={styles.activity}
            onPress={() => {
              navigation.navigate("User_Review");
            }}
          >
            <Image
              source={MainIcons.review}
              style={{ width: 72, height: 72 }}
            />
            <Text style={styles.activityText}>내 후기</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 48,
              fontFamily: "Pretendard-Regular",
              color: Gray_theme.gray_20,
            }}
          >
            |
          </Text>
          <TouchableOpacity
            style={styles.activity}
            onPress={() => {
              navigation.push("AnyStack", {
                screen: "MyDic",
              });
            }}
          >
            
            <Image
              source={MainIcons.udictionary}
              style={{ width: 72, height: 72 }}
            />
            <Text style={styles.activityText}>내 사전</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Line />

      {/* 하단 메뉴 섹션 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("User_Feedback");
          }}
        >
          <Text style={styles.menuText}>오류 제보하기</Text>
          <Octicons
            name="chevron-right"
            size={24}
            color={Gray_theme.gray_90}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("User_Logout");
          }}
        >
          <Text style={styles.menuText}>로그아웃 및 탈퇴하기</Text>
          <Octicons
            name="chevron-right"
            size={24}
            color={Gray_theme.gray_90}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  headerContainer: {
    //flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_20,
    //paddingHorizontal: 16,
    paddingVertical: 24,
  },
  mainTitle: {
    paddingHorizontal: 24,
  },
  vegTypeBox: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  spaceContainer: {
    borderTopWidth: 48,
    borderTopColor: Gray_theme.gray_20,
  },
  menuContainer: {
    //flex: 1,
    //paddingHorizontal: 16,
  },

  greetingText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.balck,
    marginBottom: 24,
    paddingLeft: 8,
  },
  username: {
    fontSize: 20,
    fontFamily: "Pretendard-ExtraBold",
    color: Main_theme.main_30,
    marginBottom: 24,
  },
  vegTypeText: {
    flexDirection: "column",
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
  activityContainer: {
    //flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: Gray_theme.balck,
    marginBottom: 24,
  },
  activityBox: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  activity: {
    alignItems: "center",
  },
  activityText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    marginTop: 8,
    color: Gray_theme.gray_80,
  },

  menuItem: {
    height: 60,
    flexDirection: "row",
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_20,
    alignItems: "center",
  },
  menuText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  icon: {
    marginLeft: "auto",
  },
});
