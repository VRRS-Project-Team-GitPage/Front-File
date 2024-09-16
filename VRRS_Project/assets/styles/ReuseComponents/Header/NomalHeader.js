// 기본 헤더 Comnponent입니다.
// import하여 사용해주세요.
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
// assets 관련
import { Gray_theme } from "../../Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";

const NomalHeader = ({ children, onPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{children}</Text>
      <Octicons
        name="x"
        size={24}
        color={Gray_theme.gray_80}
        style={styles.headerIcon}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
  },
  headerIcon: {
    position: "absolute",
    right: 16,
  },
  resultContainer: {
    borderRadius: 15,
    backgroundColor: Gray_theme.white,
  },
});

export default NomalHeader;