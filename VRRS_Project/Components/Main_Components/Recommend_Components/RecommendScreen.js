import { View, Text, Image } from "react-native";
import { useWindowDimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
// component 관련
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";

export default function RecommendScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;
  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.navigate("Home");
        }}
      ></Xheader>
      <View style={styles.contents}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>추천 방식을</Text>
          <Text style={styles.title}>선택해주세요.</Text>
        </View>
        <View style={styles.mainContents}>
          <TouchableScale
            onPress={() => {
              navigation.navigate("Rec_Key");
            }}
          >
            <View
              style={{
                ...styles.btnContainer,
                width: windowWidth - 48,
                height: 184,
              }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ ...styles.btnTitle, color: Main_theme.main_30 }}
                  >
                    키워드
                  </Text>
                  <Text style={styles.btnTitle}>로</Text>
                </View>
                <Text style={styles.btnTitle}>추천받기</Text>
              </View>
              <Image
                source={MainIcons.keyword}
                style={{
                  width: 120,
                  height: 120,
                }}
              ></Image>
            </View>
          </TouchableScale>
          <TouchableScale
            onPress={() => {
              navigation.navigate("Rec_Cate");
            }}
          >
            <View
              style={{
                ...styles.btnContainer,
                width: windowWidth - 48,
                height: 184,
              }}
            >
              <Image
                source={MainIcons.paper}
                style={{
                  width: 120,
                  height: 120,
                }}
              ></Image>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ ...styles.btnTitle, color: Main_theme.main_30 }}
                  >
                    유형
                  </Text>
                  <Text style={styles.btnTitle}>으로</Text>
                </View>

                <Text style={styles.btnTitle}>추천받기</Text>
              </View>
            </View>
          </TouchableScale>
        </View>
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
  },
  titleContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
  },
  mainContents: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: Gray_theme.gray_20,
  },
  btnContainer: {
    marginTop: 32,
    backgroundColor: Gray_theme.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingTop: 32,
    borderRadius: 20,
    elevation: 2,
  },
  keyBtn: {
    flexDirection: "row",
  },
  btnTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 28,
  },
});
