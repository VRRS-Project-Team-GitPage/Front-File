import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
// component 관련
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
// data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
// server 관련
import { submitReview, updateReview } from "../ServerApi/reviewApi"; // 서버에서 리뷰 불러오는 API 추가
import { fetchReviewData } from "../ServerApi/dictionaryApi";

export default function ServerOnlyReviewModal({
  visible, // 모달 보임 여부
  setVisible,
  onRequestClose, // 모달 창 해제
  isRec, // 추천 여부
  setIsRec,
  isNotRec, // 비추천 여부
  setIsNotRec,
  reviewText, // 리뷰를 저장하는 변수
  setReviewText,
  reviewTime, // 리뷰 작성 시간
  setReviewTime,
  mainUserReview, // 사용자가 작성한 리뷰 저장
  setMainUserReview,
  productID, // 선택한(리뷰를 작성할) 제품 id 값
  deleteID, // 삭제할 제품 id 값
  loadReviews,
}) {
  // user의 정보를 불러옴
  const { jwt } = useUser();

  const handleIsRec = () => {
    setIsRec(true);
    setIsNotRec(false); // 추천을 누르면 비추천은 해제
  };

  const handleIsNotRec = () => {
    setIsRec(false);
    setIsNotRec(true); // 비추천을 누르면 추천은 해제
  };

  // [ 리뷰 관리 함수]

  // 리뷰 작성 함수 - 서버 연동
  const handleUpLoad = async () => {
    try {
      // 서버로 리뷰 업로드
      const reviewData = {
        proId: productID,
        content: reviewText,
        rec: isRec ? 1 : 0,
      };

      // 서버로 리뷰 작성 요청
      const response = await submitReview(jwt, reviewData);

      // 서버에서 응답받은 데이터를 상태에 반영
      const serverReview = response;

      // 응답 데이터를 바탕으로 상태 업데이트
      setMainUserReview(serverReview);

      // 리뷰 데이터를 상태에 저장
      await loadReviews();

      // 성공 메시지
      showToast("리뷰 작성이 완료되었습니다");

      // 모달 닫기
      setVisible(false);
    } catch (error) {
      showToast("오류가 발생하였습니다");
    }
  };

  // 리뷰 수정 함수 - 서버 연동
  const handleReviewUpdate = async () => {
    try {
      const reviewData = {
        proId: productID, // 제품 ID
        content: reviewText, // 수정된 리뷰 내용
        rec: isRec ? 1 : 0, // 추천 여부
      };

      // 리뷰 수정 요청 함수 호출
      const updatedReview = await updateReview(jwt, reviewData);

      // 응답 데이터를 바탕으로 상태 업데이트
      setMainUserReview(updatedReview);

      // 리뷰 데이터를 상태에 저장
      await loadReviews();

      showToast("리뷰가 수정되었습니다");
      // 모달 닫기
      setVisible(false);
    } catch (error) {
      showToast("오류가 발생하였습니다");
      console.log("리뷰 수정 중 오류:", error);
    }
  };

  // 서버에서 리뷰 불러오기 함수
  const loadReviewFromServer = async () => {
    try {
      // 서버에서 리뷰 데이터 불러오기
      const serverReview = await fetchReviewData(jwt, productID);
      const ownReview = serverReview.review;
      console.log("서버에서 불러온 리뷰: ", serverReview.review);

      // 리뷰 데이터를 상태에 저장
      setMainUserReview(ownReview);
      setReviewTime(ownReview.date);
      setReviewText(ownReview.content);
      setIsRec(ownReview.rec);
      setIsNotRec(!ownReview.rec);
    } catch (e) {
      console.log("리뷰 불러오기 중 오류가 발생하였습니다. :", e);
    }
  };

  // 앱 실행 시 서버에서 리뷰 데이터를 불러옴
  useEffect(() => {
    loadReviewFromServer();
  }, []);

  return (
    <Modal
      animationType="fade" //모달이 나타나는 방식
      visible={visible} //모달이 보이는 여부
      transparent={true} // 모달 배경 투명 여부
      onRequestClose={onRequestClose} // 뒤로가기를 눌렀을 때
    >
      <View style={styles.modalBgc} onTouchEnd={onRequestClose}>
        <View
          style={styles.modalContainer}
          onTouchEnd={(e) => e.stopPropagation()} //메서드는 캡처 Event 및 버블링 단계에서 현재 이벤트의 추가 전파를 방지합니다.
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
              {!mainUserReview ? "리뷰 쓰기" : "리뷰 수정하기"}
            </Text>
            <Octicons
              name="x"
              size={24}
              color={Gray_theme.gray_90}
              style={styles.modalHeaderX}
              onPress={onRequestClose}
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
                  borderColor: isRec ? Main_theme.main_30 : Gray_theme.gray_30,
                }}
                onPress={handleIsRec}
              >
                <Image
                  source={MainIcons.good}
                  style={{
                    ...styles.recIcon,
                    tintColor: isRec ? Main_theme.main_30 : Gray_theme.gray_40,
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
                value={reviewText}
                onChangeText={(text) => setReviewText(text)}
                multiline={true} // 여러 줄 여부
                maxLength={150} // 최대 글자 수
                style={{
                  width: "100%",
                  backgroundColor: reviewText ? Gray_theme.gray_20 : null,
                  borderColor: reviewText
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
                      reviewText && reviewText.length !== 150
                        ? Gray_theme.gray_60
                        : Main_theme.main_reverse,
                  }}
                >
                  {reviewText ? reviewText.length : 0}
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
              {!(isRec || isNotRec) || reviewText === "" ? (
                <Btn
                  onPress={() => {
                    showToast("리뷰가 작성되지 않았습니다.");
                  }}
                >
                  작성 완료
                </Btn>
              ) : (
                <BtnC
                  onPress={() => {
                    if (!mainUserReview) {
                      // 리뷰가 없을 때 (새 리뷰 작성)
                      handleUpLoad();
                    } else {
                      // 리뷰가 있을 때 (리뷰 수정)
                      handleReviewUpdate();
                    }
                  }}
                >
                  작성 완료
                </BtnC>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
