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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";
import {
  getAllProducts,
  getVegTypeName,
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

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // 유형 선택 여부를 저장하는 변수
  const [selectedId, setSelectedId] = useState(null);

  // 선택된 버튼의 ID에 따라 제품을 필터링합니다.
  const filterProducts = (id) => {
    // 선택된 ID가 없으면 기본적으로 모든 제품을 표시합니다.
    const maxId = id !== null ? id : 6;
    return products.filter((product) => product.veg_type_id <= maxId);
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
        <View style={styles.firstBtn}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 12,
              marginRight: 6,
              color: Gray_theme.gray_80,
            }}
          >
            등록순
          </Text>
          <Octicons name="chevron-down" size={16} color={Gray_theme.gray_80} />
        </View>
      </View>
      <View></View>
      <FlatList
        style={{ paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
        data={productData}
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
  firstHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstBtn: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Gray_theme.gray_20,
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
