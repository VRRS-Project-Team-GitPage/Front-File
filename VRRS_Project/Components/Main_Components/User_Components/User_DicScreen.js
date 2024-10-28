import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, FlatList, Image, TouchableWithoutFeedback, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// component 관련
import { truncateTextByWord } from "../../../assets/styles/ReuseComponents/truncateTextByWord";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
// Data 관련 import
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { fetchBookmarks } from "../../../assets/ServerDatas/ServerApi/bookmarkApi";

export default function User_DicScreen({ navigation }) {
    useTabBarVisibility(false);

    const { jwt, vegTypeName } = useUser();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                const data = await fetchBookmarks(jwt); // jwt를 사용해 북마크 조회
                setProducts(data); // 조회된 북마크 데이터를 상태에 저장
            } catch (error) {
                console.error("북마크 로드 오류:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        loadBookmarks();
    }, [jwt]);

    return (
        <SafeAreaView style={styles.container}>
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
                        내가 저장한 제품 총 {products.length}개
                    </Text>
                </View>
                {loading ? ( // 로딩 중일 때 표시할 부분
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <Text style={{ color: "gray" }}>로딩 중...</Text>
                    </View>
                ) :
                    products.length === 0 ? ( //북마크한 제품이 없을 때 화면
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
                            style={{ paddingHorizontal: 8 }}
                            showsVerticalScrollIndicator={false}
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
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
                                                source={{ uri: item.imgUrl }}
                                                style={styles.image}
                                            />
                                            <View style={styles.textContainer}>
                                                <View>
                                                    {/* <Text style={styles.name}>{item.name}</Text> */}
                                                    <Text style={styles.name}>
                                                        {truncateTextByWord(item.name, 16)}
                                                    </Text>
                                                    <Text style={styles.category}>{item.category}</Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Text style={styles.vegType}>
                                                        {item.vegType}
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
                                                    <Text style={styles.infoText}>{item.recCnt}</Text>
                                                </View>
                                                <View style={styles.infoContents}>
                                                    <Octicons
                                                        name="comment"
                                                        size={16}
                                                        color={Gray_theme.gray_40}
                                                        style={{ marginRight: 4 }}
                                                    />
                                                    <Text style={styles.infoText}>
                                                        {item.recCnt + item.notRecCnt}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            }}
                        />
                    )
                }
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
