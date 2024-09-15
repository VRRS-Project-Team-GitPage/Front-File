import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import Octicons from "@expo/vector-icons/Octicons";
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";

function SearchScreen({ navigation }) {
  const textInputRef = useRef();

  const {
    searchText,
    setSearchText,
    searchList,
    setSearchList,
    deleteList,
    deleteAllList,
    saveSearchText,
  } = useContext(SearchContext);

  useTabBarVisibility(false);

  // toast message를 띄워주기 위한 함수
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "검색어를 입력해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  // textInput에 해당하는 text를 입력해주는 함수
  const goToSearch = (text) => {
    textInputRef.current?.focus();
    setSearchText(text);
  };

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;

  const handleSearch = () => {
    navigation.navigate("DicTab", {
      screen: "DicList",
      params: { text: searchText, triggerSubmit: true },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Gray_theme.white }}>
      <View
        style={{
          height: 60,
          paddingHorizontal: 16,
          paddingVertical: 16,
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
              return showToastWithGravity();
            } else {
              saveSearchText();
              handleSearch();
            }
          }}
        />
        <Octicons
          name="x-circle-fill"
          size={16}
          color={Gray_theme.gray_50}
          style={{ position: "absolute", right: 40 }}
          onPress={() => {
            setSearchText("");
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 24, marginTop: 24, marginBottom: 16 }}>
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
            onPress={deleteAllList}
          >
            모두 지우기
          </Text>
        </View>
      </View>
      <FlatList
        data={searchList}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 4 }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              borderBottomWidth: 1,
              borderBlockColor: Gray_theme.gray_20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 24,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  goToSearch(item.text);
                }}
              >
                <Text style={{ color: Gray_theme.gray_40 }}>{item.text}</Text>
              </TouchableOpacity>
              <Octicons
                name="x"
                size={16}
                color={Gray_theme.gray_40}
                onPress={() => deleteList(item.id)}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default SearchScreen;
