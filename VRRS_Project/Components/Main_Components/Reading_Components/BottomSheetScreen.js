import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import BottomSheetModal from "@gorhom/bottom-sheet";
import HomeScreen from "../Home_Components/HomeScreen";
import { Gray_theme } from "../../../assets/styles/Theme_Colors";
// Icon 관련 import
import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

export default function BottomSheetScreen({ navigation }) {
  // BottomSheet를 참조하기 위한 ref
  const bottomSheetRef = useRef(null);

  // BottomSheet의 스냅 포인트: 위치 설정
  const snapPoints = useMemo(() => ["35%"], []);

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
        bottomSheetRef.current.snapToIndex(0); // BottomSheet가 열리는 위치로 이동
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <HomeScreen />
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => {
            if (bottomSheetRef.current) {
              bottomSheetRef.current.close(); // sheet 바깥을 눌렀을 때 sheet 닫기
              navigation.navigate("HomeTab", {
                screen: "Home",
              });
            }
          }}
        />
      )}

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        onClose={() => {
          navigation.navigate("HomeTab", {
            screen: "Home",
          });
        }}
      >
        <View style={styles.contentContainer}>
          <View
            style={{
              paddingHorizontal: 24,
            }}
          >
            <View style={styles.contentHeader}>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: 16,
                  color: Gray_theme.gray_80,
                }}
              >
                사진을 등록해주세요
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
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("Camera");
              }}
            >
              <View style={styles.sheetContents}>
                <Feather
                  name="camera"
                  size={24}
                  color={Gray_theme.balck}
                  style={styles.iconC}
                />
                <Text>카메라로 촬영하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("Image");
              }}
            >
              <View style={styles.sheetContents}>
                <Octicons
                  name="image"
                  size={22}
                  color={Gray_theme.balck}
                  style={styles.iconC}
                />
                <Text>앨범에서 선택하기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  contentHeader: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  //sheetBtn: { position: "absolute", bottom: 96, right: 0, left: 0 },
});
