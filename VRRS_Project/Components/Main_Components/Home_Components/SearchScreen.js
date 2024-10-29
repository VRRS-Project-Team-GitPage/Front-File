import React, { useRef, useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
// Data 관련
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

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

  // 하단탭 숨김
  useTabBarVisibility(false);

  // 화면이 포커싱 되었을 때 언제나 검색창 비움
  useFocusEffect(
    useCallback(() => {
      setSearchText("");
    }, [])
  );

  // textInput에 해당하는 text를 입력해주는 함수
  const goToSearch = (text) => {
    textInputRef.current?.focus();
    setSearchText(text);
  };

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const [isFirstClick, setIsFirstClick] = useState(true); // 최초 클릭 여부 추적

  const handleSearch = () => {
    if (isFirstClick) {
      navigation.navigate("DicTab", {
        screen: "DicList", // DicList로 먼저 이동
      });

      setTimeout(() => {
        navigation.navigate("DicTab", {
          screen: "DicList",
          params: { text: searchText, triggerSubmit: true },
        }); // DicList에서 DicList 이동
      }, 0);
      setIsFirstClick(false);
    } else {
      navigation.navigate("DicTab", {
        screen: "DicList",
        params: { text: searchText, triggerSubmit: true },
      });
    }
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
              showToast("검색어를 입력해주세요");
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
