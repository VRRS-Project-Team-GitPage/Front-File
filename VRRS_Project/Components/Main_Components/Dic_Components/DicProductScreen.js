import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import BarIcons from "../../../assets/Icons/BarIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// component 관련
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import {
  saveBookmarkStatus,
  getBookmarkStatus,
} from "../../../assets/ServerDatas/LocalDatas/LocalBookMark";
// Date 관련
import {
  getAllProducts,
  products,
  getVegTypeName,
  getProTypeName,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";
import {
  getReviewsByProduct,
  getReviewsWithUserInfo,
  sortReviewsByDate,
} from "../../../assets/ServerDatas/Dummy/dummyReviews";

export default function DicProductScreen({ navigation, route }) {
  const { id } = route.params || {};

  // 하단탭 숨김
  useTabBarVisibility(false);

  // 특정 id를 통해 제품을 찾는 함수
  const findProductById = (id) => {
    return products.find((product) => product.id === id);
  };

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

  // 제품 북마크

  // 추천수 퍼센테이지
  const thuumsUp =
    product.review !== 0 ? parseInt((product.rec / product.review) * 100) : -1;

  // 제품 북마크 여부를 저장
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 북마크 상태 불러오기
    const fetchBookmarkStatus = async () => {
      const status = await getBookmarkStatus(product.id);
      setIsBookmarked(status);
    };

    fetchBookmarkStatus();
  }, [product.id]);

  const toggleBookmark = async () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    await saveBookmarkStatus(product.id, newStatus); // 북마크 상태 저장
  };

  // 리뷰 관련
  // 1. 제품 ID에 맞는 리뷰를 가져오고 최신순으로 정렬
  const productReviews = getReviewsByProduct(product.id);
  const sortedReviews = sortReviewsByDate(productReviews);

  // 2. 리뷰에 유저 정보를 연동
  const productReviewsWithUserInfo = getReviewsWithUserInfo(sortedReviews);

  // 3. 첫 번째 리뷰만 가져오기
  const firstReview =
    productReviewsWithUserInfo.length > 0 ? productReviewsWithUserInfo[0] : [];

  const reviewLength = product.review;

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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("reportPro");
            }}
          >
            <MaterialIcons name="error" size={24} color={Gray_theme.gray_40} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.imageContain}>
              <Image
                source={{ uri: product.img_path }}
                style={styles.image}
              ></Image>
              <TouchableScale
                style={styles.imgHeart}
                onPress={() => {
                  setIsBookmarked(!isBookmarked);
                  toggleBookmark();
                }}
              >
                {!isBookmarked ? (
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
                  {getProTypeName(product.pro_type_id)}
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
                              : thuumsUp >= 0
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
                        {thuumsUp !== -1 ? (
                          <View style={styles.infoPerC}>
                            <Text
                              style={{
                                ...styles.infoPer,
                                color:
                                  thuumsUp >= 75
                                    ? Main_theme.main_30
                                    : thuumsUp >= 35
                                    ? "#FFD060"
                                    : thuumsUp >= 0
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
                            <Text
                              style={{ marginLeft: 8, ...styles.infoPerText }}
                            >
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
                                    : thuumsUp >= 0
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
                      <Text style={styles.userName}>
                        원재료 정보가 없습니다.
                      </Text> // 데이터가 없을 때 표시
                    )}
                  </ScrollView>
                </View>
              </View>
              <Line />
              <View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductReview", {
                        productID: product.id,
                        reviewLength: reviewLength, // 리뷰의 총 개슈
                        reviewList: productReviewsWithUserInfo, // 리뷰 리스트
                      });
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

                <View>
                  {firstReview.length !== 0 ? (
                    <View style={styles.reviewContainer}>
                      <View style={styles.userReviewContainer}>
                        <Image
                          source={MainIcons.allUser_profile}
                          style={styles.userProfile}
                        ></Image>
                        <View style={styles.userInfo}>
                          <View
                            style={{ flexDirection: "row", marginBottom: 6 }}
                          >
                            <Text style={styles.userName}>
                              {firstReview.user_name}
                            </Text>
                            <Text style={styles.vegType}>
                              {firstReview.user_veg_type}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.writeDate}>
                              {new Date(
                                firstReview.created_at
                              ).toLocaleDateString()}
                            </Text>

                            <Entypo
                              name="dot-single"
                              size={20}
                              color={Gray_theme.gray_50}
                              style={styles.dot}
                            />
                            {firstReview.is_rec ? (
                              <Image
                                source={MainIcons.good}
                                style={styles.userRec}
                              ></Image>
                            ) : (
                              <Image
                                source={MainIcons.bad}
                                style={{ ...styles.userRec, marginTop: 4 }}
                              ></Image>
                            )}
                          </View>
                        </View>
                      </View>
                      <Text style={styles.content}>{firstReview.content}</Text>
                      <View style={styles.moreContainer}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            navigation.navigate("ProductReview", {
                              productID: product.id,
                              reviewLength: reviewLength,
                              reviewList: productReviewsWithUserInfo,
                            });
                          }}
                        >
                          <Octicons
                            name="chevron-down"
                            size={24}
                            color={Gray_theme.gray_40}
                            style={{
                              marginRight: 8,
                            }}
                          />
                          <Text
                            style={{
                              ...styles.userName,
                              color: Gray_theme.gray_40,
                            }}
                          >
                            더보기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.noRevieContainer}>
                      <Text style={styles.proType}>작성된 리뷰가 없습니다</Text>
                      <Text style={styles.proType}>
                        첫 번째 리뷰를 남겨주세요!
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
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
    marginLeft: 8,
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
  // 리뷰 관련 스타일
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
  // 맨 처음 리뷰 스타일
  reviewContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
  },
  userProfile: {
    width: 52,
    height: 52,
    marginRight: 16,
  },
  userReviewContainer: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  vegType: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    backgroundColor: Main_theme.main_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  userRec: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  writeDate: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
  content: {
    paddingVertical: 16,
    marginLeft: 68,
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
  },
  // 리뷰가 없는 경우
  noRevieContainer: {
    marginVertical: 120,
    alignItems: "center",
  },
  moreContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
