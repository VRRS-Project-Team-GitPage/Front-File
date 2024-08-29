// 회색 구분선 Component 입니다.
// 필요시 import 하여 사용하실 수 있습니다.

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Gray_theme } from "../Theme_Colors";

// style Props: 다른 Component에서 스타일을 자유롭게 추가할 수 있습니다.
const Line = ({ style }) => {
  return <View style={[styles.thinLine, style]}></View>;
};

const styles = StyleSheet.create({
  thinLine: {
    height: 12,
    borderTopWidth: 1,
    borderTopColor: Gray_theme.gray_30,
    backgroundColor: Gray_theme.gray_20,
    // 필요한 다른 기본 스타일들
  },
});

export default Line;
