import { View, Text, TextInput } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
// component 관련
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

export default function Rec_KeywordScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        키워드로 추천받기
      </BackHeader>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>먹고 싶은</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.title, color: Main_theme.main_30 }}>
              제품 키워드
            </Text>
            <Text style={styles.title}>를</Text>
          </View>
          <Text style={styles.title}>입력해주세요.</Text>
        </View>
        <View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="키워드를 입력해주세요"
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              onSubmitEditing={() => {
                if (searchText === "") {
                  showToast("키워드가 입력되지 않았습니다");
                } else {
                  navigation.navigate("Key_Result", {
                    text: searchText,
                    triggerSubmit: true,
                  });
                }
              }}
              style={{
                width: windowWidth - 32,
                backgroundColor: searchText ? Gray_theme.gray_30 : null,
                borderColor: searchText
                  ? Gray_theme.gray_80
                  : Gray_theme.gray_50,
                ...styles.textInput,
              }}
            />
            <Octicons
              name="x-circle-fill"
              size={16}
              color={Gray_theme.gray_50}
              style={{
                position: "absolute",
                right: 40,
                top: 16,
              }}
              onPress={() => {
                setSearchText("");
              }}
            />
          </View>
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
  titleContainer: {
    marginVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 24,
  },
  textInput: {
    borderWidth: 1,
    height: 48,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 48,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
  },
});
