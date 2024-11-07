import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { submitFeedback } from "../../../assets/ServerDatas/ServerApi/dictionaryApi";

export default function User_Feedback({ navigation }) {
  useTabBarVisibility(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;
  // user의 정보를 불러옴
  const { jwt } = useUser();

  const [feedback, setFeedback] = useState("");
  const maxLength = 250;

  const handleSubmit = async () => {
    // 피드백이 비어있는지 확인
    if (!feedback.trim()) {
      showToast("피드백을 입력해 주세요."); // 피드백이 비어있을 때 토스트 메시지
      return; // 함수 종료
    }

    try {
      await submitFeedback("ECT", feedback, jwt);
      showToast("피드백이 제출되었습니다");
      navigation.goBack();
      console.log("제출된 피드백:", feedback);
      setFeedback(""); // 피드백 필드 초기화
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      Alert.alert("오류", "피드백 제출에 실패했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.goBack();
        }}
      ></Xheader>

      {/* 헤더 영역 */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>어떤 점이 불편하셨나요?</Text>
        <Text style={styles.subText}>
          어플에 오류가 있나요? 피드백을 남겨주세요.{"\n"}더 나은 서비스를
          제공하는 데 도움이 됩니다
        </Text>
      </View>

      {/* 피드백 입력 영역 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="오류 내용을 알려주세요."
          multiline={true}
          maxLength={maxLength}
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />

        {/* 글자 수 표시 */}
        <Text style={styles.charCount}>
          {feedback.length}/{maxLength}자
        </Text>
      </View>
      {/* 제출 버튼 */}
      <View style={{ ...styles.button, top: windowHeigh - 36 }}>
        <BtnC
          onPress={handleSubmit}
          style={{
            backgroundColor: feedback ? Main_theme.main_30 : Gray_theme.gray_40,
            borderColor: feedback ? Main_theme.main_30 : Gray_theme.gray_40,
          }}
        >
          제출하기
        </BtnC>
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
    marginTop: 32,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },

  headerText: {
    fontSize: 24,
    fontFamily: "Pretendard-SemiBold",
    marginBottom: 16,
  },
  subText: {
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_60,
  },
  textInput: {
    height: 130,
    color: Gray_theme.balck,
    backgroundColor: Gray_theme.gray_20,
    borderColor: Gray_theme.gray_40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_60,
  },
  button: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 24,
  },
});
