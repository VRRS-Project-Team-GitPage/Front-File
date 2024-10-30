import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

import terms from "../../../assets/userinfoTerm";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Join1({ navigation }) {
  useTabBarVisibility(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const [allAgree, setAllAgree] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  //const [termsText, setTermsText] = useState(termsData.terms);
  const [termsText, setTermsText] = useState(terms);

  const handleConfirm = () => {
    // 모든 체크박스가 체크되었는지 확인
    if (termsAgree && privacyAgree) {
      navigation.navigate("Join2");
    } else {
      showToast("필수 항목에 모두 동의해 주세요.");
    }
  };

  const handleAllAgree = () => {
    const newState = !allAgree;
    setAllAgree(newState);
    setTermsAgree(newState);
    setPrivacyAgree(newState);
  };

  const toggleTermsAgree = () => {
    setTermsAgree((prev) => {
      const newState = !prev;
      if (newState && privacyAgree) {
        setAllAgree(true);
      } else {
        setAllAgree(false);
      }
      return newState;
    });
  };

  const togglePrivacyAgree = () => {
    setPrivacyAgree((prev) => {
      const newState = !prev;
      if (newState && termsAgree) {
        setAllAgree(true);
      } else {
        setAllAgree(false);
      }
      return newState;
    });
  };

  useEffect(() => {
    if (termsAgree && privacyAgree) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [termsAgree, privacyAgree]);

  // 이용 약관 텍스트 애니메이션
  const [showPolicy, setShowPolicy] = useState(false);
  const [showPolicy2, setShowPolicy2] = useState(false);

  const animationValue = useRef(new Animated.Value(0)).current;
  const animationValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: showPolicy ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showPolicy]);

  useEffect(() => {
    Animated.timing(animationValue2, {
      toValue: showPolicy2 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showPolicy2]);

  const agreementHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const agreementHeight2 = animationValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const togglePolicy = () => {
    setShowPolicy2(false);
    setShowPolicy(!showPolicy);
  };
  const togglePolicy2 = () => {
    setShowPolicy(false);
    setShowPolicy2(!showPolicy2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        회원가입하기
      </BackHeader>
      {/* 단계 섹션 */}
      <View style={styles.stepContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.stepHeader}>약관 동의</Text>
        </View>
        <View style={styles.stepIndicator1}>
          <MaterialCommunityIcons
            name="numeric-1-circle"
            size={24}
            color={Main_theme.main_50}
          />
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.gray_30}
          />
          <Octicons name="dot" size={24} color={Gray_theme.gray_30} />
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.gray_30}
          />
          <Octicons name="dot" size={24} color={Gray_theme.gray_30} />
        </View>
        <View style={styles.stepIndicator2}>
          <Text style={styles.stepText1}> 약관동의</Text>
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.white}
          />
          <Text style={styles.stepText2}>계정생성</Text>
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.white}
          />
          <Text style={styles.stepText2}>정보입력</Text>
        </View>
      </View>

      {/* 전체 동의 체크박스 */}
      <View style={styles.checkBoxAContainer}>
        <TouchableOpacity onPress={handleAllAgree} activeOpacity={0.8}>
          <View>
            <MaterialIcons
              name={allAgree ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={!allAgree ? Gray_theme.gray_40 : Main_theme.main_30}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            marginLeft: 12,
          }}
        >
          약관에 모두 동의합니다.
        </Text>
      </View>

      {/* 이용약관 동의 */}
      <View style={{ ...styles.checkBoxContainer, marginTop: 32 }}>
        <View style={styles.checkBoxLabel}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={toggleTermsAgree} activeOpacity={0.8}>
              <View>
                <MaterialIcons
                  name={termsAgree ? "check-box" : "check-box-outline-blank"}
                  size={24}
                  color={!termsAgree ? Gray_theme.gray_40 : Main_theme.main_30}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.checkBoxText}>
              이용약관 동의
              <Text style={{ color: "red", fontSize: 12 }}> (필수)</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={togglePolicy}>
            <Octicons
              name={showPolicy ? "triangle-up" : "triangle-down"}
              size={24}
              color={Gray_theme.gray_40}
            />
          </TouchableOpacity>
        </View>
        {showPolicy && (
          <Animated.View
            style={{ ...styles.agreementBox, height: agreementHeight }}
          >
            <ScrollView style={styles.agreementScroll}>
              <Text style={styles.tcontent}>
                제 1 장 총칙{"\n"}제 1 조 (목적){"\n"}본 약관은 신한대학교
                졸업프로젝트 4조(이하 “프로젝트”라 합니다)가 모바일 기기를 통해
                운영하는 애플리케이션 ‘채식어디’ (이하 “어플”이라 합니다)에서
                제공하는 모바일 서비스(이하 “서비스”라 한다)를 이용함에 있어
                서비스 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을
                규정함을 목적으로 합니다.
                {"\n"}
                {"\n"}제 2 조 (용어의 정의){"\n"}본 약관에서 사용하는 용어는
                다음과 같이 정의한다.
                {"\n"}1. “회원”이란 이 약관에 따라 이용계약을 체결하고,
                프로젝트가 제공하는 서비스를 이용하는 자를 의미합니다.
                {"\n"}2. “임시회원”이란 일부 정보만 제공하고 프로젝트가 제공하는
                서비스의 일부만 이용하는 자를 의미합니다.{" "}
              </Text>
              <Text style={styles.tbold}>
                * 본인은 신한대학교 졸업프로젝트 4조의 채식어디(모바일 서비스)를
                이용함에 있어 이용약관 동의에 관한 본 동의서의 내용을 충분히
                숙지하였으며, 이에 동의합니다. *{"\n"}
                {"\n"}
              </Text>
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* 개인정보 수집 동의 */}
      <View style={styles.checkBoxContainer}>
        <View style={styles.checkBoxLabel}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={togglePrivacyAgree}>
              <View>
                <MaterialIcons
                  name={privacyAgree ? "check-box" : "check-box-outline-blank"}
                  size={24}
                  color={privacyAgree ? Main_theme.main_30 : Gray_theme.gray_40}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.checkBoxText}>
              개인 정보 수집 및 처리 동의
              <Text style={{ color: "red", fontSize: 12 }}> (필수)</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={togglePolicy2}>
            <Octicons
              name={showPolicy2 ? "triangle-up" : "triangle-down"}
              size={24}
              color={Gray_theme.gray_40}
            />
          </TouchableOpacity>
        </View>

        {showPolicy2 && (
          <Animated.View
            style={{ ...styles.agreementBox, height: agreementHeight2 }}
          >
            <ScrollView style={styles.agreementScroll}>
              <Text style={styles.agreementText}>
                <Text style={styles.tbold}>{terms.tbold1}</Text>
                <Text style={styles.tcontent}>{terms.tcontent1}</Text>
                <Text style={styles.tbold}>{terms.tbold2}</Text>
                <Text style={styles.tcontent}>{terms.tcontent2}</Text>
                <Text style={styles.tbold}>{terms.tbold3}</Text>
                <Text style={styles.tcontent}>{terms.tcontent3}</Text>
                <Text style={styles.tline}>{terms.tline1}</Text>
                <Text style={styles.tcontent}>{terms.tcontent4}</Text>
                <Text style={styles.tline}>{terms.tline2}</Text>
                <Text style={styles.tcontent}>{terms.tcontent5}</Text>
                <Text style={styles.tline}>{terms.tline3}</Text>
                <Text style={styles.tcontent}>{terms.tcontent6}</Text>
                <Text style={styles.tbold}>{terms.tbold4}</Text>
                <Text style={styles.tcontent}>{terms.tcontent7}</Text>
                <Text style={styles.tline}>{terms.tline4}</Text>
                <Text style={styles.tcontent}>{terms.tcontent8}</Text>
                <Text style={styles.tline}>{terms.tline5}</Text>
                <Text style={styles.tcontent}>{terms.tcontent9}</Text>
                <Text style={styles.tline}>{terms.tline6}</Text>
                <Text style={styles.tcontent}>{terms.tcontent10}</Text>
                <Text style={styles.tline}>{terms.tline7}</Text>
                <Text style={styles.tcontent}>{terms.tcontent11}</Text>
                <Text style={styles.tbold}>{terms.tbold5}</Text>
                {/* {termsText} */}
              </Text>
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* 다음 버튼 */}
      <View style={styles.button}>
        <BtnC onPress={handleConfirm}>다음</BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  stepContainer: {
    paddingBottom: 24,
  },
  stepHeader: {
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  stepIndicator1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 80,
    marginTop: 20,
  },
  stepIndicator2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 72,
  },
  stepText1: {
    fontSize: 14,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
  },
  stepText2: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: Gray_theme.gray_30,
  },

  // 전체 동의
  checkBoxAContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Gray_theme.gray_20,
    marginHorizontal: 16,
    paddingHorizontal: 10,
  },
  checkBoxContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  checkBoxLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  checkBoxText: {
    fontFamily: "Pretendard-Medium",
    marginLeft: 8,
  },
  agreementBox: {
    borderWidth: 1,
    borderColor: Gray_theme.gray_30,
    borderRadius: 3,
    height: 120,
  },
  agreementScroll: {
    padding: 24,
  },
  agreementText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: Gray_theme.balck,
  },
  button: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 24,
  },

  //약관 text효과
  tbold: {
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  tline: {
    textDecorationLine: "underline",
    fontSize: 16,
    color: Gray_theme.balck,
  },
  tcontent: {
    fontFamily: "Pretendard-Regular",
    color: Gray_theme.balck,
  },
});
