import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function User_Feedback({ navigation }) {
  useTabBarVisibility(false);
  const [feedback, setFeedback] = useState('');
  const maxLength = 250;

  const handleSubmit = () => {
    // 제출 버튼 클릭 시 실행할 로직
    console.log('제출된 피드백:', feedback);
    alert("제출되었습니다.\n소중한 의견 감사합니다." );
    setFeedback('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.goBack();
        }}
      >
      </Xheader>

      {/* 헤더 영역 */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>어떤 점이 불편하셨나요?</Text>
        <Text style={styles.subText}>
          어플에 오류가 있나요? 피드백을 남겨주세요.{'\n'}
          더 나은 서비스를 제공하는 데 도움이 됩니다
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
        <Text style={styles.charCount}>{feedback.length}/{maxLength}자</Text>
      </View>
      {/* 제출 버튼 */}
      <View style={styles.button}>
        <BtnC onPress={handleSubmit}>제출하기</BtnC>
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
    marginTop:32,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginTop:32,
    paddingHorizontal: 16,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'Pretendard-Semibold',
    marginBottom: 16,
  },
  subText: {
    fontSize: 12,
    fontWeight: 'Pretendard-Medium',
    color: Gray_theme.gray_60,
  },
  textInput: {
    height: 130,
    color:Gray_theme.balck,
    backgroundColor: Gray_theme.gray_20,
    borderColor: Gray_theme.gray_40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontWeight: 'Pretendard-Medium',
    color: Gray_theme.gray_60,
  },
  button: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 16,
  },
});
