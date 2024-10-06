import React, { useCallback, useLayoutEffect, useRef } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
// Data 관련 import
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes"; // 이용자 정보
import {
  getAllProducts,
  getVegTypeName,
  getProTypeName,
  products,
} from "../../../assets/ServerDatas/Dummy/dummyProducts"; // 제품 정보

export default function DicScreenOwn({ route, navigation }) {
  const { user, id, name, vegTypeName } = useUser();

  useTabBarVisibility(false);

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // FlatList의 참조
  const flatListRef = useRef(null);

  // 사전 항목 스크롤을 맨 처음으로 돌리는 함수
  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  // 화면이 포커싱 될 경우 사용되는 hook
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        scrollToTop();
      };
    }, [])
  );

  const [bookmark, setBookmark] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        개인 사전
      </BackHeader>
      <View
        style={{
          flex: 1,
          backgroundColor:
            bookmark === 0 ? Gray_theme.gray_20 : Gray_theme.white,
        }}
      >
        <View style={styles.bookMarkTotal}>
          <Text style={styles.bookMarkTitle}>총 북마크 수 </Text>
          <Text style={styles.bookMarkTitle}>{bookmark} 개</Text>
        </View>
        {bookmark === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 120,
            }}
          >
            <Text
              style={{
                marginTop: 16,
                color: Main_theme.main_50,
                fontFamily: "Pretendard-Bold",
              }}
            >
              북마크 한 제품이 없어요
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
            data={products}
            keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
            renderItem={({ item }) => {
              // 제품의 유형을 저장하는 변수
              const itemVegTypeName = getVegTypeName(item.veg_type_id);
              const itemProTypeName = getProTypeName(item.pro_type_id);
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
                    <Image
                      source={{ uri: item.img_path }}
                      style={styles.image}
                    />

                    <View style={styles.textContainer}>
                      {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                      <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>{itemProTypeName}</Text>
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
                        <Text style={styles.infoText}>{item.rec}</Text>
                      </View>
                      <View style={styles.infoContents}>
                        <Octicons
                          name="comment"
                          size={16}
                          color={Gray_theme.gray_40}
                          style={{ marginRight: 4 }}
                        />
                        <Text style={styles.infoText}>{item.review}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  bookMarkTotal: {
    backgroundColor: Gray_theme.white,
    flexDirection: "row",
    paddingHorizontal: 24,
    height: 60,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bookMarkTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: Gray_theme.balck,
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
