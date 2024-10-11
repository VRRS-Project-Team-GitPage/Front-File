import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { Main_theme, Gray_theme } from "../../Theme_Colors";

export default function DropDown({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  onChangeValue,
  placeholder,
}) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      placeholderStyle={{
        fontFamily: "Pretendard-Regular",
        color: Gray_theme.gray_40,
      }}
      style={{
        ...styles.dropDownContainer,
        backgroundColor: open ? Gray_theme.gray_20 : Gray_theme.white,
      }}
      labelStyle={{
        ...styles.labelStyle,
        color: open ? Gray_theme.gray_40 : Gray_theme.balck,
      }}
      dropDownContainerStyle={{
        ...styles.dropDownContainerStyle,
        color: value ? Gray_theme.gray_50 : Gray_theme.balck,
      }}
      listItemContainerStyle={styles.listItemContainerStyle}
      selectedItemContainerStyle={styles.selectedItemContainerStyle}
      selectedItemLabelStyle={styles.selectedItemLabelStyle}
      listItemLabelStyle={styles.listItemLabelStyle}
      showTickIcon={false}
      onChangeValue={onChangeValue}
    ></DropDownPicker>
  );
}

const styles = StyleSheet.create({
  // DropDown의 스타일
  dropDownContainer: {
    // 전반적인 스타일을 결정
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: Gray_theme.gray_60,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: "Pretendard-Medium",
  },
  dropDownContainerStyle: {
    // 리스트 항목의 전체 스타일
    elevation: 3,
    borderColor: Gray_theme.gray_30,
  },
  listItemContainerStyle: {
    // 리스트의 항목의 칸 스타일
    paddingHorizontal: 12,
    height: 40,
  },
  selectedItemContainerStyle: {
    // 리스트의 항목 중 선택된 칸 스타일
    paddingHorizontal: 12,
    backgroundColor: Main_theme.main_10,
  },
  selectedItemLabelStyle: {
    // 리스트 항목 중 선택된 라벨 스타일
    fontSize: 12,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
  },
  listItemLabelStyle: {
    // 리스트 항목 중 나머지 라벨 스타일
    fontSize: 12,
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_40,
  },
});
