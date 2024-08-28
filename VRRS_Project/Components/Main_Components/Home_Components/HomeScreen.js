import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
// StatusBar 영역을 확보하기 위해 import
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";

export default function HomeScreen() {
  // user 닉네임을 불러와 저장하는 state
  const [userName, setUserName] = useState("김철수");
  // user 유형을 불러와 저장하는 state
  const [userType, setUserType] = useState("비건");

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.header}>
        <Image
          source={MainIcons.mainLogo}
          style={{
            width: 48,
            height: 48,
          }}
        ></Image>
        <TouchableOpacity
          style={{ justifyContent: "center", marginHorizontal: 24 }}
          activeOpacity={0.8}
        >
          <View
            style={{
              width: windowWidth - 120,
              ...styles.headerTextInput,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: 12,
                color: Main_theme.main_50,
              }}
            >
              다양한 제품들을 만나보세요
            </Text>
            <Octicons
              name="x-circle-fill"
              size={16}
              color={Main_theme.main_50}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.topContents}>
          <View style={styles.mainTitle}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 24,
                  color: Gray_theme.gray_80,
                }}
              >
                반가워요,{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 24,
                  color: Main_theme.main_50,
                }}
              >
                {userName}님!
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                color: Gray_theme.gray_80,
              }}
            >
              오늘은 이런 제품 어떠세요?
            </Text>
          </View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(Main_theme.main_30)}
          >
            <View
              style={{
                alignSelf: "center",
                width: windowWidth - 48,
                paddingVertical: 12,
                borderRadius: 10,
                backgroundColor: Gray_theme.white,
                alignContent: "center",
                flexDirection: "row",
                elevation: 4,
              }}
            >
              <View
                style={{
                  marginHorizontal: 24,
                  marginVertical: 24,
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pretendard-Medium",
                    color: Main_theme.main_30,
                  }}
                >
                  무엇을 먹어야 할까? 고민될 때!
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: 28,
                    color: Main_theme.main_50,
                  }}
                >
                  지금 추천받기
                </Text>
              </View>
              <Image
                source={MainIcons.paper}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                }}
              ></Image>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ ...styles.mainContents, height: windowHeight }}>
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity style={styles.mainDicHeader} activeOpacity={0.6}>
              <Text
                style={{
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: 16,
                  color: Gray_theme.balck,
                }}
              >
                {userType}은 지금 ❤️‍🔥
              </Text>
              <Octicons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}></View>
          </View>
          <View></View>
          <View>
            <TouchableOpacity style={styles.mainDicHeader} activeOpacity={0.6}>
              <Text
                style={{
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: 16,
                  color: Gray_theme.balck,
                }}
              >
                전체 인기순위
              </Text>
              <Octicons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Main_theme.main_10,
    flexDirection: "column",
  },
  topContents: {},
  header: {
    //backgroundColor: "#222", //영역 테스트 용 코드입니다.
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignContent: "center",
  },
  headerTextInput: {
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: Gray_theme.white,
    borderRadius: 20,
    alignItems: "center",

    justifyContent: "space-between",
    flexDirection: "row",
  },
  mainTitle: {
    //backgroundColor: Main_theme.main_reverse, //영역 테스트 용 코드입니다.
    marginVertical: 24,
    marginHorizontal: 24,
  },
  mainContents: {
    backgroundColor: Gray_theme.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 32,
  },
  mainDicHeader: {
    marginHorizontal: 24,
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainDicContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
});
