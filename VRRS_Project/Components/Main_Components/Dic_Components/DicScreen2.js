import React, { useCallback } from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet, ScrollView } from "react-native";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";
// 제품 정보 import
import {
  getAllProducts,
  getVegTypeName,
  products,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";
// style 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";

export default function DicScreen2({ route, navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
    const products = getAllProducts();
  }, []);

  // 화면이 포커싱 될 경우 사용되는 hook
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // 화면이 포커싱 될 경우 해당 옵션을 default로
        setSearchText("");
        setChecked("전체");
        checkTypeBtn("전체");
        selectOption("등록순");
        sortProducts();
      };
    }, [])
  );

  // [상단 헤더의 검색창 영역에 관한 내용입니다.]

  // Search Context를 사용하기 위해 전역적으로 받아온 내용
  const { searchText, setSearchText, saveSearchText } =
    useContext(SearchContext);
  // SearchScreen에서 넘어온 파라미터
  const { text, triggerSubmit } = route.params || {};

  useEffect(() => {
    if (triggerSubmit) {
      handleOnSubmitEditing(text); // 텍스트 반영 후, onSubmitEditing 동작 실행
    }
  }, [triggerSubmit]);

  useEffect(() => {
    sortProducts();
  }, [handleOnSubmitEditing]);

  const handleOnSubmitEditing = (query) => {
    if (query === "") {
      sethCeckedFilterList(sortedProducts);
      setChecked("전체");
      checkTypeBtn("전체");
    } else {
      const filteredList = checkedFilterList.filter(
        (product) =>
          product.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          product.category
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          product.ingredients.some((ingredient) =>
            ingredient.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          )
      );
      saveSearchText();
      sethCeckedFilterList(filteredList);
    }
  };

  // [드롭 다운 버튼에 관한 내용입니다.]

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedOption, setSelectedOption] = useState("등록순"); // 선택된 옵션
  const [sortedProducts, setSortedProducts] = useState([]); // 정렬된 제품 리스트

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 상태를 토글
  };

  const selectOption = (option) => {
    setSelectedOption(option); // 옵션 선택 시 상태 업데이트
    setIsDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  useEffect(() => {
    sortProducts(); // 옵션 선택 시마다 정렬
  }, [selectedOption]);

  useEffect(() => {
    checkTypeBtn(checked); // sortedProducts가 변경될 때마다 필터링
  }, [sortedProducts]);

  const sortProducts = () => {
    let sortedList = [...products];

    if (selectedOption === "등록순") {
      sortedList.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (selectedOption === "인기순") {
      sortedList.sort(
        (a, b) => b.likes + b.commentsCount - (a.likes + a.commentsCount)
      );
    }

    if (searchText) {
      sortedList = sortedList.filter(
        (product) =>
          product.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          product.category
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          product.ingredients.some((ingredient) =>
            ingredient
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
      );
    }

    if (checked !== "전체") {
      sortedList = sortedList.filter(
        (product) => getVegTypeName(product.veg_type_id) === checked
      );
    }

    setSortedProducts(sortedList);
    sethCeckedFilterList(sortedList);
  };

  // 화면 밖을 클릭했을 때 드롭다운 닫기
  const closeDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // 유형 항목 체크에 관한 내용입니다.
  const [checked, setChecked] = useState("전체");
  // 선택한 버튼에 따라 필터된 유형을 저장합니다.
  const [checkedFilterList, sethCeckedFilterList] = useState([]);

  // 선택된 버튼에 따라 제품 리스트를 필터링 하는 함수
  // btnType: 버튼 유형을 받아오는 변수
  const checkTypeBtn = (btnType) => {
    setChecked(btnType);

    let filteredList = [...sortedProducts];

    if (searchText) {
      filteredList = filteredList.filter(
        (product) =>
          product.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          product.category
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          product.ingredients.some((ingredient) =>
            ingredient
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
      );
    }

    if (btnType !== "전체") {
      filteredList = filteredList.filter(
        (product) => getVegTypeName(product.veg_type_id) === btnType
      );
    }

    sethCeckedFilterList(filteredList);
  };

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
            style={{ flexDirection: "row" }}
          >
            {vegTypes
              .map((type) => type.name)
              .map((btnType) => {
                const isSelected = btnType === checked;
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    key={btnType}
                    onPress={() => {
                      checkTypeBtn(btnType);
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
                        {btnType}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="check" size={16} color={Gray_theme.gray_40} />
            <Text
              style={{
                marginLeft: 8,
                color: Gray_theme.gray_40,
                fontSize: 12,
                fontFamily: "Pretendard-Medium",
              }}
            >
              개인 사전
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.firstBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{selectedOption}</Text>
            <Octicons
              name="chevron-down"
              size={16}
              color={Gray_theme.gray_80}
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              <TouchableOpacity onPress={() => selectOption("등록순")}>
                <View style={styles.dropdownItemContainer}>
                  <Text
                    style={[
                      styles.dropdownItem,
                      selectedOption === "등록순" && styles.selectedOptionText,
                    ]}
                  >
                    등록순
                  </Text>
                  {selectedOption === "등록순" && (
                    <Octicons
                      name="check"
                      size={12}
                      color={Main_theme.main_30}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption("인기순")}>
                <View style={styles.dropdownItemContainer}>
                  <Text
                    style={[
                      styles.dropdownItem,
                      selectedOption === "인기순" && styles.selectedOptionText,
                    ]}
                  >
                    인기순
                  </Text>
                  {selectedOption === "인기순" && (
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
        <FlatList
          style={{ paddingHorizontal: 8 }}
          showsVerticalScrollIndicator={false}
          data={checkedFilterList}
          keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
          renderItem={({ item }) => {
            // 제품의 유형을 저장하는 변수
            const itemVegTypeName = getVegTypeName(item.veg_type_id);
            // 버튼 여부와 제품의 유형을 비교하는 로직 추가하기
            return (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image_url }} style={styles.image} />

                <View style={styles.textContainer}>
                  {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.vegType}>
                      {itemVegTypeName}
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
                    <Text style={styles.infoText}>{item.likes}</Text>
                  </View>
                  <View style={styles.infoContents}>
                    <Octicons
                      name="comment"
                      size={16}
                      color={Gray_theme.gray_40}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.infoText}>{item.commentsCount}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
    width: 88,
    height: 88,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  name: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },
  category: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
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
});
