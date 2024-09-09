// 테두리가 있는 버튼 Component 입니다.
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";

const Btn = ({ children, onPress }) => {
  return (
    <View style={styles.BtnContainer}>
      <Text style={styles.BtnTitle} onPress={onPress}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  BtnContainer: {
    backgroundColor: Gray_theme.white,
    borderWidth: 2,
    borderColor: Main_theme.main_30,
    paddingVertical: 12,
    marginHorizontal: 24,
    borderRadius: 10,
  },
  BtnTitle: {
    textAlign: "center",
    color: Main_theme.main_30,
    fontFamily: "Pretendard-SemiBold",
  },
});

export default Btn;
