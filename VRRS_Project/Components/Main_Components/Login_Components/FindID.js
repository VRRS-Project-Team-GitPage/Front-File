import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

import { findidUser } from "../../../assets/ServerDatas/ServerApi/authApi";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

export default function FindID({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleFindID = async () => {
    if (email === "") {
      showToast("이메일을 입력해주새요");
      return;
    }
    try {
      const data = await findidUser(email); // findidUser 함수 호출 및 응답 대기

      navigation.navigate("FindIDr", { username: data.username, email: email });
    } catch (error) {
      // username 필드가 없는 경우 (ID 찾기 실패)
      navigation.navigate("FindIDr", { email: email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          아이디를 찾기 위해{"\n"}가입했던 이메일을 입력해주세요.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일 입력"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
            setIsEmailTouched(true);
          }}
          keyboardType="email-address"
          placeholderTextColor={Gray_theme.gray_40}
        />
        <View>
          {email !== "" && isEmailTouched && !isEmailValid ? (
            <Text style={styles.warningText}>
              유효한 이메일을 입력해주세요.
            </Text>
          ) : isEmailTouched && isEmailValid ? (
            <Text> </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <BtnC onPress={handleFindID}>확인</BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  titleContainer: {
    textAlign: "left",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  btnContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  title: {
    color: Gray_theme.balck,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_40,
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
  },
  warningText: {
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Main_theme.main_reverse,
    marginTop: 4,
    marginLeft: 4,
  },
});
