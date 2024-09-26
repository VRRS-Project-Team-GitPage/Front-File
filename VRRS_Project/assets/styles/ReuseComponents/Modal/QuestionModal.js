import { StyleSheet } from "react-native";
import { Text, View, Modal } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import BtnC from "../Button/BtnC";

const QuestionModal = ({
  children,
  onPress,
  style,
  visible,
  onRequestClose,
  onTouchEnd,
}) => {
  return (
    <Modal
      animationType="fade" //모달이 나타나는 방식
      visible={visible} //모달이 보이는 여부
      transparent={true} // 모달 배경 투명 여부
      onRequestClose={onRequestClose} // 뒤로가기를 눌렀을 때
    >
      <View
        style={styles.modalBgc}
        onTouchEnd={onTouchEnd} // 모달창의 배경을 눌렀을 때
      >
        <View
          style={styles.modalContainer}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            {/* 모달 창의 제목이 되는 텍스트 입니다. */}
            <Text style={styles.modalHeaderText}>{children}</Text>
            <Octicons
              name="x"
              size={24}
              color={Gray_theme.gray_90}
              style={styles.modalHeaderX}
              onPress={onRequestClose}
            />
          </View>
          <View style={styles.modalBtn}>
            <BtnC style={style} onPress={onPress}>
              확인
            </BtnC>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBgc: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒷 배경 흐리게
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: Gray_theme.white,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 20,
    elevation: 3,
  },

  modalHeader: {
    height: 60,
    justifyContent: "center",
  },

  modalHeaderX: {
    position: "absolute",
    right: 24,
  },
  modalHeaderText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
  },
  modalBtn: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default QuestionModal;
