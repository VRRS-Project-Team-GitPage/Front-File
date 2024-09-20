import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Cate_Icons from "../../../assets/Icons/CateIcons";

export default function Rec_CateScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 하단바를 숨기는 로직
  useTabBarVisibility(false);

  // 선택된 카테고리를 관리하는 상태
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 카테고리를 선택/해제하는 함수
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // 이미 선택된 경우 선택 해제
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    } else {
      // 선택되지 않은 경우 선택
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // "확인" 버튼을 눌렀을 때 선택된 카테고리를 다음 화면으로 전달
  const handleConfirm = () => {
    navigation.navigate("Cate_Result", { selectedCategories });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        유형으로 추천받기
      </BackHeader>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>먹고 싶은</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.title, color: Main_theme.main_30 }}>
              제품 유형
            </Text>
            <Text style={styles.title}>을</Text>
          </View>
          <Text style={styles.title}>선택해주세요.</Text>
        </View>
        <View style={styles.mainContainer}>
          {[
            { id: "meal", name: "식사류", icon: Cate_Icons.burrito },
            { id: "snack", name: "간식", icon: Cate_Icons.pop },
            { id: "bakery", name: "베이커리", icon: Cate_Icons.bread },
            { id: "beverage", name: "음료", icon: Cate_Icons.cup },
          ].map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              activeOpacity={0.8}
              style={{
                ...styles.cateBtn,
                backgroundColor: selectedCategories.includes(category.id)
                  ? Main_theme.main_30
                  : Gray_theme.white,
                width: windowWidth / 2 - 36,
                height: windowWidth / 2 - 36,
              }}
            >
              <Image source={category.icon} style={{ width: 92, height: 92 }} />
              <Text
                style={{
                  ...styles.btnText,
                  color: selectedCategories.includes(category.id)
                    ? Gray_theme.white
                    : Gray_theme.gray_90,
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomContents}>
          {selectedCategories.length === 0 ? (
            <Btn
              onPress={() => {
                showToast("하나 이상 선택해주세요");
              }}
            >
              확인
            </Btn>
          ) : (
            <BtnC onPress={handleConfirm}>확인</BtnC>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
  },
  mainContainer: {
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: Gray_theme.gray_20,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  cateBtn: {
    borderRadius: 15,
    elevation: 3,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor: Gray_theme.white,
    paddingVertical: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
  },
  bottomContents: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 16,
  },
});
