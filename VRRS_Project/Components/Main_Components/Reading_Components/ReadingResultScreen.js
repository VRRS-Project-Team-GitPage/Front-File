import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
// assets 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MainIcons from "../../../assets/Icons/MainIcons";
// Component 관련
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";
import IngredientModal from "./IngredientModal/IngredientModal";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// Data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  getAllProducts,
  getProTypeName,
  getVegTypeName,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";
import BarIcons from "../../../assets/Icons/BarIcons";

export default function ReadingResultScreen({ navigation, route }) {
  // user의 정보를 불러옴
  const { user, id, name, vegTypeName } = useUser();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const { img_path, name_pro, ingredients, triggerSubmit } = route.params || {};
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkImage, setCheckImage] = useState();

  // 넘어온 사진 로드
  useEffect(() => {
    if (triggerSubmit) {
      setIsLoaded(true);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // 이미지 리사이징 함수
  const resizeImage = async (imageUri) => {
    try {
      // 1. 먼저 원본 이미지의 크기를 가져온다
      const originalImage = await ImageManipulator.manipulateAsync(
        imageUri,
        []
      );

      const originalWidth = originalImage.width;
      const originalHeight = originalImage.height;

      // 2. 가로 세로 비율 유지하면서 축소
      const maxWidth = 300; // 원하는 최대 가로 크기
      const maxHeight = 300; // 원하는 최대 세로 크기

      const aspectRatio = originalWidth / originalHeight;

      let resizeWidth = maxWidth;
      let resizeHeight = maxHeight;

      if (aspectRatio > 1) {
        // 가로가 더 긴 경우
        resizeHeight = maxWidth / aspectRatio;
      } else {
        // 세로가 더 긴 경우
        resizeHeight = maxHeight / aspectRatio;
      }

      // 3. 이미지 축소
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: resizeWidth, height: resizeHeight } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      return resizedImage.uri;
    } catch (error) {
      console.error("Image resizing error: ", error);
    }
  };

  // 이미지가 로드되었을 때, 비율을 유지한 채로 리사이즈
  useEffect(() => {
    if (isLoaded) {
      resizeImage(img_path).then((resizedUri) => {
        setCheckImage(resizedUri);
      });
    }
  }, [isLoaded]);

  // 판독 가능 여부를 저장
  const [readingPossible, setReadingPossible] = useState(false);
  // 섭취 가능 여부를 저장
  // 서버와 연동 후 기본값: null
  const [resultPossible, setResultPossible] = useState(true);
  // 판독 불가 리스트 여부를 저장
  const [readCancleList, setReadCancleList] = useState(false);
  // 섭취 가능할 때 제품이 사전에 있는지 여부를 저장
  const [inDictionary, setInDictionary] = useState(true);
  // 제품 정보를 저장하는 state
  const [productData, setProductData] = useState([]);
  // 필터된 제품 리스트를 저장하는 변수
  const [filterList, setFilterList] = useState([]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
    const products = getAllProducts();
    setProductData(products);
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      filterUserType();
    }
  }, [productData]);

  const filterUserType = () => {
    let sortedList = [...productData].sort(
      (a, b) => b.rec + b.review - (a.rec + a.review)
    );
    setFilterList(sortedList);
  };

  const scrollViewRef = useRef(null);

  // 스크롤뷰를 처음으로 돌리는 함수
  const scrollViewReturn = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

  // 원재료명 확인 모달창 제어
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <IngredientModal
        visible={visible}
        onRequestClose={handleVisible}
        onPress={() => {
          navigation.navigate("Report");
          handleVisible();
        }}
        ingredientText={ingredients}
      />
      <NomalHeader
        onPress={() => {
          navigation.navigate("HomeTab", {
            screen: "Home",
          });
        }}
      >
        판독 결과
      </NomalHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.resultContainer}>
          <View style={styles.imgContainer}>
            {isLoaded ? (
              <Image
                source={{ uri: checkImage }}
                style={styles.resultImg}
              ></Image>
            ) : (
              <ActivityIndicator size="large" color={Gray_theme.gray_20} />
            )}
          </View>
          <View style={styles.resultPossibleContainer}>
            <Text style={styles.resultInfoText}>
              {readingPossible
                ? resultPossible
                  ? "이 제품은 먹을 수 있어요!"
                  : "이 제품은 먹을 수 없어요..."
                : "판독에 실패했어요..."}
            </Text>
            <Text
              style={{
                ...styles.resultPossible,
                color: readingPossible
                  ? resultPossible
                    ? Main_theme.main_30
                    : Main_theme.main_reverse
                  : Gray_theme.gray_80,
              }}
            >
              {readingPossible
                ? resultPossible
                  ? "섭취 가능"
                  : "섭취 불가능"
                : "판독 불가능"}
            </Text>
          </View>

          <View
            style={{
              ...styles.infoTextContainer,
              backgroundColor: readingPossible
                ? readCancleList
                  ? Gray_theme.gray_40
                  : Main_theme.main_20
                : Gray_theme.gray_40,
            }}
          >
            {readingPossible ? (
              <View>
                {readCancleList ? ( // 판독 불가능 원재료명이 있는 경우
                  <Text
                    style={{
                      ...styles.userTypebg,
                      backgroundColor: Main_theme.main_Medium,
                      color: Gray_theme.gray_80,
                    }}
                    onPress={() => {
                      setReadCancleList(false);
                    }}
                  >
                    확인 필요
                  </Text>
                ) : (
                  <Text
                    style={styles.userTypebg}
                    onPress={() => {
                      setReadCancleList(true);
                    }}
                  >
                    인증 완료
                  </Text>
                )}
              </View>
            ) : (
              <Text
                style={{
                  ...styles.userTypebg,
                  backgroundColor: Main_theme.main_reverse,
                  color: Gray_theme.white,
                }}
                onPress={() => {
                  setReadingPossible(true);
                }}
              >
                판독 실패
              </Text>
            )}
            {readingPossible ? (
              <View>
                {readCancleList ? (
                  <View>
                    <Text style={styles.infoText}>
                      판독에 사용되지 못한 단어들이 있습니다.
                    </Text>
                    <Text style={styles.infoText}>
                      결과가 정확하지 않을 수 있으니 확인해주세요.
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 12,
                      }}
                    >
                      <Octicons
                        name="question"
                        size={12}
                        color={Main_theme.main_reverse}
                        style={{
                          marginRight: 6,
                        }}
                      />
                      <Text
                        style={{
                          ...styles.infoText,
                          color: Main_theme.main_reverse,
                        }}
                      >
                        판독 불가 목록
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.infoText}>
                      {name}님의 유형으로 제품을 판독한 결과입니다.
                    </Text>
                    <Text style={styles.infoText}>
                      원재료명을 확인하고 더 자세한 결과를 알아보세요.
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <Text style={styles.infoText}>
                  원재료명을 읽는데 실패했어요.
                </Text>
                <Text style={styles.infoText}>
                  원재료명을 수정하거나 사진을 변경해주세요.
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.checkIngre}
            onPress={() => {
              if (readingPossible) {
                setVisible(true);
              } else {
                showToast("확인할 원재료명이 없습니다");
              }
            }}
          >
            <Octicons name="search" size={20} color={Gray_theme.gray_60} />
            <Text
              style={{
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.gray_70,
                marginHorizontal: 12,
              }}
            >
              원재료명 확인하기
            </Text>
          </TouchableOpacity>
        </View>
        {readingPossible ? (
          <View>
            {resultPossible ? (
              <View style={styles.otherContents}>
                {inDictionary ? (
                  <View style={styles.recListContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.inDictionaryBtn}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Image
                          source={BarIcons.dicIcon_C}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 12,
                            tintColor: Main_theme.main_30,
                          }}
                        ></Image>
                        <Text
                          style={{
                            fontFamily: "Pretendard-SemiBold",
                            color: Gray_theme.gray_90,
                          }}
                        >
                          사전에 등록된 제품이에요!
                        </Text>
                      </View>
                      <Octicons
                        name="chevron-right"
                        size={24}
                        color={Gray_theme.gray_80}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableScale
                      style={styles.ocBtn}
                      onPress={() => {
                        navigation.navigate("Upload", {
                          name: name_pro,
                        });
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Text style={styles.infoText}>
                            앗! 사전에 없는 제품이에요
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                ...styles.ocBtnTitle,
                                color: Main_theme.main_30,
                                marginRight: 6,
                              }}
                            >
                              제품
                            </Text>
                            <Text style={styles.ocBtnTitle}>등록하기</Text>
                          </View>
                        </View>
                        <Image
                          source={MainIcons.dictionary}
                          style={styles.ocIcon}
                        ></Image>
                      </View>
                    </TouchableScale>
                    <View style={{ height: 20 }}></View>
                  </View>
                )}
              </View>
            ) : null}
            <View style={styles.otherContentsC}>
              <View style={styles.otherContentsTitle}>
                <Text style={{ ...styles.ocTitle }}>이런 제품은 어떠세요?</Text>
              </View>
              <View style={styles.mainDicContainer}>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={filterList.slice(0, 50)} // 상태로 관리되는 제품 데이터를 사용
                  keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
                  renderItem={({ item }) => {
                    const itemVegTypeName = getVegTypeName(item.veg_type_id);
                    if (itemVegTypeName !== vegTypeName) {
                      return null;
                    }
                    // 일치할 경우에만 해당 아이템을 렌더링
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
                            source={{ uri: item.img_path }}
                            style={styles.image}
                          />

                          <View style={styles.textContainer}>
                            {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.category}>
                              {getProTypeName(item.pro_type_id)}
                            </Text>
                            <Text style={styles.vegType}>
                              {itemVegTypeName}
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

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Button
                title="섭취 가능/사전 등록"
                onPress={() => {
                  setResultPossible(true);
                  setInDictionary(true);
                }}
              ></Button>
              <Button
                title="섭취 가능/사전 미등록"
                onPress={() => {
                  setResultPossible(true);
                  setInDictionary(false);
                }}
              ></Button>
              <Button
                title="섭취 불가능"
                onPress={() => {
                  setResultPossible(false);
                  setInDictionary(false);
                }}
              ></Button>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginBottom: 24,
            }}
          ></View>
        )}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <BtnC
          onPress={() => {
            navigation.navigate("BottomSheet");
          }}
        >
          다른 제품 확인하기
        </BtnC>
      </View>
      <View
        style={{
          height: 24,
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 전체
  container: {
    flex: 1,
    backgroundColor: Main_theme.main_10,
  },
  // 결과 화면
  resultContainer: {
    marginTop: 16,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: Gray_theme.white,
  },
  imgContainer: {
    marginTop: 32,
    paddingVertical: 12,
    alignItems: "center",
  },
  resultImg: {
    width: 300,
    height: 300,
  },
  resultPossibleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resultPossible: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 32,
    textAlign: "center",
  },
  resultInfoText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_80,
  },
  infoTextContainer: {
    width: "100%",
    marginVertical: 16,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  userTypebg: {
    backgroundColor: Main_theme.main_10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    marginBottom: 12,
  },
  infoText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_90,
  },
  checkIngre: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  // 사전 O
  recListContainer: {
    marginTop: 16,
  },
  inDictionaryBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    backgroundColor: Gray_theme.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // 유사 제품 추천
  otherContents: {},
  otherContentsC: {
    backgroundColor: Gray_theme.white,
    marginTop: 16,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  otherContentsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  ocTitle: {
    fontFamily: "Pretendard-Bold",
    color: Gray_theme.balck,
    marginVertical: 8,
  },
  // 유사 제품 추천 - 추천 사전 목록
  mainDicContainer: {
    marginTop: 4,
  },
  itemContainer: {
    marginRight: 10,
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
  // 사전 미등록
  ocBtn: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Gray_theme.white,
  },
  ocBtnTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 24,
  },
  ocIcon: {
    width: 180,
    height: 180,
    position: "absolute",
    right: 0,
    top: -46,
  },
});
