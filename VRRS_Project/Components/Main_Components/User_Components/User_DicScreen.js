import React, { useCallback, useLayoutEffect, useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet, ScrollView, Button, } from "react-native";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes"; // 이용자 정보
import { getAllProducts, getVegTypeName, getProTypeName, products, } from "../../../assets/ServerDatas/Dummy/dummyProducts"; // 제품 정보
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext"; // 검색 정보

export default function User_DicScreen({ route, navigation }) {
    useTabBarVisibility(false);

    const { user, id, name, vegTypeName } = useUser();

    // 화면 크기를 저장한 변수
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;

    // 화면이 포커싱 될 때 하단바 유지
    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: "flex", // 탭바가 다시 나타나도록 설정
                height: 60,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                position: "absolute",
            },
        });
    }, [navigation]);

    // 화면 포커싱 시 초기 화면으로 돌리기 위한 변수
    const scrollViewRef = useRef(null);

    // 스크롤뷰를 처음으로 돌리는 함수
    const scrollViewReturn = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
    };

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
                // 화면이 포커싱 될 경우 해당 옵션을 default로
                setSearchText("");
                handleOnSubmitEditing("");
                checkTypeBtn(vegTypeName);
                scrollToTop();
            };
        }, [])
    );

    const { type, sortOption, autoSearch } = route.params || {};

    useEffect(() => {
        if (autoSearch) {
            checkTypeBtn(type);
            selectOption(sortOption);
            sortProducts();
        }
        navigation.setParams({ autoSearch: false });
    }, [autoSearch]);

    // [상단 헤더의 검색창 영역에 관한 내용입니다.]

    // Search Context를 사용하기 위해 전역적으로 받아온 내용
    const { searchText, setSearchText, saveSearchText } =
        useContext(SearchContext);
    // SearchScreen에서 넘어온 파라미터
    const { text, triggerSubmit } = route.params || {};

    useEffect(() => {
        if (triggerSubmit) {
            handleOnSubmitEditing(text); // 텍스트 반영 후, onSubmitEditing 동작 실행
            navigation.setParams({ triggerSubmit: false });
        }
    }, [triggerSubmit]);

    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        handleOnSubmitEditing(filterText);
    }, [filterText]);

    const handleOnSubmitEditing = (query) => {
        if (query === "") {
            setFilterText("");
        } else {
            const filteredList = [...products].filter(
                (product) =>
                    product.name
                        .toLocaleLowerCase()
                        .includes(query.toLocaleLowerCase()) ||
                    product.category
                        .toLocaleLowerCase()
                        .includes(query.toLocaleLowerCase()) ||
                    getVegTypeName(product.veg_type_id)
                        .toLocaleLowerCase()
                        .includes(query.toLocaleLowerCase()) ||
                    product.ingredients.some((ingredient) =>
                        ingredient.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    )
            );
            setFilterText(query);
            saveSearchText();
            setSortedProducts(filteredList);
        }
        checkTypeBtn("전체");
        selectOption("등록순");
        sortProducts();
        scrollViewReturn();
    };

    // 검색 및 필터에 사용될 변수 모음입니다
    const [sortedProducts, setSortedProducts] = useState([]); // 최종 정렬된 제품 리스트

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
    const [selectedOption, setSelectedOption] = useState("등록순"); // 선택된 옵션
    const [dropFilter, setDropFilter] = useState([]); // 드롭 다운 시 정렬된 리스트를 저장합니다.

    // [드롭 다운 버튼에 관한 내용입니다.]
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // 드롭다운 상태를 토글
    };

    const selectOption = (option) => {
        setSelectedOption(option); // 옵션 선택 시 상태 업데이트
        setIsDropdownOpen(false); // 옵션 선택 후 드롭다운 닫기
    };

    // 화면 밖을 클릭했을 때 드롭다운 닫기
    const closeDropdown = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        sortProducts(); // 옵션 선택 시마다 정렬
    }, [selectedOption]);

    useEffect(() => {
        checkTypeBtn(checked); // sortedProducts가 변경될 때마다 필터링
    }, [dropFilter]);

    const sortProducts = () => {
        let sortedList = [...products];

        if (selectedOption === "등록순") {
            sortedList.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        } else if (selectedOption === "인기순") {
            sortedList.sort((a, b) => b.rec + b.review - (a.rec + a.review));
        }

        if (filterText !== "") {
            sortedList = sortedList.filter(
                (product) =>
                    product.name
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    product.category
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    getVegTypeName(product.veg_type_id)
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    product.ingredients.some((ingredient) =>
                        ingredient
                            .toLocaleLowerCase()
                            .includes(filterText.toLocaleLowerCase())
                    )
            );
        }

        setDropFilter(sortedList); // 드롭 로직 후 생성된 리스트
        setSortedProducts(sortedList); // 전체 필터 리스트
    };

    // 유형 항목 체크에 관한 내용입니다.
    const [checked, setChecked] = useState("전체");

    // 선택된 버튼에 따라 제품 리스트를 필터링 하는 함수
    // btnType: 버튼 유형을 받아오는 변수
    const checkTypeBtn = (btnType) => {
        setChecked(btnType); // 어떤 버튼이 선택되었는지 받아옴

        let filteredList = [...dropFilter];

        if (btnType !== "전체") {
            filteredList = filteredList.filter(
                (product) => getVegTypeName(product.veg_type_id) === btnType
            );
        }

        if (filterText !== "") {
            filteredList = filteredList.filter(
                (product) =>
                    product.name
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    product.category
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    getVegTypeName(product.veg_type_id)
                        .toLocaleLowerCase()
                        .includes(filterText.toLocaleLowerCase()) ||
                    product.ingredients.some((ingredient) =>
                        ingredient
                            .toLocaleLowerCase()
                            .includes(filterText.toLocaleLowerCase())
                    )
            );
        }
        setSortedProducts(filteredList);
    };

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
            >내 사전
            </BackHeader>
            <View style={{ flex: 1 }}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        내가 작성한 제품 총 { }개
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
                        ></Image>
                        <Text
                            style={{
                                marginTop: 16,
                                color: Main_theme.main_50,
                                fontFamily: "Pretendard-Bold",
                            }}
                        >
                            검색 결과가 없어요...
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
                        data={sortedProducts}
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
            <View style={{ height: 60 }}></View>
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
    searchHeader: {
        height: 60,
        paddingHorizontal: 16,
        paddingVertical: 16,
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
    // 개인 사전, drop list가 있는 페이지
    firstHeader: {
        paddingHorizontal: 24,
        paddingTop: 4,
        paddingBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    firstBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Gray_theme.gray_20,
    },
    buttonText: {
        fontFamily: "Pretendard-Medium",
        fontSize: 12,
        marginRight: 6,
        color: Gray_theme.gray_80,
    },
    dropdownList: {
        backgroundColor: Gray_theme.white,
        borderRadius: 20,
        elevation: 3,
        justifyContent: "center",
        width: 86,
        position: "absolute", // 드롭다운을 버튼 아래에 위치시키기 위해
        top: 60, // 버튼 아래로 44px 떨어지게 설정

        right: 24,
        padding: 4,
        zIndex: 1000, // 다른 요소들보다 위에 위치
    },
    dropdownItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    dropdownItem: {
        alignItems: "baseline",
        fontSize: 12,
        fontFamily: "Pretendard-Medium",
        marginRight: 6,
        color: Gray_theme.gray_80,
    },
    selectedOptionText: {
        color: Main_theme.main_30, // 선택된 옵션의 텍스트 색상 변경
        fontFamily: "Pretendard-SemiBold",
        fontSize: 12,
    },

    secondHeader: {
        paddingHorizontal: 22,
        paddingVertical: 12,
        flexDirection: "row",
        borderColor: Gray_theme.gray_20,
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
