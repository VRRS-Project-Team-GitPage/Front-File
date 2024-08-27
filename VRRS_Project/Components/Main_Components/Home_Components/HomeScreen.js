import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
// StatusBar 영역을 확보하기 위헤 import
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
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
              paddingHorizontal: 16,
              width: windowWidth - 120,
              height: 40,
              backgroundColor: Gray_theme.white,
              borderRadius: 15,
              justifyContent: "center",
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
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                alignSelf: "center",
                width: windowWidth - 48,
                height: 120,
                borderRadius: 10,
                backgroundColor: Main_theme.main_50,
                flexDirection: "row",
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
                    fontFamily: "Pretendard-Regular",
                    color: Main_theme.main_10,
                  }}
                >
                  무엇을 먹어야 할까? 고민될 때!
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: 28,
                    color: Gray_theme.white,
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
          </TouchableOpacity>
        </View>
        <View style={styles.mainContents}>
          <View>
            <View
              style={{
                marginHorizontal: 24,
              }}
            >
              <Text>{userType}은 지금 ❤️‍🔥</Text>
            </View>
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
    //backgroundColor: "#222",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignContent: "center",
  },
  headerTextInput: {},
  mainTitle: {
    //backgroundColor: Main_theme.main_reverse,
    marginVertical: 24,
    marginHorizontal: 24,
  },
  mainContents: {
    flex: 1,
    backgroundColor: Gray_theme.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 32,
  },
});
