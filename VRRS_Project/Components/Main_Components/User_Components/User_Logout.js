import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Octicons from "@expo/vector-icons/Octicons";

export default function User_Logout({ navigation }) {
  useTabBarVisibility(false);

  const [modalVisible, setModalVisible] = useState(false);

  // 네비게이션 리셋을 위한 함수
  const restart = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login_Main" }], // 초기 화면으로 이동할 경로 설정
    });
  };
  const handleLogout = async () => {
    setModalVisible(false);
    try {
      AsyncStorage.clear();
      restart();
      Alert.alert("로그아웃 완료", "로그아웃되었습니다.");
    } catch (error) {
      console.error("Error removing token:", error);
      Alert.alert("오류", "로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  const handleWithdrawal = () => {
    navigation.navigate("User_Withdrawal"); // 탈퇴하기 시 이동할 화면
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        로그아웃 및 탈퇴
      </BackHeader>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.menuText}>로그아웃</Text>
          <Octicons
            name="chevron-right"
            size={16}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleWithdrawal}>
          <Text style={styles.menuText}>탈퇴하기</Text>
          <Octicons
            name="chevron-right"
            size={16}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Octicons name="x" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>로그아웃 하시겠습니까?</Text>
            <View style={styles.button}>
              <Btn onPress={handleLogout}>확인</Btn>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  menuSection: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_20,
  },
  menuText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
  },
  icon: {
    marginLeft: "auto",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: Gray_theme.white,
    borderRadius: 10,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    width: "100%",
  },
});
