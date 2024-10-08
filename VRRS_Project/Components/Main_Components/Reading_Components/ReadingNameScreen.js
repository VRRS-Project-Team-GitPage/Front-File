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
// design 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";

export default function ProNameScreen({ route, navigation }) {
  // 넘어온 이미지 값
  const { photoUri, triggerSubmit } = route.params || {};
  const { imgUri, triggerSubmitImg } = route.params || {};
  // 사진 로딩 상태 관리
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
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

  // BottomSheet를 참조하기 위한 ref
  const bottomSheetRef = useRef(null);

  // BottomSheet의 스냅 포인트: 위치 설정
  const snapPoints = useMemo(() => ["35%", "60%"]);

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
    toast.show(
      "실제 내용과 인식된 내용이 다를 경우 수정할 수 있어요. 정확한 결과를 위해 실제 제품명과 다르다면 수정해주세요.",
      {
        type: "custom",
        duration: 3000,
        placement: "bottom",
        style: styles.toastStyle,
        textStyle: styles.toastFont,
        animationType: "slide-in",
      }
    );
  };

  // 제품명을 저장
  const [proName, setProName] = useState("추후 제품명이 작성될 공간입니다.");

  const [confirmModal, setConfirmModal] = useState(false);
  const handleConfirmModal = () => {
    setConfirmModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <QuestionModal
        visible={confirmModal}
        onRequestClose={handleConfirmModal}
        onPress={() => {
          setConfirmModal(false);
          bottomSheetRef.current.close();
          navigation.navigate("ReadTab", {
            screen: "IngridientScreen",
            params: {
              img_path: isPhotoLoaded ? photoUri : imgUri,
              name: proName,
              triggerSubmit: isPhotoLoaded,
              triggerSubmitImg: isImgLoaded,
            },
          });
        }}
        children={"제품명이 정확히 작성되었나요?"}
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
                    제품명을 확인해주세요.
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
                  <TextInput
                    style={{
                      width: windowWidth - 32,
                      backgroundColor: Gray_theme.gray_20,
                      borderWidth: 1,
                      borderColor: Gray_theme.gray_60,
                      borderRadius: 10,
                      padding: 16,
                      fontFamily: "Pretendard-Medium",
                      fontSize: 12,
                    }}
                    onChangeText={(text) => setProName(text)}
                    value={proName}
                  ></TextInput>
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
                      실제 내용과 다르다면?
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
              <BtnC
                onPress={() => {
                  setConfirmModal(true);
                }}
                style={{
                  flex: 1,
                  marginLeft: 4,
                }}
              >
                다음으로
              </BtnC>
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
