import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useCallback, useState } from "react";
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
import LocalReviewModal from "../../../assets/ServerDatas/LocalDatas/LocalReviewModal";

// 키 값을 통해 로컬 저장소에 접근
// 추후 내 정보에 사용 시 동일한 시 선언 후 파일 저장
const REVIEW_KEY = "userReview";

export default function DicProductReviewScreen({ route, navigation }) {
  // user의 정보를 불러옴
  const { user, id, name, vegTypeName } = useUser();
  // 이전 화면에서 넘어온 정보
  const { productID, reviewLength, reviewList } = route.params || {};

  // 화면이 포커싱 되었을 때 언제나 모달창 닫기
  useFocusEffect(
    useCallback(() => {
      setReviewModalVisible(false);
    }, [])
  );

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
  // 서버 업로드 여부
  const [upLoadReview, setUpLoadReview] = useState(false);
  // 사용자가 작성한 리뷰 저장
  const [mainUserReview, setMainUserReview] = useState("");

  // 모달창 닫기
  const onRequestClose = () => {
    // 서버에 리뷰가 업로드 되지 않은 경우
    if (!upLoadReview) {
      setReviewText("");
      setIsRec(false);
      setIsNotRec(false);
    }
    setReviewModalVisible(false);
  };

  // 삭제 모달창 관리
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 삭제 모달창 닫기 함수
  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
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
      showToast("리뷰 삭제 중 오류가 발생하였습니다 :", e);
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
        upLoadReview={upLoadReview}
        setUpLoadReview={setUpLoadReview}
        mainUserReview={mainUserReview}
        setMainUserReview={setMainUserReview}
        productID={productID}
      />
      <QuestionModal
        visible={deleteModalOpen}
        onRequestClose={handleDeleteModal}
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
            <Text style={{ ...styles.mainCText }}>{reviewText}</Text>
          )}
        </View>
      </View>
      {!mainUserReview ? (
        <View style={styles.btnC}>
          <BtnC
            onPress={() => {
              setReviewModalVisible(!reviewModalVisible);
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
  // 리뷰가 없는 경우
  noRevieContainer: {
    marginVertical: 120,
    alignItems: "center",
  },

  noRevieText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_70,
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
