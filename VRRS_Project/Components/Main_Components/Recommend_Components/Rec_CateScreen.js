import { View, Text, Image } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TouchableScale from "../../../assets/styles/TouchableScale";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import Cate_Icons from "../../../assets/Icons/CateIcons";

export default function Rec_CateScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  useTabBarVisibility(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Octicons
          name="arrow-left"
          size={24}
          color={Gray_theme.gray_90}
          style={{
            position: "absolute",
            left: 24,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Pretendard-Bold",
          }}
        >
          유형으로 추천받기
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>먹고 싶은</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.title, color: Main_theme.main_30 }}>
              제품 유형
            </Text>
            <Text style={styles.title}>을</Text>
          </View>
          <Text style={styles.title}>선택해주세요.</Text>
        </View>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <TouchableScale>
              <View
                style={{
                  ...styles.cateBtn,
                  width: windowWidth / 2 - 36,
                  height: windowWidth / 2 - 36,
                }}
              >
                <Image
                  source={Cate_Icons.burrito}
                  style={{
                    width: 92,
                    height: 92,
                  }}
                ></Image>
                <Text style={styles.btnText}>식사류</Text>
              </View>
            </TouchableScale>
            <TouchableScale>
              <View
                style={{
                  ...styles.cateBtn,
                  width: windowWidth / 2 - 36,
                  height: windowWidth / 2 - 36,
                }}
              >
                <Image
                  source={Cate_Icons.bread}
                  style={{
                    width: 92,
                    height: 92,
                  }}
                ></Image>
                <Text style={styles.btnText}>베이커리</Text>
              </View>
            </TouchableScale>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableScale>
              <View
                style={{
                  ...styles.cateBtn,
                  width: windowWidth / 2 - 36,
                  height: windowWidth / 2 - 36,
                }}
              >
                <Image
                  source={Cate_Icons.pop}
                  style={{
                    width: 92,
                    height: 92,
                  }}
                ></Image>
                <Text style={styles.btnText}>간식</Text>
              </View>
            </TouchableScale>
            <TouchableScale>
              <View
                style={{
                  ...styles.cateBtn,
                  width: windowWidth / 2 - 36,
                  height: windowWidth / 2 - 36,
                }}
              >
                <Image
                  source={Cate_Icons.cup}
                  style={{
                    width: 92,
                    height: 92,
                  }}
                ></Image>
                <Text style={styles.btnText}>음료</Text>
              </View>
            </TouchableScale>
          </View>
        </View>
        <View style={styles.bottomContents}>
          <Btn>확인</Btn>
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
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Gray_theme.gray_20,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  cateBtn: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: Gray_theme.white,
    paddingVertical: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
  },
  bottomContents: { position: "absolute", bottom: 24, right: 0, left: 0 },
});
