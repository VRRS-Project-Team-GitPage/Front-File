import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// 키 값을 통해 로컬 저장소에 접근
const REVIEW_KEY = "userReview";

export default function LocalReviewModal({
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
  upLoadReview, // 서버 업로드 여부(리뷰 작성 여부)
  setUpLoadReview,
  mainUserReview, // 사용자가 작성한 리뷰 저장
  setMainUserReview,
  productID, // 선택한(리뷰를 작성할) 제품 id 값
}) {
  // user의 정보를 불러옴
  const { user, id, name, vegTypeName } = useUser();

  const handleIsRec = () => {
    setIsRec(true);
    setIsNotRec(false); // 추천을 누르면 비추천은 해제
  };

  const handleIsNotRec = () => {
    setIsRec(false);
    setIsNotRec(true); // 비추천을 누르면 추천은 해제
  };

  // [로컬에서 리뷰 관리하기]
  // 추후 이 함수를 사용하여 리뷰 수정하기를 구현하시면 됩니다.

  // 리뷰 저장 함수
  const saveReview = async () => {
    try {
      const currentTime = new Date().toISOString(); // 현재 시간을 저장
      setReviewTime(currentTime); // 상태에도 저장

      const review = {
        pro_id: productID, // 해당 productID와 연결
        user_id: id,
        is_rec: isRec,
        content: reviewText,
        created_at: currentTime, // 작성 시간 저장
        upLoadReview: upLoadReview,
      };

      // 기존 리뷰 객체 불러오기
      const storedReviews = await AsyncStorage.getItem(REVIEW_KEY);
      const reviewsObject =
        storedReviews != null ? JSON.parse(storedReviews) : {};

      // 새로운 productID 리뷰 추가 또는 업데이트
      reviewsObject[productID] = review;

      // 업데이트된 리뷰 객체를 다시 AsyncStorage에 저장
      await AsyncStorage.setItem(REVIEW_KEY, JSON.stringify(reviewsObject));

      // 상태에 저장
      setMainUserReview(review);
    } catch (e) {
      showToast("리뷰 저장 중 오류가 발생하였습니다. :", e);
    }
  };

  // 리뷰 불러오기 함수

  const loadReview = async () => {
    try {
      // 모든 리뷰 객체를 불러옴
      const storedReviews = await AsyncStorage.getItem(REVIEW_KEY);
      const reviewsObject =
        storedReviews != null ? JSON.parse(storedReviews) : {};

      // 현재 productID에 해당하는 리뷰를 불러옴
      const loadedReview = reviewsObject[productID];

      // 리뷰 데이터를 불러오면 각 상태에 나눠서 저장
      if (loadedReview && loadedReview.pro_id === productID) {
        // productID를 비교
        setMainUserReview(loadedReview);
        setReviewTime(loadedReview.created_at); // 작성 시간 복원
        setUpLoadReview(loadedReview.upLoadReview); // 서버 업로드 여부 복원
        setReviewText(loadedReview.content); // 저장된 텍스트 복원
        setIsRec(loadedReview.is_rec); // 추천 여부 복원
        setIsNotRec(!loadedReview.is_rec); // 비추천 여부 복원
      } else {
        // 해당 productID에 맞는 리뷰가 없을 때 초기화
        setMainUserReview(null);
        setReviewText("");
        setIsRec(false);
        setIsNotRec(false);
        setReviewTime(null);
        setUpLoadReview(false);
      }
    } catch (e) {
      showToast("리뷰 불러오기 중 오류가 발생하였습니다. :", e);
    }
  };

  // 앱 실행 시 리뷰 데이터를 불러옴
  useEffect(() => {
    loadReview(); // 컴포넌트가 마운트될 때 데이터를 불러옴
  }, [productID]); // productID가 변경될 때마다 다시 불러옴

  // 작성 완료
  const handleUpLoad = () => {
    // 리뷰 저장
    saveReview();
    // 서버 업로드 상태를 true로 변경
    setUpLoadReview(true);
    // 모달 닫기
    setVisible(false);
    // 로그 출력
    console.log(
      "pro_id:",
      productID,
      "user_id:",
      id,
      "is_rec:",
      isRec,
      "content:",
      reviewText,
      "created_at:",
      reviewTime // 작성 시간 저장
    );
    // 완료 메시지 표시
    showToast("리뷰 작성이 완료되었습니다.");
  };

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
            <Text style={styles.modalHeaderText}>리뷰 쓰기</Text>
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
                      reviewText.length !== 150
                        ? Gray_theme.gray_60
                        : Main_theme.main_reverse,
                  }}
                >
                  {reviewText.length}
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
                    setUpLoadReview(true);
                    handleUpLoad();
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
