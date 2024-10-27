import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Component 관련
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// assets 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
// server 관련
import { submitFeedback } from "../../../assets/ServerDatas/ServerApi/dictionaryApi";
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function ReportScreen({ navigation }) {
  const { jwt } = useUser();
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const [reportText, setReportText] = useState("");

  const reportError = async () => {
    try {
      await submitFeedback("RD", reportText, jwt);
      showToast("피드백이 전송되었습니다");
      navigation.goBack();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      showToast("오류가 발생하였습니다");
    }
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
          <Text style={styles.headerText}>어떤 점이 잘못되었나요?</Text>
          <Text style={styles.headerSubText}>
            잘못 작성된 내용이 있나요? 피드백을 남겨주세요.
          </Text>
          <Text style={styles.headerSubText}>
            더 나은 서비스를 제공하는 데 도움이 됩니다 :{")"}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder="잘못 작성된 내용을 알려주세요"
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
        {reportText === "" ? (
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
