import React, { useCallback, useLayoutEffect, useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { useWindowDimensions, StyleSheet, ScrollView, Button, Modal } from "react-native";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련

// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
// Data 관련 import
//import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes"; // 이용자 정보
//import { getAllProducts, getVegTypeName, getProTypeName, products, review } from "../../../assets/ServerDatas/Dummy/dummyProducts"; // 제품 정보
import { SearchContext } from "../../../assets/ServerDatas/ReuseDatas/SearchContext"; // 검색 정보
import { getAllReviews } from "../../../assets/ServerDatas/Dummy/dummyReviews";

// Server data를 사용하기 위해 저장한 component들을 import(현재는 더미 데이터를 사용)
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  getAllProducts,
  getVegTypeName,
  getProTypeName,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";

export default function User_DicScreen({ route, navigation }) {
  useTabBarVisibility(false);
   // user의 정보를 불러옴
   const { user, id, name, vegTypeName,review } = useUser();

   // 화면 크기를 저장한 변수
   const windowWidth = useWindowDimensions().width;
   // 제품 정보를 저장하는 state
   const [productData, setProductData] = useState([]);
   // 필터된 제품 리스트를 저장하는 변수
   const [filterList, setFilterList] = useState([]);
 
   // 컴포넌트 마운트 시 데이터 로드
   useEffect(() => {
     console.log(user);
     // 데이터 관리 파일에서 전체 제품 데이터를 불러와 상태에 저장
     const products = getAllProducts();
     setProductData(products);
   }, []);
 
   useEffect(() => {
     if (productData.length > 0) {
       filterUserType();
     }
   }, [productData]);
 
   const filterUserType = () => {
     let sortedList = [...productData].sort(
       (a, b) => b.rec + b.review - (a.rec + a.review)
     );
     setFilterList(sortedList);
   };
 
   const scrollViewRef = useRef(null);
   const flatListRef = useRef(null);
 
   // 스크롤뷰를 처음으로 돌리는 함수
   const scrollViewReturn = () => {
     if (scrollViewRef.current) {
       scrollViewRef.current.scrollTo({ y: 0, animated: true });
     }
   };
 
   const subScrollViewReturn = () => {
     if (flatListRef.current) {
       flatListRef.current.scrollToOffset({ offset: 0, animated: true });
     }
   };
 
   useFocusEffect(
     React.useCallback(() => {
       return () => {
         // 화면이 포커싱 될 경우 해당 옵션을 default로
         scrollViewReturn();
         subScrollViewReturn();
       };
     }, [])
   );

  //------------------------
  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate("HomeTab", { screen: "Home" });// 로그아웃 시 이동할 화면
  };

  const [DeletemodalVisible, setDeleteModalVisible] = useState(false);
  const handleDelete = () => {
    setDeleteModalVisible(false);
    navigation.navigate("HomeTab", { screen: "Home" });// 로그아웃 시 이동할 화면
  };
  const [reviewVal, setreivew] = useState('');
  const maxLength = 50;
  //--------------------------------

  const reviews=()=>{
    let reviewList=[...reviewVal];
   }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >내 후기
      </BackHeader>
      <View style={{ flex: 1 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            내가 작성한 후기 총 {reviews.length}개
          </Text>
        </View>
        {reviews.length === 0 ? (
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
              작성한 후기가 없어요...
            </Text>
            <Text
              style={{
                marginBottom: 24,
                color: Main_theme.main_50,
                fontFamily: "Pretendard-Bold",
              }}
            >
              후기를 입력해주세요.
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            style={{ paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
            data={reviews}
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
                  <View style={styles.allContainer}>
                    <View style={styles.Container1}>
                      <View style={styles.itemNameContainer}>
                        <Octicons name="chevron-left" size={18} color="gray" style={styles.icon} />
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
                      <View style={styles.btnContainer}>
                        <BtnD
                          onPress={() => setModalVisible(true)}
                          containerStyle={{ backgroundColor: "#F5F5F5", borderColor: "#F5F5F5", width: 42, height: 26 }}
                          textStyle={{ fontSize: 10, fontFamily: 'Pretendard-SemiBold', color: "#757575" }}
                        >
                          수정
                        </BtnD>
                        <Text>  </Text>
                        <BtnD
                          onPress={() => setDeleteModalVisible(true)}
                          containerStyle={{ backgroundColor: "#F5F5F5", borderColor: "#F5F5F5", width: 42, height: 26 }}
                          textStyle={{ fontSize: 10, fontFamily: 'Pretendard-SemiBold', color: "#757575" }}
                        >
                          삭제
                        </BtnD>
                      </View>
                    </View>

                    <View style={styles.Container2}>
                      <Image
                        source={MainIcons.user_profile}
                        style={styles.image}
                      />

                      <View style={styles.iteminfoContainer}>
                        {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                        <View style={styles.userinfoContainer}>
                          <Text style={styles.name}>{name || "이름이 없습니다."}</Text>
                          <Text style={styles.vegType}>
                            {itemVegTypeName}
                            {/* 아이템의 채식 유형 이름 표시 */}
                          </Text>
                        </View>
                        <View style={styles.opinionContainer}>
                          <Octicons
                            name="thumbsup"
                            size={16}
                            color={Gray_theme.gray_40}
                            style={{
                              marginRight: 4,
                              marginBottom: 2,
                            }}
                          />
                          <Text style={styles.opinionText}>{item.rec}</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                        </View>
                      </View>
                    </View>
                    <View style={styles.Container3}>
                      <Text style={styles.reviewText}>리뷰요</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        )}
      </View>
      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer1}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Octicons name="x" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>리뷰 수정</Text>
            <View style={{ flexDirection: 'row' }}>
              <Octicons
                name="thumbsup"
                size={20}
                color={Gray_theme.gray_40}
                style={{ marginHorizontal: 8 }}
              />
              <Octicons
                name="thumbsdown"
                size={20}
                color={Gray_theme.gray_40}
                style={{ marginHorizontal: 8 }}
              />
            </View>
            <View style={{
              marginTop: 8,
              paddingHorizontal: 16,
            }}>
              <TextInput
                style={styles.reviewTextInput}
                placeholder="후기를 작성해 주세요."
                multiline={true}
                maxLength={maxLength}
                value={reviewVal}
                onChangeText={(text) => setreivew(text)}
              />
              <Text style={styles.charCount}>{reviewVal.length}/{maxLength}자</Text>
            </View>
            <View style={styles.button}>
              <Btn onPress={handleLogout}>수정 완료</Btn>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={DeletemodalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer2}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Octicons name="x" size={16} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>이 후기를 삭제할까요?</Text>
            <View style={styles.button}>
              <Btn onPress={handleDelete}>삭제 완료</Btn>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  title: {
    padding: 16,
  },
  titleText: {
    color: Gray_theme.balck,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
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
  category: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
  // 내꺼
  allContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
  },
  Container1: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: 'center',
  },
  Container2: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: 'center',
  },
  Container3: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 40,
  },

  itemNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  iteminfoContainer: {
    paddingHorizontal: 8,
  },
  userinfoContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  opinionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },

  icon: {
    paddingRight: 16,
  },
  name: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },
  image: {
    width: 48,
    height: 48,
  },
  vegType: {
    marginLeft: 8,
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    backgroundColor: Main_theme.main_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  opinionText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 8,
    color: Gray_theme.gray_40,
  },
  reviewText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
  },


  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
    width: '90%',
    height: '48%',
    padding: 16,
    backgroundColor: Gray_theme.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer2: {
    width: '90%',
    padding: 16,
    backgroundColor: Gray_theme.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },

  reviewTextInput: {
    width: 288,
    height: 130,
    color: Gray_theme.balck,
    backgroundColor: Gray_theme.gray_20,
    borderColor: Gray_theme.gray_40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    textAlignVertical: 'top',
    margin: 8,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontWeight: 'Pretendard-Medium',
    color: Gray_theme.gray_60,
    marginBottom: 24,
    marginHorizontal: 16,
  },
});
