import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { StyleSheet, Modal, useWindowDimensions } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
// component 관련
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
import QuestionModal from "../../../assets/styles/ReuseComponents/Modal/QuestionModal";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
// data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

// 키 값을 통해 로컬 저장소에 접근
// 추후 내 정보에 사용 시 동일한 시 선언 후 파일 저장
const REVIEW_KEY = "userReview";

export default function DicProductReviewScreen({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // user의 정보를 불러옴
  const { user, id, name, vegTypeName } = useUser();
  // 이전 화면에서 넘어온 정보
  const { productID, reviewLength, reviewList } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      setReviewModalOpen(false);
    }, [])
  );

  // 리뷰 작성 모달창 관리
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // 삭제 모달창 관리
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 모덜청 닫기 함수
  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // 추천 버튼 관리
  const [isRec, setIsRec] = useState(false);
  // 비추천 버튼 관리
  const [isNotRec, setIsNotRec] = useState(false);
  const handleIsRec = () => {
    setIsRec(true);
    setIsNotRec(false); // 추천을 누르면 비추천은 해제
  };

  const handleIsNotRec = () => {
    setIsRec(false);
    setIsNotRec(true); // 비추천을 누르면 추천은 해제
  };

  // 리뷰 작성 TaxtInput
  const [reviewText, setReviewText] = useState("");
  // 리뷰 작성 시간
  const [reviewTime, setReviewTime] = useState("");
  // 서버 업로드 여부
  const [upLoadReview, setUpLoadReview] = useState(false);
  // 사용자가 작성한 리뷰 저장
  const [mainUserReview, setMainUserReview] = useState("");

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
      console.log("리뷰 저장 중 오류가 발생하였습니다. :", e);
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
      console.log("리뷰 불러오기 중 오류 발생:", e);
    }
  };

  // 앱 실행 시 리뷰 데이터를 불러옴
  useEffect(() => {
    loadReview(); // 컴포넌트가 마운트될 때 데이터를 불러옴
  }, [productID]); // productID가 변경될 때마다 다시 불러옴

  // 작성 완료
  const handleUpLoad = () => {
    // 서버 업로드 상태를 true로 변경
    setUpLoadReview(true);
    // 모달 닫기
    setReviewModalOpen(false);
    // 리뷰 저장
    saveReview();
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
      reviewTime, // 작성 시간 저장
      "upLoadReview:",
      upLoadReview
    );
    // 완료 메시지 표시
    showToast("리뷰 작성이 완료되었습니다.");
  };

  // 리뷰 삭제 함수
  const deleteReview = async () => {
    try {
      // AsyncStorage에서 리뷰 데이터를 삭제
      await AsyncStorage.removeItem(REVIEW_KEY);

      // 모든 상태를 초기화
      setMainUserReview(null);
      setReviewText(""); // 리뷰 텍스트 초기화
      setIsRec(false); // 추천 상태 초기화
      setIsNotRec(false); // 비추천 상태 초기화
      setUpLoadReview(false); // 서버 업로드 여부 초기화
      setDeleteModalOpen(false);

      // 삭제 완료 메시지 표시
      showToast("리뷰가 삭제되었습니다.");
    } catch (e) {
      console.log("리뷰 삭제 중 오류 발생:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade" //모달이 나타나는 방식
        visible={reviewModalOpen} //모달이 보이는 여부
        transparent={true} // 모달 배경 투명 여부
        onRequestClose={() => {
          if (!upLoadReview) {
            setReviewText("");
            setIsRec(false);
            setIsNotRec(false);
          }
          setReviewModalOpen(false);
        }} // 뒤로가기를 눌렀을 때
      >
        <View
          style={styles.modalBgc}
          onTouchEnd={() => {
            if (!upLoadReview) {
              setReviewText("");
              setIsRec(false);
              setIsNotRec(false);
            }
            setReviewModalOpen(false);
          }}
        >
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
                onPress={() => {
                  if (!upLoadReview) {
                    setReviewText("");
                    setIsRec(false);
                    setIsNotRec(false);
                  }
                  setReviewModalOpen(false);
                }}
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
                      ? Main_theme.main_30
                      : Gray_theme.gray_30,
                  }}
                  onPress={handleIsNotRec}
                >
                  <Image
                    source={MainIcons.bad}
                    style={{
                      ...styles.recIcon,
                      tintColor: isNotRec
                        ? Main_theme.main_30
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
                  maxLength={150}
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
      <QuestionModal
        visible={deleteModalOpen}
        onRequestClose={() => {
          setDeleteModalOpen(false);
        }}
        onPress={deleteReview}
        style_cancle={styles.style_cancle}
        style_ok={styles.style_ok}
      >
        이 후기를 삭제할까요?
      </QuestionModal>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.header}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Octicons
            name="arrow-left"
            size={24}
            color={Gray_theme.gray_90}
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>리뷰</Text>
          <Text style={styles.reviewTotal}>({reviewLength})</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainUserReviewC}>
        <View style={styles.mainUserReviewContainer}>
          <Image
            source={MainIcons.user_profile}
            style={styles.mainUserProfile}
          ></Image>
          <View style={styles.userInfo}>
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ ...styles.userName, fontSize: 16 }}>{name}</Text>
                <Text style={{ ...styles.vegType, fontSize: 12 }}>
                  {vegTypeName}
                </Text>
              </View>
            </View>
            {mainUserReview ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.writeDate}>
                  {new Date(reviewTime).toLocaleDateString()}
                </Text>
                <Entypo
                  name="dot-single"
                  size={20}
                  color={Gray_theme.gray_50}
                  style={styles.dot}
                />
                {isRec ? (
                  <Image
                    source={MainIcons.good}
                    style={{ ...styles.userRec, marginBottom: 2 }}
                  ></Image>
                ) : (
                  <Image
                    source={MainIcons.bad}
                    style={{ ...styles.userRec, marginTop: 4 }}
                  ></Image>
                )}
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.mainContent}>
          {!mainUserReview ? (
            <Text style={{ ...styles.mainCText, textAlign: "center" }}>
              작성된 리뷰가 없습니다.
            </Text>
          ) : (
            <Text style={{ ...styles.mainCText }}>{reviewText}</Text>
          )}
        </View>
      </View>
      {!mainUserReview ? (
        <View style={styles.btnC}>
          <BtnC
            onPress={() => {
              setReviewModalOpen(!reviewModalOpen);
            }}
          >
            리뷰 쓰기
          </BtnC>
        </View>
      ) : (
        <View
          style={{
            ...styles.btnC,
            flexDirection: "row",
          }}
        >
          <BtnC
            style={{
              flex: 2,
              marginRight: 4,
            }}
            onPress={() => {
              setReviewModalOpen(true);
            }}
          >
            수정하기
          </BtnC>
          <BtnC
            style={{
              flex: 1,
              marginLeft: 4,
              backgroundColor: Gray_theme.gray_40,
              borderColor: Gray_theme.gray_40,
            }}
            onPress={() => [setDeleteModalOpen(true)]}
          >
            삭제
          </BtnC>
        </View>
      )}

      <View style={{ flex: 1, marginTop: 24 }}>
        <Line />
        {reviewLength !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={reviewList}
            keyExtractor={(item, index) => index.toString()} // 인덱스를 key로 사용
            renderItem={({ item }) => {
              return (
                <View style={styles.reviewContainer}>
                  <View style={styles.userReviewContainer}>
                    <Image
                      source={MainIcons.allUser_profile}
                      style={styles.userProfile}
                    ></Image>
                    <View style={styles.userInfo}>
                      <View style={styles.userInfoContainer}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginBottom: 8,
                          }}
                        >
                          <Text style={styles.userName}>{item.user_name}</Text>
                          <Text style={styles.vegType}>
                            {item.user_veg_type}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.writeDate}>
                          {new Date(item.created_at).toLocaleDateString()}
                        </Text>
                        <Entypo
                          name="dot-single"
                          size={20}
                          color={Gray_theme.gray_50}
                          style={styles.dot}
                        />
                        {item.is_rec ? (
                          <Image
                            source={MainIcons.good}
                            style={{ ...styles.userRec, marginBottom: 2 }}
                          ></Image>
                        ) : (
                          <Image
                            source={MainIcons.bad}
                            style={{ ...styles.userRec, marginTop: 4 }}
                          ></Image>
                        )}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.content}>{item.content}</Text>
                </View>
              );
            }}
          />
        ) : (
          <View style={styles.noRevieContainer}>
            <Text style={styles.noRevieText}>작성된 리뷰가 없습니다</Text>
            <Text style={styles.noRevieText}>첫 번째 리뷰를 남겨주세요!</Text>
          </View>
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
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 24,
    marginRight: 16,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
    marginRight: 4,
  },
  reviewTotal: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: Gray_theme.gray_50,
  },
  reviewContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
  },
  userProfile: {
    width: 52,
    height: 52,
    marginRight: 12,
  },
  userReviewContainer: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  userInfo: {
    justifyContent: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  userName: {
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
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
  },
  reportIcon: {
    width: 24,
    height: 24,
    tintColor: Gray_theme.gray_60,
  },
  userRec: {
    width: 16,
    height: 16,
  },
  dot: {
    marginHorizontal: 2,
  },
  writeDate: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
  content: {
    paddingVertical: 16,
    marginLeft: 68,
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
  },
  mainUserReviewC: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainUserReviewContainer: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  mainUserProfile: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  mainContent: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  mainCText: {
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
  },
  btnC: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
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
  // 리뷰가 없는 경우
  noRevieContainer: {
    marginVertical: 120,
    alignItems: "center",
  },

  noRevieText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_80,
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
