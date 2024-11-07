import { StyleSheet } from "react-native";
import { Text, View, Modal } from "react-native";
import { Main_theme, Gray_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function DrawalModal({
  visible,
  onRequestClose,
  onPress_c,
  onPress,
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
          <View style={styles.modalHeader}>
            {/* 모달 창의 제목이 되는 텍스트 입니다. */}
            <Text style={styles.modalHeaderText}>정말 탈퇴하시겠습니까?</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
            }}
          >
            <Text style={styles.modalContents}>
              {"\n"}
              탈퇴 완료 시 개인 사전 데이터{"\n"}및 작성하신 리뷰는 모두
              삭제됩니다.
              {"\n"}
              {"\n"}
              탈퇴로 인한 모든 책임과 조치는{"\n"}[이용약관]과 [개인정보 처리 및
              방침]{"\n"}('내 정보' 탭에서 확인 가능합니다.)에 의거하며 회원의
              귀책사유로 인한 손해에 대해서는 신한대학교 졸업 프로젝트 B-2조가
              {"\n"}
              책임을 지지 않습니다.
              {"\n"}
            </Text>
          </View>

          <View style={styles.modalBtn}>
            <BtnC
              style={styles.style_cancle}
              stlye_title={styles.cancle_title}
              onPress={onPress_c}
            >
              취소
            </BtnC>
            <BtnC style={styles.style_ok} onPress={onPress}>
              확인
            </BtnC>
          </View>
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
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: Gray_theme.white,
    width: "100%",
    borderRadius: 10,
    elevation: 3,
  },

  modalHeader: {
    paddingTop: 36,
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderText: {
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  modalContents: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_90,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  style_cancle: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Gray_theme.gray_30,
    borderColor: Gray_theme.gray_30,
    marginRight: 4,
  },
  cancle_title: {
    color: Gray_theme.gray_70,
  },
  style_ok: {
    flex: 1,
    justifyContent: "flex-end",
    borderColor: Main_theme.main_reverse,
    backgroundColor: Main_theme.main_reverse,
    marginLeft: 4,
  },
});
