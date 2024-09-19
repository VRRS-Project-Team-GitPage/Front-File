import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { StyleSheet, useWindowDimensions, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
// assets 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";
// Data 관련 import
import { categories } from "../../../assets/ServerDatas/Dummy/dummyProductCate";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import TouchableScale from "../../../assets/styles/TouchableScale";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function DicUploadScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 최대 6개까지 저장 가능
  const [productImages, setProductImages] = useState([]);

  const pickImage = async () => {
    if (productImages.length >= 3) {
      ToastAndroid.showWithGravity(
        "최대 3개의 이미지만 등록할 수 있습니다.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = {
        id: Date.now(), // 현재 시간을 이용한 고유 id 생성
        uri: result.assets[0].uri,
      };

      setProductImages([...productImages, newImage]); // 새로운 이미지 추가
    }
  };

  const removeImage = (id) => {
    setProductImages(productImages.filter((img) => img.id !== id)); // 선택한 이미지 삭제
  };

  const [proName, setProName] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    categories.map((item) => ({ label: item.name, value: item.id }))
  ); // 드롭다운 항목들

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "전부 작성해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const [productName, setProductName] = useState();
  const [productCategory, setProductCategory] = useState();

  const handleSubmit = () => {
    console.log(
      "name:",
      productName,
      "images:",
      productImages,
      "pro_type_id:",
      productCategory
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NomalHeader onPress={() => navigation.goBack()}>제품 등록</NomalHeader>
      <View style={styles.contentsC}>
        <View>
          {/* 제품명 입력 */}
          <View style={styles.dataContents}>
            <View style={{ flexDirection: "row", ...styles.titleCotainer }}>
              <Text style={styles.cTitle}>제품명</Text>
              <FontAwesome5
                name="star-of-life"
                size={8}
                color={Main_theme.main_30}
                style={styles.cPoint}
              />
            </View>
            <View>
              <TextInput
                placeholder="제품 이름을 입력해주세요."
                value={proName}
                onChangeText={(text) => setProName(text)}
                style={{
                  width: windowWidth - 48,
                  backgroundColor: proName ? Gray_theme.gray_20 : null,
                  borderColor: proName
                    ? Gray_theme.gray_80
                    : Gray_theme.gray_50,
                  borderWidth: 1,
                  ...styles.textInput,
                }}
                onSubmitEditing={() => {
                  setProductName(proName);
                }}
              />
            </View>
          </View>

          {/* 제품 사진 업로드 */}
          <View style={styles.dataContents}>
            <View style={styles.titleCotainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cTitle}>제품 사진</Text>
                <FontAwesome5
                  name="star-of-life"
                  size={8}
                  color={Main_theme.main_30}
                  style={styles.cPoint}
                />
              </View>
              <Text style={styles.cTitleM}>
                제품 사진, 제품 원재료명을 업로드 해주세요.
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <TouchableScale onPress={pickImage}>
                <View
                  style={{
                    ...styles.pickImg,
                    backgroundColor: Gray_theme.gray_30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="camera" size={20} color={Gray_theme.gray_60} />
                  <View
                    style={{
                      marginTop: 2,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          productImages.length === 3
                            ? "Pretendard-SemiBold"
                            : "Pretendard-Medium",
                        fontSize: 10,
                        color:
                          productImages.length === 0
                            ? Gray_theme.gray_80
                            : productImages.length === 3
                            ? Main_theme.main_reverse
                            : Main_theme.main_30,
                      }}
                    >
                      {productImages.length}
                    </Text>
                    <MaterialCommunityIcons
                      name="slash-forward"
                      size={10}
                      color={Gray_theme.gray_80}
                    />
                    <Text
                      style={{
                        fontFamily: "Pretendard-Medium",
                        fontSize: 10,
                        color: Gray_theme.gray_80,
                      }}
                    >
                      3
                    </Text>
                  </View>
                </View>
              </TouchableScale>
              {productImages.map((image) => (
                <View key={image.id}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ ...styles.pickImg, marginLeft: 12 }}
                  />
                  <Octicons
                    name="x-circle-fill"
                    size={16}
                    color={Gray_theme.gray_60}
                    style={{
                      backgroundColor: Gray_theme.white,
                      borderRadius: 50,
                      position: "absolute",
                      right: -4,
                      top: -4,
                    }}
                    onPress={() => removeImage(image.id)} // 이미지 삭제 버튼
                  />
                </View>
              ))}
            </View>
          </View>

          {/* 제품 유형 선택 */}
          <View style={styles.dataContents}>
            <View style={styles.titleCotainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.cTitle}>제품 유형</Text>
                <FontAwesome5
                  name="star-of-life"
                  size={8}
                  color={Main_theme.main_30}
                  style={styles.cPoint}
                />
              </View>
              <Text style={styles.cTitleM}>
                제품 뒤 식품 유형과 동일하게 선택해주세요.
              </Text>
            </View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="제품 유형을 선택하세요"
              style={{
                paddingHorizontal: 16,
                backgroundColor: !open ? Gray_theme.gray_20 : Gray_theme.white,
                borderRadius: 10,
                borderColor: open ? Gray_theme.gray_50 : Gray_theme.gray_80,
              }}
              dropDownContainerStyle={{
                paddingHorizontal: 12,
              }}
              textStyle={{
                fontSize: 12,
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.balck,
              }}
              placeholderStyle={{
                fontSize: 12,
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.gray_60,
              }}
              onChangeValue={(selectedValue) => {
                setProductCategory(selectedValue);
              }}
            />
          </View>
        </View>
      </View>

      {/* 하단 등록 완료 버튼 */}
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          right: 0,
          left: 0,
          top: windowHeigh - 48,
          bottom: 0,
        }}
      >
        {!productName || productImages.length === 0 || !productCategory ? (
          <Btn onPress={showToastWithGravity}>등록 완료</Btn>
        ) : (
          <BtnC onPress={handleSubmit}>등록 완료</BtnC>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  contentsC: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  dataContents: {
    marginBottom: 24,
  },
  titleCotainer: {
    marginBottom: 16,
  },
  cTitle: {
    fontFamily: "Pretendard-Medium",
    color: Gray_theme.balck,
  },
  cPoint: {
    marginLeft: 2,
  },
  cTitleM: {
    fontFamily: "Pretendard-Medium",
    fontSize: 8,
    color: Main_theme.main_30,
    marginTop: 4,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 48,
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
  },
  pickImg: {
    width: 64,
    height: 64,
    backgroundColor: Gray_theme.white,
    borderRadius: 15,
  },
});
