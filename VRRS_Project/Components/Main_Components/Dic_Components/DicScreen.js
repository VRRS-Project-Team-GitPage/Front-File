import React from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  BackHandler,
  ToastAndroid,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";
import {
  getAllProducts,
  getVegTypeName,
  products,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";

export default function DicScreen({ route, navigation }) {
  // Search Context를 사용하기 위해 전역적으로 받아온 내용
  const { searchText, setSearchText, saveSearchText } =
    useContext(SearchContext);
  // SearchScreen에서 넘어온 파라미터
  const { text, triggerSubmit } = route.params || {};

  // 제품 정보를 저장하는 state
  const [productData, setProductData] = useState([]);
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
    const products = getAllProducts();
    setProductData(products);
  }, []);

  useEffect(() => {
    if (triggerSubmit) {
      handleOnSubmitEditing(); // 텍스트 반영 후, onSubmitEditing 동작 실행
    }
  }, [triggerSubmit]);

  // toast message를 띄워주기 위한 함수
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "검색어를 입력해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  // 사용자가 검색했을 때 적용되는 함수입니다.
  const handleOnSubmitEditing = () => {
    if (searchText === "") {
      return showToastWithGravity();
    } else {
      saveSearchText();
    }
  };

  // 사용자가 뒤로가기를 눌렀을 경우 TextInput을 비우는 함수
  const backAction = () => {
    //boolean 값을 부여하지 않는 경우 -> 그대로 어플리케이션이 종료됨
    if (navigation?.canGoBack()) {
      setSearchText("");
      navigation.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
  }, [backAction]);

  // 사전의 등록순 / 인기순 정렬 버튼: 기본값으로 '등록순' 설정
  const [sortOrder, setSortOrder] = useState("등록순");
  const [sortedProducts, setSortedProducts] = useState(products); // 기본 제품 목록을 상태로 설정

  // 정렬 버튼의 옵션에 사전의 항목을 정렬하는 함수
  const sortProducts = (order) => {
    let sortedList = [...products];
    if (order === "등록순") {
      sortedList.sort(
        // 항목별로 등록 날짜를 비교하여 정렬
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (order === "인기순") {
      sortedList.sort(
        (a, b) => b.likes + b.commentsCount - (a.likes + a.commentsCount)
      );
    }
    setSortedProducts(sortedList);
  };

  React.useEffect(() => {
    sortProducts(sortOrder);
  }, []);

  // 정렬 버튼을 눌렀을 때 호출할 함수
  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    sortProducts(order);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedOption, setSelectedOption] = useState("등록순"); // 선택된 옵션

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 드롭다운 상태를 토글
  };

  const selectOption = (option) => {
    setSelectedOption(option); // 옵션 선택 시 상태 업데이트
    setIsDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
  };

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

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
        <View>
          <TouchableOpacity onPress={toggleDropdown} style={styles.firstBtn}>
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
                <Text style={styles.dropdownItem}>등록순</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectOption("인기순")}>
                <Text style={styles.dropdownItem}>인기순</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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

  // 등록순 / 인기순 버튼
  firstBtn: {
    flexDirection: "row",
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
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // 드롭다운을 버튼 아래에 위치시키기 위해
    top: 44, // 버튼 아래로 40px 떨어지게 설정
    left: 0,
    right: 0,

    zIndex: 1000, // 다른 요소들보다 위에 위치
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Gray_theme.gray_80,
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
