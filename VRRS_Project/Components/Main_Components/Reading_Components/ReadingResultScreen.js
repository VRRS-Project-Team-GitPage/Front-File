import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
// assets 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MainIcons from "../../../assets/Icons/MainIcons";
// Component 관련
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import TouchableScale from "../../../assets/styles/TouchableScale";
// Data 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";

export default function ReadingResultScreen({ navigation, route }) {
  // user의 정보를 불러옴
  const { user, username, vegTypeName } = useUser();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const { productUri, triggerSubmit } = route.params || {};
  const [isUriLoaded, setIsUriLoaded] = useState(false);
  const [checkImage, setCheckImage] = useState();

  // 넘어온 사진 로드
  useEffect(() => {
    if (triggerSubmit) {
      console.log(productUri);
      setIsUriLoaded(true);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // 이미지 리사이징 함수
  const resizeImage = async (imageUri) => {
    try {
      // 1. 먼저 원본 이미지의 크기를 가져온다
      const originalImage = await ImageManipulator.manipulateAsync(
        imageUri,
        []
      );

      const originalWidth = originalImage.width;
      const originalHeight = originalImage.height;

      // 2. 가로 세로 비율 유지하면서 축소
      const maxWidth = 300; // 원하는 최대 가로 크기
      const maxHeight = 300; // 원하는 최대 세로 크기

      const aspectRatio = originalWidth / originalHeight;

      let resizeWidth = maxWidth;
      let resizeHeight = maxHeight;

      if (aspectRatio > 1) {
        // 가로가 더 긴 경우
        resizeHeight = maxWidth / aspectRatio;
      } else {
        // 세로가 더 긴 경우
        resizeHeight = maxHeight / aspectRatio;
      }

      // 3. 이미지 축소
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: resizeWidth, height: resizeHeight } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      return resizedImage.uri;
    } catch (error) {
      console.error("Image resizing error: ", error);
    }
  };

  // 이미지가 로드되었을 때, 비율을 유지한 채로 리사이즈
  useEffect(() => {
    if (isUriLoaded) {
      resizeImage(productUri).then((resizedUri) => {
        setCheckImage(resizedUri);
      });
    }
  }, [isUriLoaded]);

  // 판독 결과 가능 여부를 저장
  const [resultPossible, setResultPossible] = useState(true);
  // 섭취 가능할 때 제품이 사전에 있는지 여부를 저장
  const [inDictionary, setInDictionary] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <NomalHeader
        onPress={() => {
          navigation.navigate("HomeTab", {
            screen: "Home",
          });
        }}
      >
        판독 결과
      </NomalHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.resultContainer}>
          <View style={styles.imgContainer}>
            {isUriLoaded ? (
              <Image
                source={{ uri: checkImage }}
                style={styles.resultImg}
              ></Image>
            ) : (
              <ActivityIndicator size="large" color={Gray_theme.gray_20} />
            )}
          </View>
          <View style={styles.resultPossibleContainer}>
            <Text style={styles.resultInfoText}>
              {resultPossible
                ? "이 제품은 먹을 수 있어요!"
                : "이 제품은 먹을 수 없어요..."}
            </Text>
            <Text
              style={{
                ...styles.resultPossible,
                color: resultPossible
                  ? Main_theme.main_30
                  : Main_theme.main_reverse,
              }}
            >
              {resultPossible ? "섭취 가능" : "섭취 불가능"}
            </Text>
          </View>
          <View style={styles.infoTextContainer}>
            <View>
              <Text style={styles.userTypebg}>{vegTypeName}</Text>
            </View>
            <Text style={styles.infoText}>
              {username}님의 유형으로 제품을 판독한 결과입니다.
            </Text>
            <Text style={styles.infoText}>
              원재료명을 확인하고 더 자세한 결과를 알아보세요.
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.checkIng}>
            <Octicons name="search" size={24} color={Gray_theme.gray_80} />
            <Text
              style={{
                fontFamily: "Pretendard-Medium",
              }}
            >
              원재료명 확인하러 가기
            </Text>
            <Octicons
              name="chevron-right"
              size={24}
              color={Gray_theme.gray_80}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.otherContents}>
          {inDictionary || !resultPossible ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.ocTitle}>이런 제품은 어떠세요?</Text>
                <MaterialIcons
                  name="change-circle"
                  size={24}
                  color={Gray_theme.gray_60}
                  onPress={() => {
                    setInDictionary(false);
                  }}
                />
              </View>
            </View>
          ) : (
            <View>
              <TouchableScale
                style={styles.ocBtn}
                onPress={() => {
                  navigation.navigate("Upload");
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={styles.infoText}>
                      앗! 사전에 없는 제품이에요
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          ...styles.ocBtnTitle,
                          color: Main_theme.main_30,
                          marginRight: 6,
                        }}
                      >
                        제품
                      </Text>
                      <Text style={styles.ocBtnTitle}>등록하기</Text>
                    </View>
                  </View>
                  <Image
                    source={MainIcons.dictionary}
                    style={styles.ocIcon}
                  ></Image>
                </View>
              </TouchableScale>
              <View style={{ height: 60 }}>
                <Text
                  onPress={() => {
                    setInDictionary(true);
                  }}
                >
                  확인용
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <BtnC
          onPress={() => {
            navigation.navigate("BottomSheet");
          }}
        >
          다른 제품 확인하기
        </BtnC>
      </View>
      <View
        style={{
          height: 24,
        }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Main_theme.main_10,
  },
  resultContainer: {
    marginTop: 16,
    paddingVertical: 4,
    borderRadius: 30,
    backgroundColor: Gray_theme.white,
  },
  imgContainer: {
    marginTop: 32,
    paddingVertical: 12,
    alignItems: "center",
  },
  resultImg: {
    width: 300,
    height: 300,
  },
  resultPossibleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resultPossible: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 32,
    textAlign: "center",
  },
  resultInfoText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_80,
  },
  infoTextContainer: {
    width: "100%",
    marginVertical: 16,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    backgroundColor: Main_theme.main_20,
  },
  userTypebg: {
    backgroundColor: Main_theme.main_10,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    marginBottom: 12,
  },
  infoText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_80,
  },
  checkIng: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 12,
  },
  otherContents: {
    marginTop: 32,
  },
  ocTitle: {
    fontFamily: "Pretendard-SemiBold",
    marginRight: 8,
  },
  ocBtn: {
    width: "100%",
    marginTop: 8,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Gray_theme.white,
  },
  ocBtnTitle: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
  },
  ocIcon: {
    width: 180,
    height: 180,
    position: "absolute",
    right: 0,
    top: -46,
  },
});
