import { View, Text, TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Modal } from "react-native";
// design
import { Gray_theme, Main_theme } from "../../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
// component
import IngredientTab from "./IngredientTab";

export default function IngredientModal({
  visible,
  onRequestClose,
  onPress,
  ingredientText,
}) {
  return (
    <Modal
      animationType="fade" //모달이 나타나는 방식
      visible={visible} //모달이 보이는 여부
      transparent={true} // 모달 배경 투명 여부
      onRequestClose={onRequestClose} // 뒤로가기를 눌렀을 때
    >
      <View
        style={styles.modalBgc}
        onTouchEnd={onRequestClose} // 모달창의 배경을 눌렀을 때
      >
        <View
          style={styles.modalContainer}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View style={styles.bottomHeader}>
            <TouchableWithoutFeedback onPress={onRequestClose}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Octicons
                  name="chevron-left"
                  size={24}
                  color={Gray_theme.gray_90}
                />
                <Text style={styles.bheaderMainT}>원재료명</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.bheaderSubT} onPress={onPress}>
              오류 제보하기
            </Text>
          </View>
          <IngredientTab ingredientText={ingredientText} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBgc: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒷 배경 흐리게
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Gray_theme.white,
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
  },
  bottomHeader: {
    marginTop: 16,
    height: 60,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bheaderMainT: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: Gray_theme.balck,
    marginLeft: 16,
  },
  bheaderSubT: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: Gray_theme.gray_40,
  },
  bContent: {
    flex: 1,
  },
});
