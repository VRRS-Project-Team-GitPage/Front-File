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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";

export default function DicScreen({ route, navigation }) {
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
      navigation.navigate("Home");
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Gray_theme.white,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
            height: 40,
            width: windowWidth - 72,
            backgroundColor: Gray_theme.gray_20,
            borderRadius: 10,
            paddingLeft: 16,
            paddingRight: 48,
            fontFamily: "Pretendard-Medium",
            fontSize: 12,
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
