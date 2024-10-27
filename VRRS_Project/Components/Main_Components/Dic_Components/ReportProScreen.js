import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Component 관련
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// assets 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
// data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
// server 관련
import { submitFeedback } from "../../../assets/ServerDatas/ServerApi/dictionaryApi";

export default function ReportProScreen({ navigation }) {
  // user의 정보를 불러옴
  const { jwt } = useUser();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const [reportText, setReportText] = useState("");

  const reportError = async () => {
    try {
      await submitFeedback(feedbackType, reportText, jwt);
      showToast("피드백이 전송되었습니다");
      navigation.goBack();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      showToast("오류가 발생하였습니다");
    }
  };

  const [duplication, setDuplication] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");

  handleDupli = () => {
    setDuplication(true);
    setIncorrect(false);
    setFeedbackType("DUP");
  };

  handleInCorrect = () => {
    setDuplication(false);
    setIncorrect(true);
    setFeedbackType("ERR");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.goBack();
        }}
      ></Xheader>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>오류 제보하기</Text>
          <View style={styles.typeBtnContainer}>
            <TouchableOpacity
              style={{
                ...styles.typeBtn,
                borderColor: duplication
                  ? Main_theme.main_30
                  : Gray_theme.gray_20,
                backgroundColor: duplication
                  ? Gray_theme.white
                  : Gray_theme.gray_20,
              }}
              activeOpacity={0.8}
              onPress={handleDupli}
            >
              <Text
                style={{
                  ...styles.typeBtnText,
                  color: duplication ? Main_theme.main_30 : Gray_theme.gray_40,
                }}
              >
                중복된 제품
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.typeBtn,
                borderColor: incorrect
                  ? Main_theme.main_30
                  : Gray_theme.gray_20,
                backgroundColor: incorrect
                  ? Gray_theme.white
                  : Gray_theme.gray_20,
              }}
              activeOpacity={0.8}
              onPress={handleInCorrect}
            >
              <Text
                style={{
                  ...styles.typeBtnText,
                  color: incorrect ? Main_theme.main_30 : Gray_theme.gray_40,
                }}
              >
                잘못된 제품
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder="오류에 대한 상세 정보를 작성해주세요."
            onChangeText={(text) => setReportText(text)}
            value={reportText}
            multiline={true}
            maxLength={150}
            style={{
              width: "100%",
              backgroundColor: reportText ? Gray_theme.gray_20 : null,
              borderColor: reportText ? Gray_theme.gray_80 : Gray_theme.gray_50,
              borderWidth: 1,
              ...styles.textInput,
            }}
          />
          <View style={styles.inputLength}>
            <Text
              style={{
                ...styles.inputLengthText,
                color:
                  reportText.length !== 150
                    ? Gray_theme.gray_60
                    : Main_theme.main_reverse,
              }}
            >
              {reportText.length}
            </Text>
            <Text
              style={{ ...styles.inputLengthText, color: Gray_theme.gray_60 }}
            >
              /150
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.btnC, top: windowHeigh - 48 }}>
        {!(duplication || incorrect) || reportText === "" ? (
          <Btn
            onPress={() => {
              showToast("작성 후 완료를 눌러주세요");
            }}
          >
            제출하기
          </Btn>
        ) : (
          <BtnC onPress={reportError}>제출하기</BtnC>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  content: {},
  header: { paddingHorizontal: 24, marginVertical: 32 },
  headerText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
    color: Gray_theme.balck,
    marginBottom: 16,
  },
  typeBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 25,
    marginRight: 12,
  },
  typeBtnText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
    fontSize: 12,
  },
  headerSubText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_80,
  },
  textInput: {
    height: 170,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    alignItems: "flex-start",
  },
  inputLength: {
    flexDirection: "row",
    marginTop: 4,
    alignSelf: "flex-end",
    marginRight: 12,
  },
  inputLengthText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
  },
  btnC: {
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
});
