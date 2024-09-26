import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../../../../assets/ServerDatas/Users/UserContext";
import { Gray_theme, Main_theme } from "../../../../assets/styles/Theme_Colors";

export default function SecondTab({ route }) {
  const { vegTypeName } = useUser();
  const { ingredientText } = route.params;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.bContentMainUserType}>{vegTypeName}</Text>
        <Text style={styles.bContentMaintInfo}>
          해당 유형이 섭취할 수 없는 재료예요
        </Text>
        <Text style={styles.bContentIngredient}>{ingredientText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  modalContent: {
    padding: 24,
    marginTop: 12,
  },
  bContentMainUserType: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    color: Main_theme.main_50,
  },
  bContentMaintInfo: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: Gray_theme.gray_80,
  },
  bContentIngredient: {
    marginTop: 24,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
});
