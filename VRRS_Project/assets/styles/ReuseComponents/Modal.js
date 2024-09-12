import React, { Children, useCallback, useMemo, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Gray_theme } from "../../../assets/styles/Theme_Colors";

export default function Modal({ Children }) {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // 화면이 포커스될 때 BottomSheet 초기화
  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스될 때 첫 번째 스냅 포인트로 설정
      bottomSheetRef.current?.expand(); // 25% 위치로 이동
    }, [])
  );

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 24,
              marginTop: 24,
            }}
          >
            {Children}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Gray_theme.gray_60,
  },
  contentContainer: {
    flex: 1,
  },
});
