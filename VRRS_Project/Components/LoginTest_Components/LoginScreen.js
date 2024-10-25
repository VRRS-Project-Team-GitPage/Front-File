import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// component 관련
import BackHeader from "../../assets/styles/ReuseComponents/Header/BackHeader";
import Btn from "../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../assets/styles/ReuseComponents/showToast";
// design 관련
import { Gray_theme, Main_theme } from "../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../assets/Icons/MainIcons";
// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { loginUser } from "../../assets/ServerDatas/ServerApi/authApi";
import { useAuth } from "../../assets/ServerDatas/ReuseDatas/AuthProvider"; // 유저의 로그인 여부를 전역적으로 사용
import { useUser } from "../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  // TextInput에 들어갈 내용
  const [idText, setIdText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [visible, setVisible] = useState(false);

  // [ 유저의 로그인 정보를 저장하는 내용입니다 ]
  // 로그인 여부를 저장할 변수로 전역으로 관리합니다.
  const { isLogin, setIsLogin } = useAuth();

  // 로그인 여부를 저장할 함수입니다.
  const checkLogin = async () => {
    try {
      await AsyncStorage.setItem("isLogin", "true");
      showToast("로그인 되었습니다");
      setIsLogin(true);
    } catch (e) {
      showToast("로그인에 실패하였습니다");
    }
  };

  // [ 유저의 정보를 저장하는 내용입니다 ]
  const { signUpUser } = useUser();

  // 서버 연동에 필요한 내용
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginApi = async () => {
    setLoading(true);
    setError(null); // 에러 초기화

    try {
      const data = await loginUser(idText, passwordText);
      // 성공 시 처리 (예: 다른 화면으로 이동)
      await signUpUser(data);
      checkLogin();
    } catch (error) {
      setError(error.message); // 에러 메시지 설정
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        children={"로그인 하기"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.logoContainer}>
        <Image source={MainIcons.mainLogo} style={styles.mainLogo} />
      </View>
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <TextInput
            placeholder="아이디를 입력해주세요"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Gray_theme.gray_40}
            value={idText}
            onChangeText={(id) => setIdText(id)}
            style={styles.textInput}
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={visible ? false : true}
            autoCapitalize="none"
            placeholderTextColor={Gray_theme.gray_40}
            value={passwordText}
            onChangeText={(id) => setPasswordText(id)}
            style={styles.textInput}
          ></TextInput>
          <TouchableOpacity
            style={styles.passwordVisible}
            onPressIn={() => {
              setVisible(true);
            }}
            onPressOut={() => {
              setVisible(false);
            }}
          >
            {!visible ? (
              <Octicons
                name="eye-closed"
                size={20}
                color={Gray_theme.gray_40}
              />
            ) : (
              <Octicons name="eye" size={20} color={Gray_theme.gray_40} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View style={{ ...styles.buttonContainer, top: windowHeigh - 36 }}>
        {idText === "" || passwordText === "" ? (
          <Btn
            children={"로그인"}
            onPress={() => {
              showToast("모든 항목을 작성해주세요");
            }}
          ></Btn>
        ) : (
          <BtnC children={"로그인"} onPress={loginApi}></BtnC>
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
  contents: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  mainLogo: {
    width: 140,
    height: 140,
  },
  textInput: {
    // TextInput 디자인
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Gray_theme.gray_50,
    borderRadius: 8,
    // TextInput 내부 글씨
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Regular",
    color: Gray_theme.balck,
  },
  passwordVisible: {
    position: "absolute",
    right: 24,
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
});
