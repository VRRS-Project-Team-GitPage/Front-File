import { View, Text, Button } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import Octicons from "@expo/vector-icons/Octicons";
import { useEffect, useState } from "react";

export default function Rec_keyResultScreen({ navigation, route }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 하단탭 숨김
  useTabBarVisibility(false);

  //KeywordScreen으로부터 받아온 Params
  const { text, triggerSubmit } = route.params || {};
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (triggerSubmit) {
      setSearchText(text);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit, text]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Octicons
          name="x"
          size={24}
          color={Gray_theme.gray_90}
          style={styles.headerX}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View style={styles.titleResult}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.resultText, color: Main_theme.main_30 }}>
            {searchText}
          </Text>
          <Text style={{ ...styles.resultText, color: Gray_theme.balck }}>
            이 포함된
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.resultText, color: Main_theme.main_50 }}>
            (추후 추가)
          </Text>
          <Text style={{ ...styles.resultText, color: Gray_theme.balck }}>
            를 추천해요.
          </Text>
        </View>
      </View>
      <View style={styles.bottomContents}>
        <Text style={styles.bottomText}>다른 제품을 알아보고 싶다면?</Text>
        <BtnC
          onPress={() => {
            navigation.navigate("Rec_Main");
          }}
        >
          재추천받기
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
  header: {
    height: 60,
    justifyContent: "center",
  },
  headerX: {
    position: "absolute",
    right: 24,
  },
  titleResult: {
    marginVertical: 32,
    marginLeft: 32,
  },
  resultText: {
    fontSize: 24,
    fontFamily: "Pretendard-SemiBold",
  },
  bottomContents: { position: "absolute", bottom: 24, right: 0, left: 0 },
  bottomText: {
    textAlign: "center",
    marginBottom: 12,
    color: Main_theme.main_50,
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
  },
});
