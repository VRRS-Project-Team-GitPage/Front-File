import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Modal } from "react-native";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
import MainIcons from "../../../assets/Icons/MainIcons";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
import QuestionModal from "../../../assets/styles/ReuseComponents/Modal/QuestionModal";
import { truncateTextByWord } from "../../../assets/styles/ReuseComponents/truncateTextByWord";
// Data 관련 import
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import {
  updateReview,
  deleteReview,
  viewReview,
} from "../../../assets/ServerDatas/ServerApi/reviewApi";

export default function User_ReviewScreen({ navigation }) {
  useTabBarVisibility(false);

  const { jwt } = useUser();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [productID, setProductID] = useState("");
  const [reviewVal, setReviewVal] = useState("");
  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [isRec, setIsRec] = useState(false);
  const [isNotRec, setIsNotRec] = useState(false);

  const [loading, setLoading] = useState(false); // 로딩

  // 리뷰 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewReview(jwt);
        setReviews(data);
      } catch (error) {
        console.error("리뷰 조회 오류:", error);
      }
    };
    fetchData();
  }, []);

  // 리뷰 수정 핸들러
  const handleUpdate = async () => {
    try {
      const reviewData = {
        proId: productID, // 선택된 리뷰의 ID
        content: reviewVal,
        rec: isRec ? 1 : 0,
      };

      await updateReview(jwt, reviewData);
      showToast("리뷰가 수정되었습니다");

      setModalVisible(false);
      const updatedData = await viewReview(jwt, reviewData);
      setReviews(updatedData); // 최신 데이터로 업데이트
    } catch (error) {
      showToast("리뷰 수정 중 오류가 발생하였습니다.");
      console.error(error);
    }
  };

  // 리뷰 삭제 핸들러
  const handleReviewDelete = async () => {
    try {
      await deleteReview(jwt, productID);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.proId !== productID)
      );
      showToast("리뷰가 삭제되었습니다.");
      setDeleteModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("리뷰 삭제 중 오류:", error);
      showToast("리뷰 삭제 중 오류가 발생하였습니다.");
    }
  };

  // 삭제 모달 열기
  const openDeleteModal = (id) => {
    setProductID(id); // 선택한 리뷰 ID 저장
    setDeleteModalOpen(true); // 모달 열기
  };

  // 추천 비추천
  const handleIsRec = () => {
    setIsRec(true);
    setIsNotRec(false); // 추천을 누르면 비추천은 해제
  };

  const handleIsNotRec = () => {
    setIsRec(false);
    setIsNotRec(true); // 비추천을 누르면 추천은 해제
  };
  // 삭제 모달창 닫기 함수
  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // 삭제 모달창 관리
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        내 후기
      </BackHeader>
      <View style={{ flex: 1 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            내가 작성한 후기 총 {reviews.length}개
          </Text>
        </View>
        {loading ? ( // 로딩 중일 때 표시할 부분
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray" }}>로딩 중...</Text>
          </View>
        ) : reviews.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Gray_theme.gray_20,
            }}
          >
            <Text style={styles.notBokkMarkList}>작성한 후기가 없어요</Text>
            <Text style={styles.notBokkMarkList}>후기를 작성해주세요</Text>
          </View>
        ) : (
          <FlatList
            style={{ paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
            data={reviews}
            keyExtractor={(item) => item.proId.toString()} // 각 제품의 고유 키 설정
            renderItem={({ item }) => {
              return (
                <View style={styles.allContainer}>
                  <View style={styles.iteminfoContainer}>
                    {/* 제품 이름, 날짜, 감정 표시 */}
                    <View style={styles.itemnameContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <View>
                          <Text style={styles.name}>
                            {truncateTextByWord(item.proName, 16)}
                          </Text>
                          <View style={styles.emotionContainer}>
                            <Text style={styles.dateText}>{item.date}</Text>
                            <Entypo
                              name="dot-single"
                              size={20}
                              color={Gray_theme.gray_30}
                              style={styles.dot}
                            />
                            <Image
                              source={item.rec ? MainIcons.good : MainIcons.bad}
                              style={{
                                width: 16,
                                height: 16,
                                marginBottom: 2,
                                tintColor: Gray_theme.gray_40,
                              }}
                            />
                          </View>
                        </View>
                        <View style={styles.btnContainer}>
                          <BtnD
                            onPress={() => {
                              setSelectedReview(item);
                              setProductID(item.proId);
                              setIsRec(item.rec);
                              setIsNotRec(!item.rec);
                              setReviewVal(item.content); // 기존 리뷰 내용 불러오기
                              setModalVisible(true);
                            }}
                            containerStyle={{
                              backgroundColor: Main_theme.main_30,
                              borderColor: Main_theme.main_30,
                              paddingHorizontal: 12,
                              marginRight: 6,
                            }}
                            textStyle={{
                              fontSize: 12,
                              fontFamily: "Pretendard-SemiBold",
                              color: Gray_theme.white,
                            }}
                          >
                            수정
                          </BtnD>
                          <BtnD
                            onPress={() => {
                              setSelectedReview(item);
                              setProductID(item.proId);
                              setIsRec(item.rec);
                              setIsNotRec(!item.rec);
                              setDeleteModalOpen(true);
                            }}
                            containerStyle={{
                              backgroundColor: Gray_theme.gray_20,
                              borderColor: Gray_theme.gray_20,
                              paddingHorizontal: 12,
                            }}
                            textStyle={{
                              fontSize: 12,
                              fontFamily: "Pretendard-SemiBold",
                              color: Gray_theme.gray_80,
                            }}
                          >
                            삭제
                          </BtnD>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={styles.image}
                      />
                      <View
                        style={{
                          marginLeft: 32,
                          marginTop: 8,
                        }}
                      >
                        <Text style={styles.reviewText}>{item.content}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      {/* 리뷰 수정 모달 */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBgc}>
          <View
            style={styles.modalContainer}
            onTouchEnd={(e) => e.stopPropagation()} //메서드는 캡처 Event 및 버블링 단계에서 현재 이벤트의 추가 전파를 방지합니다.
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>리뷰 수정하기</Text>
              <Octicons
                name="x"
                size={24}
                color={Gray_theme.gray_90}
                style={styles.modalHeaderX}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.recCircle,
                    backgroundColor: isRec
                      ? Gray_theme.white
                      : Gray_theme.gray_30,

                    borderWidth: 2,
                    borderColor: isRec
                      ? Main_theme.main_30
                      : Gray_theme.gray_30,
                  }}
                  onPress={handleIsRec}
                >
                  <Image
                    source={MainIcons.good}
                    style={{
                      ...styles.recIcon,
                      tintColor: isRec
                        ? Main_theme.main_30
                        : Gray_theme.gray_40,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    ...styles.recCircle,
                    backgroundColor: isNotRec
                      ? Gray_theme.white
                      : Gray_theme.gray_30,

                    borderWidth: 2,
                    borderColor: isNotRec
                      ? Main_theme.main_reverse
                      : Gray_theme.gray_30,
                  }}
                  onPress={handleIsNotRec}
                >
                  <Image
                    source={MainIcons.bad}
                    style={{
                      ...styles.recIcon,
                      tintColor: isNotRec
                        ? Main_theme.main_reverse
                        : Gray_theme.gray_40,
                    }}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: 24,
                }}
              >
                <TextInput
                  placeholder="리뷰 내용을 입력해주세요."
                  value={reviewVal}
                  onChangeText={(text) => setReviewVal(text)}
                  multiline={true} // 여러 줄 여부
                  maxLength={150} // 최대 글자 수
                  style={{
                    width: "100%",
                    backgroundColor: reviewVal ? Gray_theme.gray_20 : null,
                    borderColor: reviewVal
                      ? Gray_theme.gray_80
                      : Gray_theme.gray_50,
                    borderWidth: 1,
                    ...styles.textInput,
                  }}
                />
                <View style={styles.inputLength}>
                  <Text
                    style={{
                      ...styles.inputLengthText,
                      color:
                        reviewVal && reviewVal.length !== 150
                          ? Gray_theme.gray_60
                          : Main_theme.main_reverse,
                    }}
                  >
                    {reviewVal ? reviewVal.length : 0}
                  </Text>
                  <Text
                    style={{
                      ...styles.inputLengthText,
                      color: Gray_theme.gray_60,
                    }}
                  >
                    /150
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.btnC, width: "100%" }}>
                <BtnC
                  onPress={() => {
                    if (!(isRec || isNotRec) || reviewVal === "") {
                      // 조건을 충족하지 않으면 토스트 메시지 출력
                      showToast("리뷰가 작성되지 않았습니다.");
                    } else {
                      // 조건을 충족하면 handleUpdate 함수 호출
                      handleUpdate();
                    }
                  }}
                >
                  작성 완료
                </BtnC>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* 리뷰 삭제 모달 */}
      <QuestionModal
        visible={deleteModalOpen}
        onRequestClose={handleDeleteModal}
        onPress={handleReviewDelete}
        style_cancle={styles.style_cancle}
        style_ok={styles.style_ok}
      >
        이 후기를 삭제할까요?
      </QuestionModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  title: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  titleText: {
    color: Gray_theme.balck,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },

  notBokkMarkList: {
    color: Gray_theme.gray_80,
    fontFamily: "Pretendard-SemiBold",
  },
  allContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  iteminfoContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  itemnameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  emotionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  icon: {
    paddingRight: 16,
  },
  date: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  name: {
    fontFamily: "Pretendard-Bold",
  },
  dateText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_40,
  },
  dot: {
    marginHorizontal: 2,
  },
  reviewText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    maxWidth: 240,
    flexWrap: "wrap",
  },
  // 모달 디자인
  modalBgc: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒷 배경 흐리게
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: Gray_theme.white,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 20,
    elevation: 3,
  },
  modalHeader: {
    height: 60,
    justifyContent: "center",
  },
  modalHeaderX: {
    position: "absolute",
    right: 24,
  },
  modalHeaderText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
  },
  modalContent: {
    alignItems: "center",
  },
  recCircle: {
    marginHorizontal: 16,
    width: 36,
    height: 36,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  recIcon: {
    width: 20,
    height: 20,
  },

  textInput: {
    height: 170,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    alignItems: "flex-start",
  },
  inputLength: {
    flexDirection: "row",
    marginTop: 4,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  inputLengthText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 10,
  },
  btnC: {
    paddingHorizontal: 24,
    marginTop: 24,
  },

  // 삭제 모달
  style_cancle: {
    flex: 1,
    backgroundColor: Gray_theme.gray_40,
    borderColor: Gray_theme.gray_40,
    marginRight: 4,
  },
  style_ok: {
    flex: 1,
    backgroundColor: Main_theme.main_30,
    marginLeft: 4,
  },
});
