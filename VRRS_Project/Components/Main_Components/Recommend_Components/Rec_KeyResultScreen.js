import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
// server 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { fetchKeywordData } from "../../../assets/ServerDatas/ServerApi/recommendApi";

export default function Rec_keyResultScreen({ navigation, route }) {
  const { jwt } = useUser();

  // 하단탭 숨김
  useTabBarVisibility(false);

  //KeywordScreen으로부터 받아온 Params
  const { text, triggerSubmit } = route.params || {};
  const [searchText, setSearchText] = useState("");

  const [recommendProduct, setRecommendProduct] = useState("");

  useEffect(() => {
    if (triggerSubmit) {
      setSearchText(text);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit, text]);

  const loadData = async () => {
    try {
      const data = await fetchKeywordData(jwt, searchText);
      console.log(data);

      if (!data || data.length === 0) {
        setRecommendProduct(null);
      } else {
        // 배열에서 무작위 인덱스를 선택
        const randomIndex = Math.floor(Math.random() * data.length);
        setRecommendProduct(data[randomIndex]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (searchText) {
      loadData();
    }
  }, [searchText]);

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
            {" "}
            이/가 포함된
          </Text>
        </View>
        {recommendProduct ? (
          <View>
            <Text
              style={{
                ...styles.resultText,
                color: Main_theme.main_50,
                marginRight: 32,
              }}
            >
              {recommendProduct.name}
            </Text>
            <Text style={{ ...styles.resultText, color: Gray_theme.balck }}>
              를 추천해요.
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                ...styles.resultText,
                color: Main_theme.main_50,
              }}
            >
              제품 결과
            </Text>
            <Text style={styles.resultText}> 가 없어요...</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.8}
        onPress={() => {
          if (recommendProduct) {
            navigation.navigate("DicTab", {
              screen: "DicList", // DicList로 먼저 이동
            });

            setTimeout(() => {
              navigation.navigate("ProductInfo", {
                id: recommendProduct.id,
              }); // DicList에서 ProductInfo로 이동
            }, 0); // DicList가 렌더링된 후 ProductInfo로 이동
          }
        }}
      >
        <Image
          source={
            recommendProduct ? { uri: recommendProduct.imgUrl } : MainIcons.fail
          }
          style={styles.productImage}
        ></Image>
      </TouchableOpacity>
      {recommendProduct ? (
        <Text style={styles.guideText}>
          이미지를 클릭하면 상세정보 페이지로 넘어갑니다.
        </Text>
      ) : null}
      <View style={styles.bottomContents}>
        <Text style={styles.bottomText}>다른 제품을 알아보고 싶다면?</Text>
        <View style={styles.bottomBtn}>
          <BtnC
            onPress={() => {
              navigation.navigate("Rec_Main");
            }}
            children={"재추천받기"}
          ></BtnC>
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
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
  titleKeyWord: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: -0.8,
  },

  imageContainer: {
    marginTop: 32,
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },

  productImage: {
    width: 200,
    height: 200,
  },

  guideText: {
    marginTop: 8,
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: Gray_theme.gray_40,
    textAlign: "center",
  },
  bottomContents: { position: "absolute", bottom: 24, right: 0, left: 0 },
  bottomText: {
    textAlign: "center",
    marginBottom: 12,
    color: Main_theme.main_50,
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
  },
  bottomBtn: {
    paddingHorizontal: 16,
  },
});
