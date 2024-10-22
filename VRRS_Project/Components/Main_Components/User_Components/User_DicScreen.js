import React, { useLayoutEffect, useRef } from "react";
import { useState, useEffect } from "react";
import { useWindowDimensions, StyleSheet, ScrollView, Button } from "react-native";
import { View, Text, FlatList, Image, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { getAllProducts, getVegTypeName, getProTypeName, products } from "../../../assets/ServerDatas/Dummy/dummyProducts";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";

export default function User_DicScreen({ navigation }) {
    useTabBarVisibility(false);

    const { user } = useUser(); // user 정보를 가져옴
    const [productData, setProductData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]); // 최종 정렬된 제품 리스트
    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        console.log(user);
        // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
        const products = getAllProducts();
        setProductData(products);
    }, []);
  // 필터된 제품 리스트를 저장하는 변수
  const [filterList, setFilterList] = useState([]);
    useEffect(() => {
        if (productData.length > 0) {
            filterUserType();
        }
    }, [productData]);

    const filterUserType = () => {
        let sortedList = [...products];
        sortedList.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    
        setFilterList(sortedList);
      };

    // // 데이터 로드 및 필터링
    // useEffect(() => {
    //     if (productData.length > 0) {
    //         // 유저가 등록한 제품만 필터링 및 등록순 정렬
    //         const filteredProducts = productData
    //             .filter((product) => product.user_id === user.id)
    //             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // 등록순 정렬
    //         setSortedProducts(filteredProducts);
    //     }
    // }, [productData, user]);

    // 검색 및 필터에 사용될 변수 모음입니다
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태

    // 화면 밖을 클릭했을 때 드롭다운 닫기
    const closeDropdown = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    };
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: "flex",
                height: 60,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                position: "absolute",
            },
        });
    }, [navigation]);

    const flatListRef = useRef(null);

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                scrollToTop();
            };
        }, [])
    );

    return (
        <SafeAreaView
            style={styles.container}
            onTouchEndCapture={() => {
                closeDropdown();
            }}
        >
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >
                내 사전
            </BackHeader>
            <View style={{ flex: 1 }}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        내가 저장한 제품 총 {sortedProducts.length}개
                    </Text>
                </View>
                {sortedProducts.length === 0 ? (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 120,
                        }}
                    >
                        <Image
                            source={MainIcons.fail}
                            style={{ width: 120, height: 120 }}
                        />
                        <Text
                            style={{
                                marginTop: 16,
                                color: Main_theme.main_50,
                                fontFamily: "Pretendard-Bold",
                            }}
                        >
                            저장한 제품이 없어요...
                        </Text>
                        <Text
                            style={{
                                marginBottom: 24,
                                color: Main_theme.main_50,
                                fontFamily: "Pretendard-Bold",
                            }}
                        >
                            제품을 북마크해주세요.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        style={{ paddingHorizontal: 8 }}
                        showsVerticalScrollIndicator={false}
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const itemVegTypeName = getVegTypeName(item.veg_type_id);
                            const itemProTypeName = getProTypeName(item.pro_type_id);
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        const productID = item.id;
                                        navigation.navigate("DicTab", {
                                            screen: "ProductInfo",
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
    title: {
        padding: 16
    },
    titleText: {
        color: Gray_theme.balck,
        fontSize: 16,
        fontFamily: "Pretendard-SemiBold",
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
