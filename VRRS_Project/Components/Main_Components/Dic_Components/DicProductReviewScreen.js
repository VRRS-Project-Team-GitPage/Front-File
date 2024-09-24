import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StyleSheet, Modal } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
// data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function DicProductReviewScreen({ route, navigation }) {
  // user의 정보를 불러옴
  const { user, username, vegTypeName } = useUser();
  // 이전 화면에서 넘어온 정보
  const { reviewLength, reviewList } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      //console.log(reviewList);
    }, [])
  );

  // 리뷰 작성 여부
  const [userReview, setUserReview] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade" //모달이 나타나는 방식
        visible={userReview} //모달이 보이는 여부
        transparent={true} // 모달 배경 투명 여부
        onRequestClose={() => {
          setUserReview(false);
        }} // 뒤로가기를 눌렀을 때
      >
        <View style={styles.modalBgc} onTouchEnd={() => setUserReview(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>리뷰 쓰기</Text>
              <Octicons
                name="x"
                size={24}
                color={Gray_theme.gray_90}
                style={styles.modalHeaderX}
                onPress={() => setUserReview(false)}
              />
            </View>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.recCircle}>
                  <Image></Image>
                </View>
                <View style={styles.recCircle}>
                  <Image></Image>
                </View>
              </View>
              <Text>와</Text>
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
            setUserReview(!userReview);
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
    height: 360,
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
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: Gray_theme.gray_30,
  },
});
