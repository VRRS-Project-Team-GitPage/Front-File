import { View, Text, Button } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import Octicons from "@expo/vector-icons/Octicons";

export default function Rec_CateResultScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;
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
      <Text>추후 결과 화면을 작성할 예정입니다.</Text>
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

  bottomContents: { position: "absolute", bottom: 24, right: 0, left: 0 },
  bottomText: {
    textAlign: "center",
    marginBottom: 12,
    color: Main_theme.main_50,
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
  },
});
