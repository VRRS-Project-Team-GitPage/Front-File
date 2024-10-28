import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
// component 관련
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function MainStartScrren({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={MainIcons.mainLogo}
        style={{
          height: 150,
          width: 150,
          marginBottom: 30,
        }}
      ></Image>
      <View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={styles.mainTitle}>채식 </Text>
            <Text style={{ ...styles.mainTitle, color: Main_theme.main_50 }}>
              어디
            </Text>
          </View>
          <Text style={styles.subTitle}>단계별 채식 라이프의 시작</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <BtnC
          children={"시작하기"}
          onPress={() => {
            navigation.navigate("login");
          }}
        ></BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontFamily: "Pretendard-Black",
    letterSpacing: -1,
    fontSize: 36,
    color: Main_theme.main_30,
  },
  subTitle: {
    marginTop: 4,
    fontFamily: "Pretendard-Regular",
    letterSpacing: 0.6,
    color: Gray_theme.gray_60,
  },
  bottomButton: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 24,
    paddingHorizontal: 24,
  },
});
