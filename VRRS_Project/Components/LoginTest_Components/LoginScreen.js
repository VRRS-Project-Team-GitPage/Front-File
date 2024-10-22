import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Button } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
// component 관련
import DropDown from "../../assets/styles/ReuseComponents/Button/DropDown";
// design 관련
import { Gray_theme, Main_theme } from "../../assets/styles/Theme_Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// Data 관련
import { vegTypes } from "../../assets/ServerDatas/Dummy/dummyVegTypes";
// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { useAuth } from "../../assets/ServerDatas/ReuseDatas/AuthProvider"; // 유저의 로그인 여부를 전역적으로 사용
import { useUser } from "../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../assets/styles/ReuseComponents/showToast";

export default function LoginScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

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
  const { signUpUser, id, name, vegTypeName } = useUser();
  const [nameText, setNameText] = useState("");
  const [idText, setIdText] = useState("");
  // 유저 정보를 저장하는 함수
  const handleSave = () => {
    const userData = {
      // 저장할 내용은 실제 서버에서 받아와 넣어주시면 됩니다.
      id: idText,
      name: nameText,
      veg_type_id: value,
    };
    signUpUser(userData); // 유저 정보를 저장
  };

  // 최종 로그인 함수 입니다
  // 로그인 여부에 필요한 로직을 추가하여 사용해주세요
  // (ex. 서버 내용 불러오기, textInput 확인하기 등)
  const handleLogin = () => {
    handleSave(); // 유저 정보를 저장
    checkLogin(); // 로그인 여부 저장
  };

  // DropDown에 사용될 변수 및 내용입니다
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    vegTypes
      .filter((item) => item.id !== 0)
      .map((item) => ({ label: item.name, value: item.id }))
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 60,
        }}
      >
        <Text>테스트 용 로그인 스크린 입니다.</Text>
        <Text>실제 로그인 스크린과 다르게 구성되어 있으며,</Text>
        <Text>전역 및 로컬 저장에 대한 예시를 담기 위해</Text>
        <Text>아래와 같이 구성하였으니 참고 바랍니다</Text>
      </View>
      <View style={styles.userInfo}>
        <View
          style={{
            paddingVertical: 8,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textInfo}>아이디</Text>
            <FontAwesome5
              name="star-of-life"
              size={8}
              color={Main_theme.main_30}
              style={styles.cPoint}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="아이디를 입력해주세요"
              placeholderTextColor={Gray_theme.gray_40}
              value={idText}
              onChangeText={(id) => setIdText(id)}
              style={styles.textInput}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 8,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textInfo}>닉네임</Text>
            <FontAwesome5
              name="star-of-life"
              size={8}
              color={Main_theme.main_30}
              style={styles.cPoint}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="가입 후 변경 가능합니다"
              placeholderTextColor={Gray_theme.gray_40}
              value={nameText}
              onChangeText={(id) => setNameText(id)}
              style={styles.textInput}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 8,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textInfo}>채식 유형</Text>
            <FontAwesome5
              name="star-of-life"
              size={8}
              color={Main_theme.main_30}
              style={styles.cPoint}
            />
          </View>
          <DropDown
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"채식 유형을 선택해주세요"}
          ></DropDown>
        </View>
      </View>
      <View style={{ ...styles.buttonContainer, top: windowHeigh - 36 }}>
        <Button
          title="로그인"
          color={Main_theme.main_50}
          onPress={handleLogin}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
    paddingHorizontal: 24,
  },
  userInfo: {},
  textInfo: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    marginBottom: 8,
  },
  cPoint: {
    marginLeft: 4,
  },
  textInput: {
    // TextInput 디자인
    flex: 1,
    height: 42,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_50,
    // TextInput 내부 글씨
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Regular",
    color: Gray_theme.balck,
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
});
