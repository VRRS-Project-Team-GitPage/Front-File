import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";

const BtnD = ({
  children,
  onPress,
  style,
  containerStyle,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : null}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.BtnContainer,
          containerStyle,
          disabled && styles.BtnDisabledContainer, // 비활성화 스타일 적용
        ]}
      >
        <Text
          style={[
            styles.BtnTitle,
            textStyle,
            disabled && styles.BtnDisabledTitle, // 비활성화 텍스트 스타일 적용
          ]}
        >
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  BtnTitle: {
    textAlign: "center",
    color: Gray_theme.white,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 14,
  },
  // 비활성화된 버튼의 스타일
  BtnDisabledContainer: {
    backgroundColor: Gray_theme.gray_40,
    borderColor: Gray_theme.gray_40,
  },
  BtnDisabledTitle: {
    color: Gray_theme.gray_20, // 비활성화된 텍스트 색상
  },
});

export default BtnD;
