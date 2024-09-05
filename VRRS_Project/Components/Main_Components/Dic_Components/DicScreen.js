import React from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  BackHandler,
  ToastAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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

export default function DicScreen({ route, navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
    const products = getAllProducts();
  }, []);

  // [상단 헤더의 검색창 영역에 관한 내용입니다.]

  // Search Context를 사용하기 위해 전역적으로 받아온 내용
  const { searchText, setSearchText, saveSearchText } =
    useContext(SearchContext);
  // SearchScreen에서 넘어온 파라미터
  const { text, triggerSubmit } = route.params || {};

  useEffect(() => {
    if (triggerSubmit) {
      handleOnSubmitEditing(); // 텍스트 반영 후, onSubmitEditing 동작 실행
    }
  }, [triggerSubmit]);

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 제품 리스트

  // 사용자가 검색했을 때 적용되는 함수입니다.
  const handleOnSubmitEditing = () => {
    if (searchText === "") {
      return showToastWithGravity();
    } else {
      saveSearchText();
    }
  };

  useEffect(() => {
    filterProducts(searchQuery); // 검색어가 변경될 때마다 필터링
  }, [searchQuery]);

  const filterProducts = (query) => {
    if (query === "") {
      setFilteredProducts(products); // 검색어가 비어있으면 전체 리스트 표시
    } else {
      const filteredList = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredProducts(filteredList); // 필터링된 리스트 업데이트
    }
  };

  // toast message를 띄워주기 위한 함수
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "검색어를 입력해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
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

  const sortProducts = () => {
    let sortedList = [...products]; // 원본 배열을 복사하여 정렬

    if (selectedOption === "등록순") {
      sortedList.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (selectedOption === "인기순") {
      sortedList.sort(
        (a, b) => b.likes + b.commentsCount - (a.likes + a.commentsCount)
      );
    }

    setSortedProducts(sortedList); // 정렬된 리스트 업데이트
  };

  // 화면 밖을 클릭했을 때 드롭다운 닫기
  const closeDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          onSubmitEditing={handleOnSubmitEditing}
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
          <Octicons name="chevron-down" size={16} color={Gray_theme.gray_80} />
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
                  <Octicons name="check" size={12} color={Main_theme.main_30} />
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
                  <Octicons name="check" size={12} color={Main_theme.main_30} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View></View>
      <FlatList
        style={{ paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
        data={sortedProducts}
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
                  <View>
                    <View></View>
                    <View></View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

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
    paddingVertical: 8,
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
  // 게인 사전, drop list가 있는 페이지
  firstHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
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
});
