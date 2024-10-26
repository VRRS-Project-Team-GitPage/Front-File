import React from "react";
import { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
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
import { truncateTextByWord } from "../../../assets/styles/ReuseComponents/truncateTextByWord";
// Server 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  fetchProductData,
  fetchReviewData,
} from "../../../assets/ServerDatas/ServerApi/dictionaryApi";
import {
  addBookmark,
  removeBookmark,
} from "../../../assets/ServerDatas/ServerApi/bookmarkApi";
import { fetchBookmarks } from "../../../assets/ServerDatas/ServerApi/bookmarkApi";

export default function DicProductScreen({ navigation, route }) {
  // user의 정보를 불러옴
  const { jwt } = useUser();

  // 사전 화면에서 받아온 제품 id
  const { id } = route.params || {};

  // 하단탭 숨김
  useTabBarVisibility(false);

  useFocusEffect(
    useCallback(() => {
      setOwnReview("");
      loadData();
      loadReviewData();
    }, [])
  );

  // id를 통해 찾은 제품을 저장할 state
  const [product, setProduct] = useState([]);
  const [ingredients, setIngredients] = useState();

  // 사용자 리뷰를 저장할 state
  const [reviews, setReviews] = useState();
  const [ownReview, setOwnReview] = useState();

  // 원재료명을 분리하는 함수
  const parseIngredients = (input) => {
    const result = [];
    let currentItem = "";
    let bracketStack = []; // 괄호를 추적하는 스택

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (char === "," && bracketStack.length === 0) {
        // 콤마가 괄호 밖에 있을 때만 분리
        result.push({ item: currentItem.trim() });
        currentItem = "";
      } else {
        // 괄호를 만나면 스택에 추가
        if (char === "(" || char === "[" || char === "{") {
          bracketStack.push(char);
        }

        // 닫는 괄호를 만나면 스택에서 제거
        if (char === ")" && bracketStack[bracketStack.length - 1] === "(") {
          bracketStack.pop();
        }
        if (char === "]" && bracketStack[bracketStack.length - 1] === "[") {
          bracketStack.pop();
        }
        if (char === "}" && bracketStack[bracketStack.length - 1] === "{") {
          bracketStack.pop();
        }

        // 현재 문자를 항목에 추가
        currentItem += char;
      }
    }

    // 마지막 항목 추가
    if (currentItem) {
      result.push({ item: currentItem.trim() });
    }

    return result;
  };

  // 제품 북마크 여부를 저장
  const [isBookmarked, setIsBookmarked] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchProductData(jwt, id);
      if (data) {
        const ingredientsList = parseIngredients(data.ingredients);
        setProduct(data); // 제품 상세 정보
        setIngredients(ingredientsList); // 제품 원재료명
        setIsBookmarked(data.bookmark); // 제품 북마크 여부
      } else {
        console.warn("Product data is undefined.");
      }
    } catch (error) {
      console.error("Failed to load product data:", error.message);
    }
  };

  const loadReviewData = async () => {
    try {
      const reviewData = await fetchReviewData(jwt, id);
      if (reviewData?.reviews) {
        setReviews(reviewData.reviews);
        setOwnReview(reviewData.review);
      } else {
        setReviews([]);
        setOwnReview(null);
      }
    } catch (error) {
      console.error("Failed to load review data:", error.message);
    }
  };

  useEffect(() => {
    loadData(); // 데이터 불러오기 호출
  }, [jwt, id, ownReview]);

  const [firstReview, setFirstReview] = useState();

  useEffect(() => {
    // 첫 번째 리뷰만 가져오기
    setFirstReview(
      product.reviewCnt > 0 || reviews
        ? reviews[0]
        : ownReview
        ? ownReview
        : null
    );
  }, [reviews]);

  // 추천수 퍼센테이지
  const thuumsUp =
    product.recCnt + product.notRecCnt !== 0
      ? parseInt((product.recCnt / (product.recCnt + product.notRecCnt)) * 100)
      : -1;

  // [ 제품 북마크 ]

  const fetchBookmarkStatus = async () => {
    const status = await fetchBookmarks(jwt);
    // 상태의 bookmarked 값을 가져와서 설정
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 북마크 상태 불러오기
    fetchBookmarkStatus();
  }, []);

  const toggleBookmark = async () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);

    try {
      if (newStatus) {
        // 북마크 추가
        await addBookmark(id, jwt); // jwtToken은 유저의 JWT 토큰
      } else {
        // 북마크 삭제
        await removeBookmark(id, jwt);
      }
    } catch (error) {
      console.error("북마크 상태 업데이트 중 에러 발생:", error.message);
      // 에러 발생 시 이전 상태로 되돌림
      setIsBookmarked(!newStatus);
    }
  };

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
          <Text style={styles.headerText}>
            {truncateTextByWord(product.name, 20)}
          </Text>
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
                source={{ uri: product.imgUrl }}
                style={styles.image}
              ></Image>
              <TouchableScale
                style={styles.imgHeart}
                onPress={() => {
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
                <Text style={styles.proType}>{product.category}</Text>
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
                    <Text style={styles.infoReview}>
                      {product.recCnt + product.notRecCnt}
                    </Text>
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
                                width:
                                  thuumsUp >= 0 ? thuumsUp.toString() + "%" : 0,
                                backgroundColor:
                                  thuumsUp >= 75
                                    ? Main_theme.main_30
                                    : thuumsUp >= 35
                                    ? "#FFD060"
                                    : thuumsUp >= 0
                                    ? Main_theme.main_reverse
                                    : null,
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
                      {product.vegType}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.proTypeTitle}>원재료</Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row", // 가로로 항목을 배치
                        flexWrap: "wrap", // 화면이 넘치면 다음 줄로 감
                        justifyContent: "flex-start", // 왼쪽부터 배치
                      }}
                    >
                      {ingredients ? (
                        ingredients.map((item, index) => (
                          <View style={styles.textBadge}>
                            <Text style={styles.text}>{item.item}</Text>
                          </View>
                        ))
                      ) : (
                        <ActivityIndicator />
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <Line />
              <View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductReview", {
                        productID: product.id,
                        reviewLength: product.recCnt + product.notRecCnt, // 리뷰의 총 개슈
                        reviewList: reviews ? reviews : null, // 리뷰 리스트
                        ownReview: ownReview ? ownReview : null, // 본인 리뷰
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
                          ({product.recCnt + product.notRecCnt})
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
                  {firstReview ? (
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
                              {firstReview ? firstReview.nickname : "유저"}
                            </Text>
                            <Text style={styles.vegType}>
                              {firstReview.vegType.name}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.writeDate}>
                              {firstReview.date}
                            </Text>

                            <Entypo
                              name="dot-single"
                              size={20}
                              color={Gray_theme.gray_50}
                              style={styles.dot}
                            />
                            {firstReview.rec ? (
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
                              reviewLength: product.reviewCnt, // 리뷰의 총 개슈
                              reviewList: reviews ? reviews : null, // 리뷰 리스트
                              ownReview: ownReview ? ownReview : null, // 본인 리뷰
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
                    <View>
                      {ownReview ? (
                        <View style={styles.reviewContainer}>
                          <View style={styles.userReviewContainer}>
                            <Image
                              source={MainIcons.user_profile}
                              style={styles.userProfile}
                            ></Image>
                            <View style={styles.userInfo}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginBottom: 6,
                                }}
                              >
                                <Text style={styles.userName}>
                                  {ownReview ? ownReview.nickname : "유저"}
                                </Text>
                                <Text
                                  style={{
                                    ...styles.userName,
                                    fontSize: 12,
                                    color: Gray_theme.gray_50,
                                  }}
                                >
                                  {" "}
                                  (본인)
                                </Text>
                                <Text style={styles.vegType}>
                                  {ownReview.vegType.name}
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Text style={styles.writeDate}>
                                  {ownReview.date}
                                </Text>

                                <Entypo
                                  name="dot-single"
                                  size={20}
                                  color={Gray_theme.gray_50}
                                  style={styles.dot}
                                />
                                {ownReview.rec ? (
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
                          <Text style={styles.content}>
                            {ownReview.content}
                          </Text>
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
                                  reviewLength: product.reviewCnt, // 리뷰의 총 개슈
                                  reviewList: reviews ? reviews : null, // 리뷰 리스트
                                  ownReview: ownReview ? ownReview : null, // 본인 리뷰
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
                          <Text style={styles.proType}>
                            아직 리뷰가 없어요...
                          </Text>
                        </View>
                      )}
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
