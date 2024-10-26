import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
// component 관련
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
// local data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
// server 관련
import { fetchCategoryData } from "../../../assets/ServerDatas/ServerApi/recommendApi";
import MainIcons from "../../../assets/Icons/MainIcons";

export default function Rec_CateResultScreen({ navigation, route }) {
  const { jwt } = useUser();

  const { selectedCategories } = route.params || {};

  const [recommendProduct, setRecommendProduct] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCategoryData(jwt, selectedCategories);
        console.log(data);

        if (!data || data.length === 0) {
          setRecommendProduct(null);
        } else {
          // 배열에서 무작위 인덱스를 선택
          const randomIndex = Math.floor(Math.random() * data.length);
          setRecommendProduct(data[randomIndex]);
          console.log(data[randomIndex].imgUrl);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    loadData(); // 데이터 불러오기 호출
  }, []);

  console.log(selectedCategories);

  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <View style={styles.titleResult}>
        {recommendProduct ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.resultText, color: Main_theme.main_30 }}>
              {recommendProduct.category}
            </Text>
            <Text style={{ ...styles.resultText, color: Gray_theme.balck }}>
              {" "}
              인
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.resultText, color: Main_theme.main_30 }}>
              선택한 유형
            </Text>
            <Text style={{ ...styles.resultText, color: Gray_theme.balck }}>
              {" "}
              의
            </Text>
          </View>
        )}
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
                ...styles.titleKeyWord,
                color: Main_theme.main_50,
              }}
            >
              제품 결과
            </Text>
            <Text style={styles.title}> 가 없어요...</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("DicTab", {
            screen: "DicList", // DicList로 먼저 이동
          });

          setTimeout(() => {
            navigation.navigate("ProductInfo", {
              id: recommendProduct.id,
            }); // DicList에서 ProductInfo로 이동
          }, 0); // DicList가 렌더링된 후 ProductInfo로 이동
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
  titleResult: {
    marginVertical: 32,
    marginLeft: 32,
  },
  resultText: {
    fontSize: 24,
    fontFamily: "Pretendard-SemiBold",
  },
  titleContent: {
    marginTop: 32,
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

  bottomContents: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 16,
  },
  bottomText: {
    textAlign: "center",
    marginBottom: 12,
    color: Main_theme.main_50,
    fontSize: 12,
    fontFamily: "Pretendard-SemiBold",
  },
});
