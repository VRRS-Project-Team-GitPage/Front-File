import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import Octicons from "@expo/vector-icons/Octicons";

// AsyncStorage에서 데이터를 가져올 때 사용할 키
const STORAGE_KEY = "@Search_List";

function SearchScreen({ navigation }) {
  const textInputRef = useRef();
  useEffect(() => {
    loadSearchList();
  }, []);

  // toast message를 띄워주기 위한 함수
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "검색어를 입력해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };
  useTabBarVisibility(false);

  // textInput에 작성되는 text
  const [searchText, setSearchText] = useState("");
  // 로컬 저장소에서 불러온 리스트를 저장하는 state
  const [searchList, setSearchList] = useState([]);

  // 입력된 텍스트를 저장하고 리스트를 업데이트하는 함수
  const saveSearchText = async () => {
    const checkIdx = searchList.findIndex((item) => item.text === searchText);
    if (checkIdx !== -1) {
      const newList = [...searchList];
      const item = newList[checkIdx];
      newList.splice(checkIdx, 1);
      const saveNewList = [item, ...newList];

      // 업데이트 된 리스트를 반영
      setSearchList(saveNewList);
      // 업데이트 된 리스트를 AsyncStorage에 저장
      await saveSearchList(saveNewList);
      // textInput 초기화
      setSearchText("");
    } else {
      const newList = [
        {
          id: Date.now(),
          text: searchText,
        },
        ...searchList,
      ];

      // 리스트의 길이가 20개를 넘으면, 가장 오래된 항목을 제거
      if (newList.length > 20) {
        newList.pop(); // 배열의 마지막 항목 제거
      }

      // 업데이트 된 리스트를 반영
      setSearchList(newList);
      // 업데이트 된 리스트를 AsyncStorage에 저장
      await saveSearchList(newList);
      // textInput 초기화
      setSearchText("");
    }

    handleSearch();
  };

  // list의 항목을 지우는 함수
  // id => 지우고 싶은 항목의 id
  const deleteList = async (id) => {
    const newList = searchList.filter((item) => item.id != id);
    setSearchList(newList);
    await saveSearchList(newList);
  };

  // list의 모든 항목을 지우는 함수
  // id => 지우고 싶은 항목의 id
  const deleteAllList = async (id) => {
    setSearchList([]);
    await saveSearchList([]);
  };

  // 리스트를 AsyncStorage에 저장하는 함수
  const saveSearchList = async (newList) => {
    const saveNewList = JSON.stringify(newList);
    await AsyncStorage.setItem(STORAGE_KEY, saveNewList);
  };

  // AsyncStorage에서 리스트를 불러오는 함수
  const loadSearchList = async () => {
    const load_lists = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedLists = load_lists ? JSON.parse(load_lists) : []; // JSON.parse: String => Object 변환 / Null 체크 추가
    setSearchList(parsedLists);
  };

  // textInput에 해당하는 text를 입력해주는 함수
  const goToSearch = (text) => {
    textInputRef.current?.focus();
    setSearchText(text);
  };

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const handleSearch = () => {
    navigation.navigate("Dic", {
      screen: "Dic",
      params: { Text: searchText },
    });
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
              return showToastWithGravity();
            } else {
              saveSearchText();
            }
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
          marginTop: 24,
          marginBottom: 16,
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
                onPress={(t) => {
                  goToSearch(item.text);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: Gray_theme.gray_40 }}>{item.text}</Text>
                </View>
              </TouchableOpacity>
              <Octicons
                name="x"
                size={16}
                color={Gray_theme.gray_40}
                onPress={() => {
                  deleteList(item.id);
                }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default SearchScreen;
