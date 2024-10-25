import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, useWindowDimensions, FlatList } from "react-native";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
// Component 관련
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";
import { truncateTextByWord } from "../../../assets/styles/ReuseComponents/truncateTextByWord";
// StatusBar 영역을 확보하기 위해 import
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
// Server data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  getProductRankData,
  fetchDictionaryData,
} from "../../../assets/ServerDatas/ServerApi/dictionaryApi";

export default function HomeScreen({ navigation }) {
  // user의 정보를 불러옴
  const { jwt, user, name, vegTypeId, vegTypeName } = useUser();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;

  // 인기 순위 저장
  const [topProductData, setTopProductData] = useState([]);
  const [topOwnProductData, setTopOwnProductData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await fetchDictionaryData(
          jwt,
          getProductRankData(6)
        );
        const ownProductData = await fetchDictionaryData(
          jwt,
          getProductRankData(vegTypeId)
        );
        // 상위 10개 요소만 저장
        setTopProductData(productData.slice(0, 10)); // 상위 10개
        setTopOwnProductData(ownProductData.slice(0, 10)); // 상위 10개
      } catch (error) {
        console.error(error.message);
      }
    };

    loadData(); // 데이터 불러오기 호출
  }, []);

  const scrollViewRef = useRef(null);
  const flatListRef = useRef(null);

  // 스크롤뷰를 처음으로 돌리는 함수
  const scrollViewReturn = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const subScrollViewReturn = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // 화면이 포커싱 될 경우 해당 옵션을 default로
        scrollViewReturn();
        subScrollViewReturn();
      };
    }, [])
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

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
          onPress={() => {
            navigation.navigate("MainSearch");
          }}
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
      <ScrollView
        ref={scrollViewRef}
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topContents}>
          <View style={styles.mainTitle}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 24,
                  color: Gray_theme.balck,
                }}
              >
                반가워요, {""}
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 24,
                  color: Gray_theme.white,
                }}
              >
                {name || "이름이 없습니다."}님!
              </Text>
            </View>
            <Text
              style={{
                marginTop: 4,
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.balck,
              }}
            >
              오늘도 함께 채식을 실천해요!
            </Text>
          </View>
          <TouchableScale
            activeOpacity={0.8}
            style={{ justifyContent: "center", marginVertical: 8 }}
            onPress={() =>
              navigation.navigate("RecoTab", {
                screen: "Rec_Main",
              })
            }
          >
            <View
              style={{
                alignSelf: "center",
                width: windowWidth - 48,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor: Gray_theme.white,

                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  marginHorizontal: 24,
                  marginVertical: 32,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pretendard-Medium",
                    color: Gray_theme.gray_70,
                  }}
                >
                  무엇을 먹어야 할까? 고민될 때!
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: 20,
                    color: Gray_theme.balck,
                  }}
                >
                  지금 추천받기
                </Text>
              </View>
              <Image
                source={MainIcons.paper}
                style={{
                  width: 150,
                  height: 150,
                  position: "absolute",
                  bottom: 8,
                  right: 0,
                }}
              ></Image>
            </View>
          </TouchableScale>
        </View>
        <View style={styles.mainContents}>
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DicTab", {
                  screen: "DicList",
                }),
                  setTimeout(() => {
                    navigation.navigate("DicTab", {
                      screen: "DicList",
                      params: {
                        type: vegTypeName, // 전체 제품을 필터로 설정
                        sortOption: "인기순", // 인기순으로 정렬
                        autoSearch: true, // 자동으로 검색을 트리거
                      },
                    });
                  }, 0);
              }}
              style={{
                marginTop: 32,
                ...styles.mainDicHeader,
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.mainDicTitle}>{vegTypeName}은 지금 ❤️‍🔥</Text>
              <Octicons
                name="chevron-right"
                size={24}
                color={Gray_theme.gray_80}
              />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}>
              <FlatList
                ref={flatListRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topOwnProductData} // 상태로 관리되는 제품 데이터를 사용
                keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemContainer}>
                      <TouchableScale
                        onPress={() => {
                          const productID = item.id;
                          navigation.navigate("DicTab", {
                            screen: "DicList", // DicList로 먼저 이동
                          });

                          setTimeout(() => {
                            navigation.navigate("ProductInfo", {
                              id: productID,
                            }); // DicList에서 ProductInfo로 이동
                          }, 0); // DicList가 렌더링된 후 ProductInfo로 이동
                        }}
                      >
                        <Image
                          source={{ uri: item.imgUrl }}
                          style={styles.image}
                        />

                        <View style={styles.textContainer}>
                          {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                          <Text style={styles.name}>
                            {truncateTextByWord(item.name, 8)}
                          </Text>
                          <Text style={styles.category}>{item.category}</Text>
                          <Text style={styles.vegType}>
                            {item.vegType}
                            {/* 아이템의 채식 유형 이름 표시 */}
                          </Text>
                        </View>
                      </TouchableScale>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <Line style={{ marginVertical: 16 }}></Line>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("DicTab", {
                  screen: "DicList",
                }),
                  setTimeout(() => {
                    navigation.navigate("DicTab", {
                      screen: "DicList",
                      params: {
                        type: "폴로 베지테리언", // 전체 제품을 필터로 설정
                        sortOption: "인기순", // 인기순으로 정렬
                        autoSearch: true, // 자동으로 검색을 트리거
                      },
                    });
                  }, 0);
              }}
              style={{
                marginTop: 16,
                ...styles.mainDicHeader,
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.mainDicTitle}>전체 인기순위</Text>
              <Octicons
                name="chevron-right"
                size={24}
                color={Gray_theme.gray_80}
              />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}>
              <FlatList
                ref={flatListRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topProductData} // 상태로 관리되는 제품 데이터를 사용
                keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <TouchableScale
                      onPress={() => {
                        const productID = item.id;
                        navigation.navigate("DicTab", {
                          screen: "DicList", // DicList로 먼저 이동
                        });

                        setTimeout(() => {
                          navigation.navigate("ProductInfo", {
                            id: productID,
                          }); // DicList에서 ProductInfo로 이동
                        }, 0); // DicList가 렌더링된 후 ProductInfo로 이동
                      }}
                    >
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={styles.image}
                      />

                      <View style={styles.textContainer}>
                        {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                        <Text style={styles.name}>
                          {truncateTextByWord(item.name, 8)}
                        </Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.vegType}>
                          {item.vegType}
                          {/* 아이템의 채식 유형 이름 표시 */}
                        </Text>
                      </View>
                    </TouchableScale>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={{ height: 80 }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Main_theme.main_30,
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
    flex: 1,
    borderTopRightRadius: 50,
    marginTop: 32,
  },
  mainDicHeader: {
    marginHorizontal: 24,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainDicContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  mainDicTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    color: Gray_theme.balck,
  },

  //flatList
  itemContainer: {
    marginRight: 24,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: Gray_theme.gray_20,
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    color: Gray_theme.balck,
    fontFamily: "Pretendard-SemiBold",
  },
  category: {
    marginTop: 2,
    fontSize: 12,
    color: Gray_theme.gray_60,
    fontFamily: "Pretendard-Regular",
  },
  vegType: {
    marginTop: 8,
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    backgroundColor: Main_theme.main_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
});
