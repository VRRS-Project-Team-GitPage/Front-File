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

export default function IngredientScreen({ route, navigation }) {
  const { photoUri, triggerSubmit } = route.params || {};
  const { imgUri, triggerSubmitImg } = route.params || {};
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false); // 사진 로딩 상태 관리
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [checkImage, setCheckImage] = useState();

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const textInputRef = useRef();

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
  const snapPoints = useMemo(() => ["30%", "80%"]);

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

  const toast = useToast();
  const handleToast = () => {
    toast.show(
      "실제 내용과 인식된 내용이 다를 경우 수정할 수 있어요. 정확한 결과를 위해 실제 원재료명과 다른 내용이 있다면 해당 부분을 눌러 수정해주세요.",
      {
        type: "custom",
        duration: 3000,
        position: "top",
        style: styles.toastStyle,
        textStyle: styles.toastFont,
        animationType: "slide-in",
      }
    );
  };

  const [searchText, setSearchText] = useState(
    "추후 원재료명이 작성될 공간입니다."
  );

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
            screen: "Result",
            params: {
              productUri: isPhotoLoaded ? photoUri : imgUri,
              ingredientText: searchText,
              triggerSubmit: true,
            },
          });
        }}
        style_cancle={styles.style_cancle}
        style_ok={styles.style_ok}
      >
        원재료명이 정확히 작성되었나요?
      </QuestionModal>
      {isPhotoLoaded || isImgLoaded ? ( // 사진 로딩 상태에 따른 렌더링 제어
        <ImageBackground
          source={isPhotoLoaded ? { uri: photoUri } : { uri: imgUri }}
          style={styles.background}
        >
          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
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
                  <TextInput
                    ref={textInputRef}
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
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
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
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 24,
                paddingHorizontal: 16,
              }}
            >
              <Btn
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  paddingHorizontal: 40,
                }}
              >
                {isPhotoLoaded ? "다시 촬영하기" : "다시 선택하기"}
              </Btn>
              <BtnC
                onPress={() => {
                  setConfirmModal(true);
                }}
                style={{
                  paddingHorizontal: 40,
                }}
              >
                결과 확인하기
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
