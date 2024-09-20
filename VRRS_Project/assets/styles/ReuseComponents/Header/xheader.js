// X 헤더 Comnponent입니다.
// import하여 사용해주세요.
import { View } from "react-native";
import { StyleSheet } from "react-native";
// assets 관련
import { Gray_theme } from "../../Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";

const NomalHeader = ({ onPress }) => {
  return (
    <View style={styles.header}>
      <Octicons
        name="x"
        size={24}
        color={Gray_theme.gray_90}
        style={styles.headerX}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
  },
  headerX: {
    position: "absolute",
    right: 24,
  },
});

export default NomalHeader;
