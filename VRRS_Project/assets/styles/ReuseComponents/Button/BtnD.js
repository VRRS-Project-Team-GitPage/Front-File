// // 진한 배경색이 있는 버튼 Component 입니다. (커스텀 가능)
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";

const BtnD = ({ children, onPress, style, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.BtnContainer, containerStyle]}>
        <Text style={[styles.BtnTitle, textStyle]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Main_theme.main_50,
    borderWidth: 2,
    borderColor: Main_theme.main_50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  BtnTitle: {
    textAlign: "center",
    color: Gray_theme.white,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16, // 기본 폰트 크기
  },
});

export default BtnD;
