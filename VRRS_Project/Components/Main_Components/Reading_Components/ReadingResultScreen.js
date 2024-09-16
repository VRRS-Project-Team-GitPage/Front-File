import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImageManipulator from "expo-image-manipulator";
// assets 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
// Component 관련
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";

export default function ReadingResultScreen({ navigation, route }) {
  const { productUri, triggerSubmit } = route.params || {};
  const [isUriLoaded, setIsUriLoaded] = useState(false);
  const [checkImage, setCheckImage] = useState();

  // 넘어온 사진 로드
  useEffect(() => {
    if (triggerSubmit) {
      console.log(productUri);
      setIsUriLoaded(true);
      navigation.setParams({ triggerSubmit: false });
    }
  }, [triggerSubmit]);

  // 이미지 리사이징 함수
  const resizeImage = async (uri) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            resize: {
              height: 250,
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      return resizedImage.uri;
    } catch (error) {
      console.error("Image resizing error: ", error);
    }
  };

  // 이미지가 로드되었을 때, 비율을 유지한 채로 리사이즈
  useEffect(() => {
    if (isUriLoaded) {
      resizeImage(productUri).then((resizedUri) => {
        setCheckImage(resizedUri);
      });
    }
  }, [isUriLoaded]);

  // 판독 결과를 출력하는 텍스트 변수
  const [resultText, setResultText] = useState("섭취 가능");
  const [resultInfoText, setResultInfoText] =
    useState("이 제품은 먹을 수 있어요!");

  return (
    <SafeAreaView style={styles.container}>
      <NomalHeader
        onPress={() => {
          navigation.navigate("HomeTab", {
            screen: "Home",
          });
        }}
      >
        판독 결과
      </NomalHeader>
      <View style={styles.resultContainer}>
        <View style={styles.imgContainer}>
          {isUriLoaded ? (
            <Image
              source={{ uri: checkImage }}
              style={styles.resultImg}
            ></Image>
          ) : (
            <ActivityIndicator size="large" color={Gray_theme.gray_20} />
          )}
        </View>
        <View style={styles.resultTextContainer}>
          <Text>{resultInfoText}</Text>
          <Text style={styles.resultText}>{resultText}</Text>
        </View>
        <View>
          <Text>{}님의 유형으로 제품을 판독한 결과입니다.</Text>
          <Text>원재료명을 확인하고 더 자세한 결과를 알아보세요.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Main_theme.main_10,
    paddingHorizontal: 16,
  },
  resultContainer: {
    marginTop: 16,
    paddingVertical: 4,
    borderRadius: 30,
    backgroundColor: Gray_theme.white,
    alignItems: "center",
  },
  imgContainer: {
    marginTop: 32,
    paddingVertical: 12,
  },
  resultImg: {
    width: 250,
    height: 250,
  },
  resultTextContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resultText: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: 32,
    color: Main_theme.main_30,
    textAlign: "center",
  },
  resultInfoText: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.gray_80,
  },
});
