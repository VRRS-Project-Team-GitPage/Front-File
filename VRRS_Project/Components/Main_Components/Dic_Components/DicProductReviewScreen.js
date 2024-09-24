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
// component 관련
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
// data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function DicProductReviewScreen({ route, navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // user의 정보를 불러옴
  const { user, username, vegTypeName } = useUser();
  // 이전 화면에서 넘어온 정보
  const { reviewLength, reviewList } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      setReviewModalOpen(false);
    }, [])
  );

  // 리뷰 작성 모달창 관리
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

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

  // 리뷰 작성 탭
  const [reviewText, setReviewText] = useState("");

  // 서버 업로드 여부
  const [upLoadReview, setUpLoadReview] = useState(false);

  // 서버 업로드 함수
  handleUpLoad = () => {
    setUpLoadReview(true);
    setReviewModalOpen(false);
  };

  // 추후 서버와 연동할 함수
  useEffect(() => {
    return () => {
      console.log("rec:", isRec, "review", reviewText);
    };
  }, [handleUpLoad]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade" //모달이 나타나는 방식
        visible={reviewModalOpen} //모달이 보이는 여부
        transparent={true} // 모달 배경 투명 여부
        onRequestClose={() => {
          setReviewModalOpen(false);
        }} // 뒤로가기를 눌렀을 때
      >
        <View
          style={styles.modalBgc}
          onTouchEnd={() => setReviewModalOpen(false)}
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
                onPress={() => setReviewModalOpen(false)}
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
                  placeholder="제품 이름을 입력해주세요."
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
                  onSubmitEditing={() => {}}
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
                {(isRec || isNotRec) && reviewText === "" ? (
                  <Btn
                    onPress={() => {
                      showToast("리뷰가 작성되지 않았습니다.");
                    }}
                  >
                    작성 완료
                  </Btn>
                ) : (
                  <BtnC onPress={handleUpLoad}>작성 완료</BtnC>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
                }}
              >
                <Text style={styles.userName}>{username}</Text>
                <Text style={styles.vegType}>{vegTypeName}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.writeDate}>현재</Text>
              <Entypo
                name="dot-single"
                size={20}
                color={Gray_theme.gray_50}
                style={styles.dot}
              />
            </View>
          </View>
        </View>
        <View style={styles.mainContent}>
          <Text style={{ ...styles.mainCText, textAlign: "center" }}>
            작성된 리뷰가 없습니다.
          </Text>
        </View>
      </View>
      <View style={styles.btnC}>
        <BtnC
          onPress={() => {
            setReviewModalOpen(!reviewModalOpen);
          }}
        >
          리뷰 쓰기
        </BtnC>
      </View>
      <Line />
      <View style={{ flex: 1, marginTop: 24 }}>
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
                        <Text style={styles.vegType}>{item.user_veg_type}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <Image
                          source={MainIcons.error}
                          style={styles.reportIcon}
                        ></Image>
                      </TouchableOpacity>
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
    marginVertical: 24,
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
});
