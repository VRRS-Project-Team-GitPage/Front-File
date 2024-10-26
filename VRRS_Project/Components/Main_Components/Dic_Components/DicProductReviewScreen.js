import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
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
import LocalReviewModal from "../../../assets/ServerDatas/LocalDatas/LocalReviewModal";
// Server data 관련
import {
  fetchProductData,
  fetchReviewData,
} from "../../../assets/ServerDatas/ServerApi/dictionaryApi";
import { deleteReview } from "../../../assets/ServerDatas/ServerApi/reviewApi";

export default function DicProductReviewScreen({ route, navigation }) {
  // user의 정보를 불러옴
  const { jwt, name, vegTypeName } = useUser();
  // 이전 화면에서 넘어온 정보
  const { productID } = route.params || {};

  // 화면이 포커싱 되었을 때 언제나 모달창 닫기
  useFocusEffect(
    useCallback(() => {
      setReviewModalVisible(false);
    }, [])
  );

  // 리뷰 수를 저장할 state
  const [reviewCnt, setReviewCnt] = useState();

  // 사용자 리뷰를 저장할 state
  const [reviews, setReviews] = useState([]);
  const [ownReview, setOwnReview] = useState();

  const loadData = async () => {
    try {
      const data = await fetchProductData(jwt, productID); // 제품 상세 데이터 요청
      const reviewData = await fetchReviewData(jwt, productID); // 제품 리뷰 데이터 요청
      setReviewCnt(data.recCnt + data.notRecCnt);
      setReviews(reviewData.reviews);
      setOwnReview(reviewData.review);
    } catch (error) {
      console.error(error.message); // 에러 처리
    }
  };

  useEffect(() => {
    loadData(); // 데이터 불러오기 호출
  }, [jwt, productID]);

  // 리뷰 작성 모달창 관리
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  // 추천 버튼 관리
  const [isRec, setIsRec] = useState(false);
  // 비추천 버튼 관리
  const [isNotRec, setIsNotRec] = useState(false);
  // 리뷰 작성 TaxtInput
  const [reviewText, setReviewText] = useState("");
  // 리뷰 작성 시간
  const [reviewTime, setReviewTime] = useState("");
  // 사용자가 작성한 리뷰 저장
  const [mainUserReview, setMainUserReview] = useState("");

  // 모달창 닫기
  const onRequestClose = () => {
    // 서버에 리뷰가 업로드 되지 않은 경우
    if (!ownReview) {
      setReviewText("");
      setIsRec(false);
      setIsNotRec(false);
    }
    setReviewModalVisible(false);
    loadData();
  };

  const loadReviews = async () => {
    try {
      const data = await fetchProductData(jwt, productID); // 제품 데이터
      const reviewData = await fetchReviewData(jwt, productID); // 리뷰 데이터
      setReviewCnt(data.recCnt + data.notRecCnt);
      setReviews(reviewData.reviews);
      setOwnReview(reviewData.review);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productID]);

  // 삭제 모달창 관리
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 모달창 닫기 함수
  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleReviewDelete = async () => {
    try {
      // 서버로 DELETE 요청 보내기
      await deleteReview(jwt, productID);

      loadData(); // 데이터 불러오기 호출
      // 상태 초기화
      setMainUserReview(null); // 리뷰 데이터 제거
      setReviewTime(null);
      setReviewText("");
      setIsRec(false);
      setIsNotRec(false);

      handleDeleteModal();
      showToast("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 중 오류:", error);
      showToast("리뷰 삭제 중 오류가 발생하였습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LocalReviewModal
        visible={reviewModalVisible}
        setVisible={setReviewModalVisible}
        onRequestClose={onRequestClose}
        isRec={isRec}
        setIsRec={setIsRec}
        isNotRec={isNotRec}
        setIsNotRec={setIsNotRec}
        reviewText={reviewText}
        setReviewText={setReviewText}
        reviewTime={reviewTime}
        setReviewTime={setReviewTime}
        mainUserReview={mainUserReview}
        setMainUserReview={setMainUserReview}
        productID={productID}
        loadReviews={loadReviews}
      />
      <QuestionModal
        visible={deleteModalOpen}
        onRequestClose={handleDeleteModal}
        onPress={handleReviewDelete}
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
          <Text style={styles.reviewTotal}>({reviewCnt})</Text>
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
            {ownReview ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.writeDate}>{ownReview.date}</Text>
                <Entypo
                  name="dot-single"
                  size={20}
                  color={Gray_theme.gray_50}
                  style={styles.dot}
                />
                {ownReview.rec ? (
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
          {!ownReview ? (
            <Text
              style={{
                ...styles.mainCText,
                textAlign: "center",
                color: Gray_theme.gray_60,
              }}
            >
              작성된 리뷰가 없습니다.
            </Text>
          ) : (
            <Text style={{ ...styles.mainCText }}>{ownReview.content}</Text>
          )}
        </View>
      </View>
      {!ownReview ? (
        <View style={styles.btnC}>
          <BtnC
            onPress={() => {
              setReviewModalVisible(true);
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
              setReviewModalVisible(true);
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
        {reviews && reviews.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={reviews}
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
                          <Text style={styles.userName}>{item.nickname}</Text>
                          <Text style={styles.vegType}>
                            {item.vegType.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.writeDate}>{item.date}</Text>
                        <Entypo
                          name="dot-single"
                          size={20}
                          color={Gray_theme.gray_50}
                          style={styles.dot}
                        />
                        {item.rec ? (
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
            {ownReview ? (
              <View>
                <Text style={styles.noRevieText}>
                  다른 사용자의 리뷰가 없습니다
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.noRevieText}>작성된 리뷰가 없습니다</Text>
                <Text style={styles.noRevieText}>
                  첫 번째 리뷰를 남겨주세요!
                </Text>
              </View>
            )}
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
  // 리뷰가 없는 경우
  noRevieContainer: {
    marginVertical: 120,
    alignItems: "center",
  },

  noRevieText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_70,
    textAlign: "center",
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
