import React from "react";
import { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
import BarIcons from "../../../assets/Icons/BarIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// component 관련
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
// Date 관련
import {
  getAllProducts,
  products,
  getVegTypeName,
  getProTypeNAme,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";

export default function DicProductScreen({ navigation, route }) {
  const { id } = route.params || {};

  // 특정 id를 통해 제품을 찾는 함수
  const findProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  // 하단탭 숨김
  useTabBarVisibility(false);

  // id를 통해 찾은 제품을 저장할 state
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = findProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  // 추천수 퍼센테이지
  const thuumsUp =
    product.review !== 0 ? parseInt((product.rec / product.review) * 100) : 0;

  // 제품 북마크 여부를 저장
  const [bookMark, setBookmark] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Octicons
            name="arrow-left"
            size={24}
            color={Gray_theme.gray_90}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>{product.name}</Text>
          <Image source={MainIcons.error} style={styles.headerIcon}></Image>
        </View>
        <ScrollView>
          <View>
            <View style={styles.imageContain}>
              <Image
                source={{ uri: product.img_path }}
                style={styles.image}
              ></Image>
              <TouchableScale
                style={styles.imgHeart}
                onPress={() => {
                  setBookmark(!bookMark);
                }}
              >
                {!bookMark ? (
                  <Octicons name="heart" size={24} color={Gray_theme.gray_90} />
                ) : (
                  <Octicons
                    name="heart-fill"
                    size={24}
                    color={Main_theme.main_reverse}
                  />
                )}
              </TouchableScale>
            </View>
            <View>
              <View style={styles.proInfo_N}>
                <Text style={styles.proType}>
                  {getProTypeNAme(product.pro_type_id)}
                </Text>
                <Text style={styles.proName}>{product.name}</Text>
              </View>
              <View style={styles.itemInfoC}>
                <View style={styles.itemInfoBgc} />
                <View style={styles.itemInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Text style={styles.infoReview}>{product.review}</Text>
                    <Text style={styles.infoReview}>명의 리뷰가 있어요!</Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          ...styles.infonGoodLine,
                          backgroundColor:
                            thuumsUp >= 75
                              ? Main_theme.main_30
                              : thuumsUp >= 35
                              ? "#FFD060"
                              : thuumsUp >= 1
                              ? Main_theme.main_reverse
                              : Gray_theme.gray_40,
                        }}
                      >
                        <Image
                          source={BarIcons.recommed_C}
                          style={styles.infoGood}
                        ></Image>
                      </View>
                      <View style={{ flex: 1 }}>
                        {thuumsUp !== 0 ? (
                          <View style={styles.infoPerC}>
                            <Text
                              style={{
                                ...styles.infoPer,
                                color:
                                  thuumsUp >= 75
                                    ? Main_theme.main_30
                                    : thuumsUp >= 35
                                    ? "#FFD060"
                                    : thuumsUp >= 1
                                    ? Main_theme.main_reverse
                                    : Gray_theme.gray_40,
                              }}
                            >
                              {thuumsUp.toString() + "%"}
                            </Text>
                            <Text style={styles.infoPerText}>
                              가 좋아하고 있습니다
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.infoPerC}>
                            <Text style={styles.infoPerText}>
                              아직 평가가 없습니다
                            </Text>
                          </View>
                        )}

                        <View style={styles.scrollBar}>
                          <View style={styles.scrollBarBg}>
                            <View
                              style={{
                                ...styles.scrollBarPer,
                                width: thuumsUp.toString() + "%",
                                backgroundColor:
                                  thuumsUp >= 75
                                    ? Main_theme.main_30
                                    : thuumsUp >= 35
                                    ? "#FFD060"
                                    : thuumsUp >= 1
                                    ? Main_theme.main_reverse
                                    : Gray_theme.gray_40,
                              }}
                            >
                              <View style={styles.barCir}></View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.proInfo_D}>
                <View>
                  <Text style={styles.proTypeTitle}>섭취 유형</Text>
                  <View
                    style={{
                      ...styles.textBadge,
                      backgroundColor: Main_theme.main_30,
                    }}
                  >
                    <Text style={{ ...styles.text, color: Gray_theme.white }}>
                      {getVegTypeName(product.veg_type_id)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.proTypeTitle}>원재료</Text>

                  <ScrollView
                    contentContainerStyle={{
                      flexDirection: "row", // 가로로 나열
                      flexWrap: "wrap", // 줄 바꿈
                    }}
                  >
                    {product.ingredients && product.ingredients.length > 0 ? (
                      product.ingredients.map((item, index) => (
                        <View key={index} style={styles.textBadge}>
                          <Text style={styles.text}>{item}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>원재료 정보가 없습니다.</Text> // 데이터가 없을 때 표시
                    )}
                  </ScrollView>
                </View>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductReview");
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.reviewHeader}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.reviewTitle}>리뷰</Text>
                        <Text style={styles.reviewTotal}>
                          ({product.review})
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            ...styles.reviewTotal,
                            color: Gray_theme.balck,
                          }}
                        >
                          전체 보기
                        </Text>
                        <Octicons
                          name="chevron-right"
                          size={24}
                          color={Gray_theme.gray_90}
                          style={{ marginLeft: 16 }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 60 }}></View>
        </ScrollView>
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
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    width: 26,
    height: 26,
    tintColor: Gray_theme.gray_90,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
  },
  conetent: {},
  imageContain: {
    flex: 1,
    height: 250,
    backgroundColor: Gray_theme.white,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  imgHeart: {
    position: "absolute",
    right: 24,
    bottom: 24,
  },
  proInfo_N: {
    backgroundColor: Main_theme.main_10,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  proType: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_80,
  },
  proName: {
    fontFamily: "Pretendard-Bold",
    fontSize: 24,
    color: Gray_theme.gray_80,
  },
  itemInfoC: {
    backgroundColor: Gray_theme.white,
    paddingHorizontal: 24,
    width: "100%",
  },
  itemInfoBgc: {
    position: "absolute",
    width: "1000%",
    height: "50%",
    backgroundColor: Main_theme.main_10,
  },
  itemInfo: {
    backgroundColor: Gray_theme.white,
    elevation: 3,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
  },
  infoReview: {
    fontFamily: "Pretendard-Bold",
    fontSize: 18,
    color: Gray_theme.gray_80,
  },
  infonGoodLine: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  infoGood: {
    marginLeft: 8,
    width: 28,
    height: 28,
    tintColor: Gray_theme.white,
    marginRight: 8,
  },
  infoPerC: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  infoPer: {
    marginLeft: 4,
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 16,
    marginRight: 2,
  },
  infoPerText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: Gray_theme.gray_50,
  },
  scrollBar: {
    justifyContent: "center",
  },
  scrollBarBg: {
    justifyContent: "center",
    height: 8,
    width: "100%",
    backgroundColor: "#E9E9E9",
    borderRadius: 50,
  },
  scrollBarPer: {
    height: 12,
    borderRadius: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  proInfo_D: {
    marginVertical: 36,
    paddingHorizontal: 24,
  },
  proTypeTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: Gray_theme.balck,
    marginBottom: 12,
    marginTop: 12,
  },
  textBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_30,
    borderWidth: 1.5,
    borderColor: Main_theme.main_30,
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: 12,
    marginRight: 12,
  },
  text: {
    fontSize: 12,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_30,
  },
  reviewHeader: {
    height: 60,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: Gray_theme.balck,
    marginRight: 6,
  },
  reviewTotal: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: Gray_theme.gray_50,
  },
});
