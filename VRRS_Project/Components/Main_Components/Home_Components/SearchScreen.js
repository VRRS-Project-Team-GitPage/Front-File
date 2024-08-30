import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import Octicons from "@expo/vector-icons/Octicons";

function SearchScreen({ navigation }) {
  useTabBarVisibility(false);
  const [searchText, setSearchText] = useState("");
  const textInputRef = useRef(null);
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const handleSearch = () => {
    navigation.navigate("Dic", {
      screen: "Dic",
      params: { Text: searchText },
    });

    setSearchText("");
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
          onPress={() => navigation.navigate("Home")}
        />
        <TextInput
          ref={textInputRef}
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
          onSubmitEditing={() => {
            if (searchText === "") {
              return alert("검색어를 입력해주세요");
            } else handleSearch();
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
      <View
        style={{
          paddingHorizontal: 24,
          marginVertical: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Pretendard-SemiBold" }}>최근 검색어</Text>
          <Text
            style={{
              fontFamily: "Pretendard-Medium",
              fontSize: 12,
              color: Gray_theme.gray_40,
            }}
          >
            모두 지우기
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
