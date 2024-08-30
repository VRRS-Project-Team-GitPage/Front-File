import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { useState, useEffect } from "react";
// Server data를 사용하기 위해 저장한 component들을 import(현재는 더미 데이터를 사용)
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
// 클릭 시 적용되는 애니메이션 Component
import TouchableScale from "../../../assets/styles/TouchableScale";
import { StyleSheet, useWindowDimensions, FlatList } from "react-native";
// StatusBar 영역을 확보하기 위해 import
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";

import {
  getAllProducts,
  getVegTypeName,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";

export default function HomeScreen({ navigation }) {
  // user의 정보를 불러옴
  const { user } = useUser();

  // 제품 정보를 저장하는 state
  const [productData, setProductData] = useState([]);
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
    const products = getAllProducts();
    setProductData(products);
  }, []);

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>유저 정보 로딩 중...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.header}>
        <Image
          source={MainIcons.mainLogo}
          style={{
            width: 48,
            height: 48,
          }}
        ></Image>
        <TouchableOpacity
          style={{ justifyContent: "center", marginHorizontal: 24 }}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MainSearch")}
        >
          <View
            style={{
              width: windowWidth - 120,
              ...styles.headerTextInput,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: 12,
                color: Main_theme.main_50,
              }}
            >
              다양한 제품들을 만나보세요
            </Text>
            <Octicons
              name="x-circle-fill"
              size={16}
              color={Main_theme.main_50}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
        <View style={styles.topContents}>
          <View style={styles.mainTitle}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 20,
                  color: Gray_theme.balck,
                }}
              >
                반가워요, {""}
              </Text>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 20,
                  color: Main_theme.main_50,
                }}
              >
                {user.username}님!
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                color: Gray_theme.balck,
              }}
            >
              오늘도 함께 채식을 실천해요!
            </Text>
          </View>
          <TouchableScale
            activeOpacity={0.8}
            style={{ justifyContent: "center" }}
            onPress={() => navigation.navigate("Reco")}
          >
            <View
              style={{
                alignSelf: "center",
                width: windowWidth - 48,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor: Gray_theme.white,

                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  marginHorizontal: 24,
                  marginVertical: 24,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Pretendard-Medium",
                    fontSize: 12,
                    color: Gray_theme.gray_70,
                  }}
                >
                  무엇을 먹어야 할까? 고민될 때!
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: 16,
                    color: Gray_theme.balck,
                  }}
                >
                  지금 추천받기
                </Text>
              </View>
              <Image
                source={MainIcons.paper}
                style={{
                  width: 120,
                  height: 120,
                  position: "absolute",
                  bottom: 4,
                  right: 16,
                }}
              ></Image>
            </View>
          </TouchableScale>
        </View>
        <View style={styles.mainContents}>
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              style={{
                marginTop: 32,
                ...styles.mainDicHeader,
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.mainDicTitle}>비건은 지금 ❤️‍🔥</Text>
              <Octicons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={productData} // 상태로 관리되는 제품 데이터를 사용
                keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <TouchableScale>
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                      />

                      <View style={styles.textContainer}>
                        {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.vegType}>
                          {getVegTypeName(item.veg_type_id)}
                        </Text>
                      </View>
                    </TouchableScale>
                  </View>
                )}
              />
            </View>
          </View>
          <Line style={{ marginVertical: 16 }}></Line>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 16,
                ...styles.mainDicHeader,
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.mainDicTitle}>전체 인기순위</Text>
              <Octicons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.mainDicContainer}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={productData} // 상태로 관리되는 제품 데이터를 사용
                keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <TouchableScale>
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                      />

                      <View style={styles.textContainer}>
                        {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.vegType}>
                          {getVegTypeName(item.veg_type_id)}
                        </Text>
                      </View>
                    </TouchableScale>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={{ height: 80 }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Main_theme.main_20,
    flexDirection: "column",
  },
  topContents: {},
  header: {
    //backgroundColor: "#222", //영역 테스트 용 코드입니다.
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignContent: "center",
  },
  headerTextInput: {
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: Gray_theme.white,
    borderRadius: 20,
    alignItems: "center",

    justifyContent: "space-between",
    flexDirection: "row",
  },
  mainTitle: {
    //backgroundColor: Main_theme.main_reverse, //영역 테스트 용 코드입니다.
    marginVertical: 24,
    marginHorizontal: 24,
  },
  mainContents: {
    backgroundColor: Gray_theme.white,
    flex: 1,
    borderTopRightRadius: 50,
    marginTop: 32,
  },
  mainDicHeader: {
    marginHorizontal: 24,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainDicContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  mainDicTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    color: Gray_theme.balck,
  },

  //flatList
  itemContainer: {
    marginRight: 16,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: Gray_theme.gray_20,
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    color: Gray_theme.balck,
    fontFamily: "Pretendard-SemiBold",
  },
  category: {
    marginTop: 2,
    fontSize: 12,
    color: Gray_theme.gray_60,
    fontFamily: "Pretendard-Regular",
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
});