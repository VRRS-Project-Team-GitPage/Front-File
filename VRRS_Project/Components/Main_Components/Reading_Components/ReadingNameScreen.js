import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheetModal from "@gorhom/bottom-sheet";
import { useToast } from "react-native-toast-notifications";
// component 관련
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import QuestionModal from "../../../assets/styles/ReuseComponents/Modal/QuestionModal";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
// server 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { getOCRData } from "../../../assets/ServerDatas/ServerApi/readingApi";

export default function ProNameScreen({ route, navigation }) {
  const { jwt } = useUser();

  // 넘어온 이미지 값
  const { photoUri, triggerSubmit } = route.params || {};
  const { imgUri, triggerSubmitImg } = route.params || {};
  // 사진 로딩 상태 관리
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  // 이미지 저장
  const [checkImage, setCheckImage] = useState();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 촬영한 사진 로드
  useEffect(() => {
    if (triggerSubmit) {
      setIsPhotoLoaded(true);
      setIsImgLoaded(false);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // 선택한 사진 로드
  useEffect(() => {
    if (triggerSubmitImg) {
      setIsImgLoaded(true);
      setIsPhotoLoaded(false);
      navigation.setParams({ triggerSubmitImg: false });
    }
  }, [triggerSubmitImg]);

  // 이미지 저장
  useEffect(() => {
    if (isPhotoLoaded) {
      setCheckImage(photoUri);
    } else if (isImgLoaded) {
      setCheckImage(imgUri);
    }
  }, [isPhotoLoaded, isImgLoaded]);

  const [readingData, setReadingData] = useState(); // 판독 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 화면 지정
  const [errorMessageCode, setErrorMessageCode] = useState(null); // 오류 코드 상태 변수 및 기본값 설정

  const fetchOCRData = async (fileName, jwt) => {
    setLoading(true);
    setErrorMessageCode(null); // 요청 시작 시 오류 메시지 코드 초기화
    try {
      const data = await getOCRData(fileName, jwt); // OCR 데이터 가져오기
      if (data) {
        setReadingData(data);
      }
    } catch (error) {
      console.log("에러 코드", error.message);
      // 상태 코드에 따라 오류 메시지 코드 설정
      if (error.message.includes("422")) {
        const errorData = JSON.parse(error.message).data;
        setReadingData(errorData);
      } else if (error.message == 400) {
        setErrorMessageCode(1); // 사진을 분석하지 못했습니다. 다시 촬영해주세요
        showToast("사진을 다시 촬영해주세요", { duration: 3000 });
      } else {
        setErrorMessageCode(2); // 오류가 발생하였습니다
        showToast("알 수 없는 오류가 발생했습니다", { duration: 3000 });
      }
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (checkImage) {
      fetchOCRData(checkImage, jwt);
    }
  }, [checkImage]);

  // 판독 데이터 가공
  const [exists, setExists] = useState();
  const [fullBracket, setFullBracket] = useState();
  const [ingredients, setIngredients] = useState("판독된 내용이 없습니다");
  const [reportNum, setReportNum] = useState();
  const [check, setCheck] = useState(); // 가공 완료 여부

  useEffect(() => {
    if (readingData) {
      setExists(readingData.exists || false); // 초기값 설정
      setFullBracket(readingData.fullBracket || false);
      setIngredients(readingData.ingredients || "판독된 내용이 없습니다");
      setReportNum(readingData.reportNum || "");

      console.log("판독된 제품 여부 : ", readingData.exists);
      console.log("판독된 충족 여부 : ", readingData.fullBracket);
      console.log("판독된 원재료 : ", readingData.ingredients);
      console.log("판독된 품목 번호 : ", readingData.reportNum);
    }
  }, [readingData]);

  // BottomSheet를 참조하기 위한 ref
  const bottomSheetRef = useRef(null);

  // BottomSheet의 스냅 포인트: 위치 설정
  const snapPoints = useMemo(() => ["40%", "80%"]);

  // 화면이 focus될 때마다 BottomSheet가 다시 열리도록 설정
  useFocusEffect(
    useCallback(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(1); /// BottomSheet가 열리는 위치로 이동
      }
      return () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.close(); // 포커스 되지 않았을 때
        }
      };
    }, [])
  );

  // snapPoints에 따른 오버레이 설정
  const [backgroundOpacity, setBackgroundOpacity] = useState(true);
  // 오버레이 애니메이션 상태
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: backgroundOpacity ? 1 : 0, // true면 보여지고 false면 사라짐
      duration: 100, // 500ms 동안 fade-in/out
      useNativeDriver: true,
    }).start();
  }, [backgroundOpacity]);

  const toast = useToast();
  const handleToast = () => {
    {
      readingData && readingData.ingredients
        ? toast.show(
            "실제 내용과 인식된 내용이 다를 경우 수정할 수 있어요. 정확한 결과를 위해 실제 제품명과 다르다면 수정해주세요.",
            {
              type: "custom",
              duration: 3000,
              placement: "bottom",
              style: styles.toastStyle,
              textStyle: styles.toastFont,
              animationType: "slide-in",
            }
          )
        : toast.show(
            "사진에 원재료명이 없거나 사진을 인식하지 못했어요. 사진의 경우 세로로 가까이서 찍어주세요.",
            {
              type: "custom",
              duration: 3000,
              placement: "bottom",
              style: styles.toastStyle,
              textStyle: styles.toastFont,
              animationType: "slide-in",
            }
          );
    }
  };

  const [confirmModal, setConfirmModal] = useState(false);
  const handleConfirmModal = () => {
    setConfirmModal(false);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Main_theme.main_30} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <QuestionModal
        visible={confirmModal}
        onRequestClose={handleConfirmModal}
        onPress={() => {
          if (check) {
            setConfirmModal(false);
            bottomSheetRef.current.close();
            navigation.navigate("ReadTab", {
              screen: "Result",
              params: {
                img_path: isPhotoLoaded ? photoUri : imgUri,
                reportNum: reportNum,
                ingredients: ingredients,
                exists: exists,
                fullBracket: fullBracket,
                triggerSubmit: true,
              },
            });
          }
        }}
        children={"원재료명이 정확히 작성되었나요?"}
      ></QuestionModal>

      {isPhotoLoaded || isImgLoaded ? ( // 사진 로딩 상태에 따른 렌더링 제어
        <ImageBackground
          source={isPhotoLoaded ? { uri: photoUri } : { uri: imgUri }}
          style={styles.background}
        >
          {backgroundOpacity ? (
            <Animated.View style={[styles.overlay, { opacity }]} />
          ) : null}
          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={(index) => {
              if (index === 1) {
                setBackgroundOpacity(true);
              } else {
                setBackgroundOpacity(false);
              }
            }}
          >
            <View style={styles.contentContainer}>
              <View
                style={{
                  paddingHorizontal: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 24,
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pretendard-Bold",
                      fontSize: 16,
                      color: Gray_theme.gray_80,
                      marginBottom: 16,
                    }}
                  >
                    원재료명을 확인해주세요.
                  </Text>
                  <Octicons
                    name="x"
                    size={24}
                    color={Gray_theme.gray_80}
                    onPress={() => {
                      if (bottomSheetRef.current) {
                        bottomSheetRef.current.close(); // bottomSheet 닫기
                        navigation.goBack(); // Home 화면으로 돌아가기
                      }
                    }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  {readingData && readingData.ingredients ? (
                    <TextInput
                      multiline={true} // 여러 줄 입력 가능
                      style={{
                        width: windowWidth - 32,
                        ...styles.errorText,
                      }}
                      onChangeText={(text) => setIngredients(text)}
                      value={ingredients}
                    ></TextInput>
                  ) : (
                    <View>
                      {errorMessageCode === 1 && (
                        <Text
                          style={{
                            width: windowWidth - 32,
                            ...styles.errorText,
                          }}
                        >
                          인식할 텍스트가 없습니다. {"\n"}올바른 사진을 업로드
                          해주세요.
                        </Text>
                      )}
                      {errorMessageCode === 2 && (
                        <Text
                          style={{
                            width: windowWidth - 32,
                            ...styles.errorText,
                          }}
                        >
                          오류가 발생했습니다. 다시 시도해주세요.
                        </Text>
                      )}

                      {readingData && !readingData.ingredients && (
                        <Text
                          style={{
                            width: windowWidth - 32,
                            ...styles.errorText,
                          }}
                        >
                          올바른 이미지를 등록해주세요.
                        </Text>
                      )}
                    </View>
                  )}
                </View>

                <View
                  style={{
                    marginTop: 8,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={handleToast}
                  >
                    <Octicons
                      name="question"
                      size={10}
                      color={Gray_theme.gray_60}
                    />

                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 10,
                        fontFamily: "Pretendard-Medium",
                        color: Gray_theme.gray_60,
                      }}
                    >
                      {readingData && readingData.ingredients
                        ? "실제 내용과 다르다면?"
                        : "분석 결과가 없다면?"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginBottom: 24,
                paddingHorizontal: 16,
              }}
            >
              <Btn
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  flex: 1,
                  marginRight: 4,
                }}
              >
                {isPhotoLoaded ? "다시 촬영하기" : "다시 선택하기"}
              </Btn>
              {readingData && readingData.ingredients ? (
                <BtnC
                  onPress={() => {
                    setCheck(true);
                    setConfirmModal(true);
                  }}
                  style={{
                    flex: 1,
                    marginLeft: 4,
                  }}
                >
                  결과 확인하기
                </BtnC>
              ) : (
                <BtnC
                  onPress={() => {
                    showToast("확인할 내용이 없습니다");
                  }}
                  style={{
                    backgroundColor: Gray_theme.gray_40,
                    borderColor: Gray_theme.gray_40,
                    flex: 1,
                    marginLeft: 4,
                  }}
                >
                  결과 확인하기
                </BtnC>
              )}
            </View>
          </BottomSheetModal>
        </ImageBackground>
      ) : (
        // 로딩 상태가 false일 때 표시할 컴포넌트
        <ActivityIndicator size="large" color={Gray_theme.gray_20} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒷 배경 흐리게
  },
  sheetContents: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },

  iconC: {
    marginRight: 16,
  },

  textC: {
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  errorText: {
    backgroundColor: Gray_theme.gray_20,
    borderWidth: 1,
    borderColor: Gray_theme.gray_60,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.balck,
  },
  toastStyle: {
    position: "absolute",
    bottom: 80,
    backgroundColor: Gray_theme.gray_20,
    borderWidth: 1,
    borderColor: Gray_theme.gray_30,
    borderRadius: 12,
  },
  toastFont: {
    color: Gray_theme.gray_60,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
  },
});
