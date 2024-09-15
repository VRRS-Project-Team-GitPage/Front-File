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
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheetModal from "@gorhom/bottom-sheet";
// Style 관련
import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
// Icon 관련 import
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

export default function IngredientScreen({ route, navigation }) {
  const { photoUri, triggerSubmit } = route.params || {};
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false); // 사진 로딩 상태 관리

  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const textInputRef = useRef();

  useEffect(() => {
    if (triggerSubmit) {
      setIsPhotoLoaded(true);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // BottomSheet를 참조하기 위한 ref
  const bottomSheetRef = useRef(null);

  // BottomSheet의 스냅 포인트: 위치 설정
  const snapPoints = useMemo(() => ["30%", "80%"]);

  // BottomSheet의 출력 여부를 판단하는 변수
  const [isOpen, setIsOpen] = useState(false);

  // BottomSheet가 변경될 때 호출되는 콜백 함수
  const handleSheetChanges = useCallback((index) => {
    setIsOpen(index !== -1); // BottomSheet가 열려 있으면 true로 설정
  }, []);

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

  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {isPhotoLoaded ? ( // 사진 로딩 상태에 따른 렌더링 제어
        <ImageBackground source={{ uri: photoUri }} style={styles.background}>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
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
                    placeholder="추후 원재료명이 작성될 예정입니다."
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                  ></TextInput>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
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
                다시 촬영하기
              </Btn>
              <BtnC
                onPress={() => {
                  navigation.navigate("ReadTab", {
                    screen: "Result",
                    params: { photoUri: photoUri, triggerSubmit: true },
                  });
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
});
