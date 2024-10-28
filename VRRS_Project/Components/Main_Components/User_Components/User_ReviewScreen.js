
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Modal } from "react-native";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
// Data 관련 import
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { updateReview, deleteReview, viewReview } from "../../../assets/ServerDatas/ServerApi/reviewApi";

export default function User_ReviewScreen({ navigation }) {
  useTabBarVisibility(false);

  const { jwt } = useUser();
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewVal, setReviewVal] = useState('');
  const [maxLength] = useState(200); // 최대 글자 수

  // 리뷰 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewReview(jwt);
        setReviews(data); // 가져온 리뷰 데이터를 설정
      } catch (error) {
        console.error('리뷰 조회 오류:', error);
      }
    };
    fetchData();
  }, []);

  // 리뷰 수정 핸들러
  const handleUpdate = async () => {
    try {
      // 리뷰 수정 요청
      await updateReview(jwt, reviewData);
      setModalVisible(false);
      // 데이터 다시 가져오기
      const updatedData = await viewReview(jwt);
      setReviews(updatedData);
    } catch (error) {
      console.error('리뷰 수정 오류:', error);
      showToast("리뷰 수정 중 오류가 발생하였습니다.");
    }
  };

  // 리뷰 삭제 핸들러
  const handleDelete = async (jwt, proId) => {
    try {
      await deleteReview(jwt, proId);
      setDeleteModalVisible(false);
      showToast("리뷰가 삭제되었습니다.");
      // 리뷰 목록 새로고침
      const updatedData = await viewReview(jwt);
      setReviews(updatedData);
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      showToast("리뷰 삭제 중 오류가 발생하였습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        {loading ? ( // 로딩 중일 때 표시할 부분
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text style={{ color: "gray" }}>로딩 중...</Text>
          </View>
        ) :
          reviews.length === 0 ? (
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
              style={{ paddingHorizontal: 8 }}
              showsVerticalScrollIndicator={false}
              data={reviews}
              keyExtractor={(item) => item.id.toString()} // 각 제품의 고유 키 설정
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
                    <View style={styles.allContainer}>
                      <View style={styles.Container1}>
                        <View style={styles.itemNameContainer}>
                          <Octicons name="chevron-left" size={18} color="gray" style={styles.icon} />
                          <Text style={styles.name}>{item.name}</Text>
                        </View>
                        <View style={styles.btnContainer}>
                          <BtnD
                            onPress={() => {
                              setSelectedReview(item);
                              setReviewVal(item.review); // 기존 리뷰 내용 불러오기
                              setModalVisible(true);
                            }}
                            containerStyle={{ backgroundColor: "#F5F5F5", borderColor: "#F5F5F5", width: 42, height: 26 }}
                            textStyle={{ fontSize: 10, fontFamily: 'Pretendard-SemiBold', color: "#757575" }}
                          >
                            수정
                          </BtnD>
                          <Text>  </Text>
                          <BtnD
                            onPress={() => {
                              setSelectedReview(item);
                              setDeleteModalVisible(true);
                            }}
                            containerStyle={{ backgroundColor: "#F5F5F5", borderColor: "#F5F5F5", width: 42, height: 26 }}
                            textStyle={{ fontSize: 10, fontFamily: 'Pretendard-SemiBold', color: "#757575" }}
                          >
                            삭제
                          </BtnD>
                        </View>
                      </View>

                      <View style={styles.Container2}>
                        <Image
                          source={{ uri: item.imgUrl }}
                          style={styles.image}
                        />

                        <View style={styles.iteminfoContainer}>
                          {/* 제품 이름, 카테고리, 원재료, 채식 유형 표시 */}
                          <View style={styles.userinfoContainer}>
                            <Text style={styles.name}>{item.userName || "이름이 없습니다."}</Text>
                            <Text style={styles.vegType}>{item.vegType}</Text>
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
                            <Text style={styles.opinionText}>{item.recCnt}</Text>
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
                        <Text style={styles.reviewText}>{item.review}</Text>
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
                onChangeText={(text) => setReviewVal(text)}
              />
              <Text style={styles.charCount}>{reviewVal.length}/{maxLength}자</Text>
            </View>
            <View style={styles.button}>
              <Btn onPress={handleUpdate}>수정 완료</Btn>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={deleteModalVisible}
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
