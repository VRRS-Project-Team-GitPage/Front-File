// 배경색이 있는 버튼 Component 입니다.
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";

const BtnC = ({ children, onPress, style }) => {
  return (
    <View style={[styles.BtnContainer, style]}>
      <Text style={styles.BtnTitle} onPress={onPress}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Main_theme.main_30,
    borderWidth: 2,
    borderColor: Main_theme.main_30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  BtnTitle: {
    textAlign: "center",
    color: Gray_theme.white,
    fontFamily: "Pretendard-SemiBold",
  },
});

export default BtnC;
