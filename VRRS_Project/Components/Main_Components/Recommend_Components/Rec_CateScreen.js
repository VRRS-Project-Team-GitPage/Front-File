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
// data 관련
import { getProTypeName } from "../../../assets/ServerDatas/Dummy/dummyProducts";

export default function Rec_CateScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 하단바를 숨기는 로직
  useTabBarVisibility(false);

  // 선택된 카테고리를 관리하는 상태
  const [selectedCategories, setSelectedCategories] = useState(null);

  // 카테고리를 선택/해제하는 함수
  const toggleCategory = (category) => {
    if (selectedCategories === category) {
      // 이미 선택된 경우 선택 해제
      setSelectedCategories(null);
    } else {
      // 선택되지 않은 경우 선택
      setSelectedCategories(category);
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
            { id: 1, icon: Cate_Icons.sandwich },
            { id: 2, icon: Cate_Icons.pop },
            { id: 3, icon: Cate_Icons.cup },
            { id: 4, icon: Cate_Icons.salt },
          ].map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              activeOpacity={1}
              style={{
                ...styles.cateBtn,

                backgroundColor:
                  selectedCategories === category.id
                    ? Main_theme.main_10
                    : Gray_theme.white,
                borderColor:
                  selectedCategories === category.id
                    ? Main_theme.main_20
                    : Gray_theme.white,
                width: windowWidth / 2 - 36,
                height: windowWidth / 2 - 36,
              }}
            >
              <Image source={category.icon} style={{ width: 92, height: 92 }} />
              <Text style={styles.btnText}>{getProTypeName(category.id)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomContents}>
          {!selectedCategories ? (
            <Btn
              onPress={() => {
                showToast("한 가지 유형을 선택해주세요");
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
    borderWidth: 2,
    paddingVertical: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    color: Gray_theme.gray_80,
  },
  bottomContents: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 16,
  },
});
