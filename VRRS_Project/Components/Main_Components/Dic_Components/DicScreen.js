import React, { useLayoutEffect, useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet, ScrollView } from "react-native";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
// component 관련
import showToast from "../../../assets/styles/ReuseComponents/showToast";
import { truncateTextByWord } from "../../../assets/styles/ReuseComponents/truncateTextByWord";
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
// Data 관련 import
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  vegTypes,
  getVegTypeIdByName,
} from "../../../assets/ServerDatas/Dummy/dummyVegTypes"; // 이용자 정보
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext"; // 검색 정보
// server 관련 import
import {
  fetchDictionaryData,
  getProductData,
  getProductRankData,
} from "../../../assets/ServerDatas/ServerApi/dictionaryApi";

export default function DicScreen({ route, navigation }) {
  const { jwt, vegTypeName } = useUser();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 화면이 포커싱 될 때 하단바 유지
  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: "flex", // 탭바가 다시 나타나도록 설정
        height: 60,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        position: "absolute",
      },
    });
  }, [navigation]);

  // [ 화면 포커싱 시 유향 스크롤 뷰 위치를 조정 ]
  const scrollViewRef = useRef(null);

  // 유형 버튼 조정
  const [buttonLayouts, setButtonLayouts] = useState({}); // 각 버튼의 위치 저장

  const moveToSelectedButton = (btnType) => {
    if (buttonLayouts[btnType]) {
      const { x, width } = buttonLayouts[btnType];
      const scrollToPosition = x - width / 2; // 중앙으로 맞추기 위해 약간 보정
      scrollViewRef.current.scrollTo({ x: scrollToPosition, animated: true });
    }
  };

  // [ FlatList의 참조 ]
  const flatListRef = useRef(null);

  // 사전 항목 스크롤을 맨 처음으로 돌리는 함수
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  // [ 하단바 관련 ]
  const { tabClicked } = route.params || {};

  useEffect(() => {
    if (tabClicked) {
      // 탭이 클릭되었을 때 실행할 로직
      setSearchText("");
      checkTypeBtn(getVegTypeIdByName(vegTypeName));
      moveToSelectedButton(vegTypeName);
      setSortType("등록순");
      fetchData();
      scrollToTop();

      navigation.setParams({ tabClicked: false });
    }
  }, [tabClicked]);

  // [ 메인 화면으로부터 넘어오는 정보 ]
  const { type, autoSearch } = route.params || {};

  useEffect(() => {
    if (autoSearch) {
      setSortType("인기순");
      checkTypeBtn(getVegTypeIdByName(type));
      moveToSelectedButton(type);
      fetchData();
      scrollToTop();
    }
    navigation.setParams({ autoSearch: false });
  }, [autoSearch]);

  // [상단 헤더의 검색창 영역에 관한 내용입니다.]

  // Search Context를 사용하기 위해 전역적으로 받아온 내용
  const { searchText, setSearchText, saveSearchText } =
    useContext(SearchContext);
  // SearchScreen에서 넘어온 파라미터
  const { text, triggerSubmit } = route.params || {};

  useEffect(() => {
    if (triggerSubmit) {
      setSearchText(text);
      handleOnSubmitEditing(text); // 텍스트 반영 후, onSubmitEditing 동작 실행
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // 검색어를 기반으로 제품 필터링
  const handleOnSubmitEditing = async (query) => {
    // 초기화 후 데이터를 불러오고 필터링
    checkTypeBtn(6);
    moveToSelectedButton("폴로 베지테리언");
    saveSearchText(query);

    const fetchedData = await fetchData(); // 최신 데이터를 fetchData로부터 직접 가져옴

    // 입력된 검색어를 트림하여 앞뒤 공백 제거
    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      showToast("검색어를 입력해주세요");
    } else {
      // 새로 필터링을 위해 fetchData 호출
      const filteredList = fetchedData.filter((product) =>
        product.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      // 시간차 데이터 업데이트
      setTimeout(() => {
        setSortedProducts(filteredList);
      }, 0);
    }
  };

  // [ 사전 데이터 정렬 ]
  const [sortedProducts, setSortedProducts] = useState([]); // 최종 정렬된 제품 리스트
  const [sortType, setSortType] = useState("등록순"); // 기본은 '등록순'으로 설정
  const [checked, setChecked] = useState(6); // 유형 항목 체크에 관한 내용입니다.

  // 선택된 버튼에 따라 제품 리스트를 필터링 하는 함수
  // btnType: 버튼 유형을 받아오는 변수
  const handleSortChange = (newSortType) => {
    setSortType(newSortType); // 정렬 상태 업데이트
    scrollToTop();
  };

  const checkTypeBtn = (btnType) => {
    setChecked(btnType);
    scrollToTop();
  };

  const fetchData = async () => {
    let url = "";

    if (sortType === "인기순") {
      url = getProductRankData(checked); // 인기순 URL
    } else {
      url = getProductData(checked); // 등록순 URL
    }
    try {
      const data = await fetchDictionaryData(jwt, url);
      setSortedProducts(data); // 가져온 데이터 상태에 저장
      return data;
    } catch (error) {
      console.error(error.message);
      showToast("사전 데이터를 불러올 수 없습니다");
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortType, checked]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태

  // [드롭 다운 버튼에 관한 내용입니다.]

  // 드롭다운 상태를 토글하는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 화면 밖을 클릭했을 때 드롭다운 닫는 함수
  const closeDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // 개인 사전 안내용 메세지
  const toast = useToast();
  const handleToast = () => {
    toast.show("북마크 한 제품만 모아서 볼 수 있어요!", {
      type: "custom",
      placement: "bottom",
      duration: 3000,
      style: { ...styles.toastStyle, bottom: windowHeigh - 148 },
      textStyle: styles.toastFont,
      animationType: "slide-in",
    });
  };

  const [ownDic, setOwnDic] = useState(false);

  return (
    <SafeAreaView
      style={styles.container}
      onTouchEndCapture={() => {
        closeDropdown();
      }}
    >
      <View style={styles.searchHeader}>
        <Octicons
          name="arrow-left"
          size={24}
          color={Gray_theme.gray_90}
          style={{ marginRight: 16 }}
          onPress={() => {
            navigation.goBack();
            setSearchText("");
          }}
        />
        <TextInput
          style={{
            width: windowWidth - 72,
            ...styles.searchTextInput,
          }}
          placeholder="검색어를 입력해주세요"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          onSubmitEditing={() => {
            handleOnSubmitEditing(searchText);
          }}
        />
        <Octicons
          name="x-circle-fill"
          size={16}
          color={Gray_theme.gray_50}
          style={{
            position: "absolute",
            right: 40,
          }}
          onPress={() => {
            setSearchText("");
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.secondHeader}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            style={{ flexDirection: "row" }}
          >
            {vegTypes.map((type) => {
              const isSelected = type.id === checked;
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={type.id}
                  onPress={() => {
                    checkTypeBtn(type.id); // type.id 값을 전달하여 상태 변경
                    moveToSelectedButton(type.name); // 이름으로 스크롤 이동
                  }}
                  onLayout={(event) => {
                    // 버튼 위치와 너비 저장
                    const { x, width } = event.nativeEvent.layout;
                    setButtonLayouts((prevLayouts) => ({
                      ...prevLayouts,
                      [type.name]: { x, width },
                    }));
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: Gray_theme.gray_20,
                  }}
                >
                  <View
                    style={{
                      borderBottomWidth: isSelected ? 3 : null,
                      borderColor: Main_theme.main_30,
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected
                          ? Main_theme.main_30
                          : Gray_theme.gray_40,
                        fontFamily: isSelected
                          ? "Pretendard-Bold"
                          : "Pretendard-Medium",
                        fontSize: 14,
                        marginHorizontal: 12,
                        marginBottom: 12,
                        alignSelf: "center",
                      }}
                    >
                      {type.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: 3,
                    }}
                  ></View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.firstHeader}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ flexDirection: "row", alignItems: "center" }}
              onPressIn={() => {
                setOwnDic(true);
              }}
              onPressOut={() => {
                setOwnDic(false);
              }}
              onPress={() => {
                navigation.navigate("OwnDic");
              }}
            >
              <Octicons
                name="check"
                size={16}
                color={!ownDic ? Gray_theme.gray_40 : Main_theme.main_30}
              />
              <Text
                style={{
                  marginLeft: 8,
                  color: !ownDic ? Gray_theme.gray_40 : Gray_theme.balck,
                  fontSize: 12,
                  fontFamily: !ownDic
                    ? "Pretendard-Medium"
                    : "Pretendard-SemiBold",
                }}
              >
                개인 사전
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToast}>
              <Octicons
                name="question"
                size={12}
                color={Gray_theme.gray_40}
                style={{
                  marginLeft: 6,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.firstBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{sortType}</Text>
            <Octicons
              name="chevron-down"
              size={16}
              color={Gray_theme.gray_80}
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              <TouchableOpacity
                onPress={() => {
                  handleSortChange("등록순");
                  scrollToTop();
                }}
              >
                <View style={styles.dropdownItemContainer}>
                  <Text
                    style={[
                      styles.dropdownItem,
                      sortType === "등록순" && styles.selectedOptionText,
                    ]}
                  >
                    등록순
                  </Text>
                  {sortType === "등록순" && (
                    <Octicons
                      name="check"
                      size={12}
                      color={Main_theme.main_30}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortChange("인기순");
                  scrollToTop();
                }}
              >
                <View style={styles.dropdownItemContainer}>
                  <Text
                    style={[
                      styles.dropdownItem,
                      sortType === "인기순" && styles.selectedOptionText,
                    ]}
                  >
                    인기순
                  </Text>
                  {sortType === "인기순" && (
                    <Octicons
                      name="check"
                      size={12}
                      color={Main_theme.main_30}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {sortedProducts.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 120,
            }}
          >
            <Image
              source={MainIcons.fail}
              style={{ width: 120, height: 120 }}
            ></Image>
            <Text
              style={{
                marginTop: 16,
                color: Main_theme.main_50,
                fontFamily: "Pretendard-Bold",
              }}
            >
              검색 결과가 없어요...
            </Text>
            <Text
              style={{
                marginBottom: 24,
                color: Main_theme.main_50,
                fontFamily: "Pretendard-Bold",
              }}
            >
              다른 검색어를 입력해주세요.
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            style={{ paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
            data={sortedProducts}
            keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
            renderItem={({ item }) => {
              // 버튼 여부와 제품의 유형을 비교하는 로직 추가하기
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    const productID = item.id;
                    navigation.navigate("ProductInfo", {
                      id: productID,
                    });
                  }}
                >
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.imgUrl }} style={styles.image} />

                    <View style={styles.textContainer}>
                      {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                      <View
                        style={{
                          marginBottom: 20,
                        }}
                      >
                        <Text style={styles.name}>
                          {truncateTextByWord(item.name, 16)}
                        </Text>
                        <Text style={styles.category}>{item.category}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.vegType}>
                          {item.vegType}
                          {/* 아이템의 채식 유형 이름 표시 */}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemInfo}>
                      <View style={styles.infoContents}>
                        <Octicons
                          name="thumbsup"
                          size={16}
                          color={Gray_theme.gray_40}
                          style={{
                            marginRight: 4,
                            marginBottom: 2,
                          }}
                        />
                        <Text style={styles.infoText}>{item.recCnt}</Text>
                      </View>
                      <View style={styles.infoContents}>
                        <Octicons
                          name="comment"
                          size={16}
                          color={Gray_theme.gray_40}
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.infoText}>
                          {item.recCnt + item.notRecCnt}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        )}
      </View>
      <View style={{ height: 60 }}></View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  searchHeader: {
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  searchTextInput: {
    height: 40,
    backgroundColor: Gray_theme.gray_20,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 48,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
  },
  // 개인 사전, drop list가 있는 페이지
  firstHeader: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Gray_theme.gray_20,
  },
  buttonText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    marginRight: 6,
    color: Gray_theme.gray_80,
  },
  dropdownList: {
    backgroundColor: Gray_theme.white,
    borderRadius: 20,
    elevation: 3,
    justifyContent: "center",
    width: 86,
    position: "absolute", // 드롭다운을 버튼 아래에 위치시키기 위해
    top: 60, // 버튼 아래로 44px 떨어지게 설정

    right: 24,
    padding: 4,
    zIndex: 1000, // 다른 요소들보다 위에 위치
  },
  dropdownItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItem: {
    alignItems: "baseline",
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    marginRight: 6,
    color: Gray_theme.gray_80,
  },
  selectedOptionText: {
    color: Main_theme.main_30, // 선택된 옵션의 텍스트 색상 변경
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
  },

  secondHeader: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexDirection: "row",
    borderColor: Gray_theme.gray_20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    paddingVertical: 4,
    marginLeft: 16,
  },
  name: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: Gray_theme.balck,
    marginBottom: 4,
  },
  category: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
  vegType: {
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    backgroundColor: Main_theme.main_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 24,
    bottom: 16,
  },
  infoContents: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  infoText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 8,
    color: Gray_theme.gray_40,
  },
  // 토스트 메세지 관련
  toastStyle: {
    opacity: 0.8,
    position: "absolute",
    left: 100,
    backgroundColor: Gray_theme.gray_20,
    borderWidth: 1,
    borderColor: Gray_theme.gray_30,
    borderRadius: 12,
  },
  toastFont: {
    color: Gray_theme.gray_60,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
  },
});
