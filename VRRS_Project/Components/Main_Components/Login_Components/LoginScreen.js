import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import MainIcons from "../../../assets/Icons/MainIcons";

import Octicons from "@expo/vector-icons/Octicons";
// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { loginUser } from "../../../assets/ServerDatas/ServerApi/authApi";
import { useAuth } from "../../../assets/ServerDatas/ReuseDatas/AuthProvider"; // 유저의 로그인 여부를 전역적으로 사용
import { useUser } from "../../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

export default function LoginScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;
  useTabBarVisibility(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

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
      await signUpUser(data);
      checkLogin();
    } catch (error) {
      setError(error.message); // 에러 메시지 설정
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, ...styles.container }}>
      <View style={styles.logoContainer}>
        <Image
          source={MainIcons.mainLogo}
          style={{
            width: 136,
            height: 136,
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <View style={styles.icon}>
            <Octicons name="person" size={18} color={Gray_theme.gray_40} />
          </View>
          <TextInput
            value={idText}
            onChangeText={(id) => setIdText(id)}
            placeholder="아이디를 입력해주세요"
            style={styles.inputText}
            placeholderTextColor={Gray_theme.gray_40}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.input}>
          <View>
            <View style={styles.icon}>
              <Octicons name="lock" size={18} color={Gray_theme.gray_40} />
            </View>
            <TextInput
              value={passwordText}
              //onChangeText={setPasswordText}
              onChangeText={(id) => setPasswordText(id)}
              placeholder="비밀번호를 입력해주세요"
              style={styles.inputText}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor={Gray_theme.gray_40}
              autoCapitalize="none"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.icon2}
              onPress={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <Octicons name="eye" size={18} color={Gray_theme.gray_40} />
              ) : (
                <Octicons
                  name="eye-closed"
                  size={18}
                  color={Gray_theme.gray_40}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.componentContainer}>
        <View style={styles.find}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Find", { initial: "FindID" })}
          >
            <Text style={styles.findText}>아이디 찾기 | </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Find", { initial: "FindPW" })}
          >
            <Text style={styles.findText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          {idText === "" || passwordText === "" ? (
            <BtnC
              children={"로그인"}
              onPress={() => {
                showToast("모든 항목을 작성해주세요");
              }}
            ></BtnC>
          ) : (
            <BtnC children={"로그인"} onPress={loginApi}></BtnC>
          )}
        </View>
      </View>

      <View style={{ ...styles.joinContainer, top: windowHeigh -36 }}>
        <Text style={{ fontSize: 12 }}>아직 회원이 아니신가요?</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Join1")}
        >
          <Text
            style={{
              fontFamily: "Pretendard-Bold",
              fontSize: 12,
              color: Main_theme.main_30,
            }}
          >
            {" "}
            회원가입하러가기
          </Text>
        </TouchableOpacity>
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  inputContainer: {
    paddingHorizontal: 24,
    marginTop: 52,
  },
  componentContainer: {
    paddingHorizontal: 24,
  },
  joinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
  },
  icon: {
    position: "absolute",
    marginHorizontal: 16,
    top: 19,
  },
  icon2: {
    position: "absolute",
    right: 16,
    top: 19,
  },

  inputText: {
    width: "100%",
    height: 56,
    paddingLeft: 50,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Gray_theme.gray_40,
    borderRadius: 8,
  },
  find: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 8,
    marginVertical: 8,
  },
  findText: {
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_50,
  },
  button: {
    marginTop: 16,
  },
  message: {
    marginTop: 20,
    color: Main_theme.main_reverse,
    textAlign: "center",
  },
  infoSignUP: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_80,
  },
  signUp: {
    fontFamily: "Pretendard-Bold",
    fontSize: 12,
    color: Main_theme.main_30,
  },
});
