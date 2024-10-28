import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// 사용자 갤러리 접근 관련 import
import * as ImagePicker from "expo-image-picker";
// assets 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
// Component 관련
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
import TouchableScale from "../../../assets/styles/ReuseComponents/TouchableScale";
import DropDown from "../../../assets/styles/ReuseComponents/Button/DropDown";
// Data 관련 import
import { categories } from "../../../assets/ServerDatas/Dummy/dummyProductCate";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
// server 관련
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { uploadProductData } from "../../../assets/ServerDatas/ServerApi/readingApi";

export default function DicUploadScreen({ navigation, route }) {
  const { jwt, vegTypeId } = useUser();
  const { ingredients, reportNum } = route.params || {};

  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // 1개의 이미지 업로드
  const [productImages, setProductImages] = useState([]);

  const pickImage = async () => {
    if (productImages.length >= 1) {
      showToast("1개의 이미지만 등록할 수 있습니다.");
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

  const [proName, setProName] = useState(); // 제품 이름
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    categories.map((item) => ({ label: item.name, value: item.id }))
  ); // 드롭다운 항목들

  const [productCategory, setProductCategory] = useState();

  const handleUpload = async () => {
    if (!proName || productImages.length === 0 || !value) {
      showToast("모든 항목을 작성해주세요.");
      return;
    }

    const image = productImages[0];
    const jsonData = {
      name: proName,
      ingredients: ingredients,
      reportNum: reportNum,
      categoryId: value,
      vegTypeId: vegTypeId,
    };
    console.log(image);
    console.log(jsonData);

    try {
      const response = await uploadProductData(image, jsonData, jwt);

      if (
        response.success === false &&
        response.message === "이미 등록된 제품입니다."
      ) {
        showToast(response.message);
        navigation.goBack(); // 이전 화면으로 돌아가기
        return;
      }

      showToast("제품이 성공적으로 등록되었습니다.");
      console.log("업로드 성공:", response);
      navigation.goBack();
    } catch (error) {
      showToast("서버 업로드에 실패했습니다.");
      console.error("업로드 오류:", error);
    }
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
            <View
              style={{
                flexDirection: "row",
              }}
            >
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
              />
              <Octicons
                name="x-circle-fill"
                size={16}
                color={Gray_theme.gray_60}
                style={{
                  position: "absolute",
                  right: -48,
                }}
                onPress={() => setProName("")} // 이미지 삭제 버튼
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
              <Text style={styles.cTitleM}>제품 사진을 업로드 해주세요.</Text>
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
                  <Entypo name="camera" size={24} color={Gray_theme.gray_60} />
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
              <Text style={styles.cTitleM}>식품 유형에 따라 선택해주세요.</Text>
            </View>
            <DropDown
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={"제품 유형을 선택하세요"}
              onChangeValue={(selectedValue) => {
                setProductCategory(selectedValue);
              }}
            />
          </View>
        </View>
      </View>

      {/* 하단 등록 완료 버튼 */}
      <View style={{ ...styles.btnC, top: windowHeigh - 48 }}>
        {!proName || productImages.length === 0 || !productCategory ? (
          <Btn
            onPress={() => {
              showToast("모든 항목을 작성해주세요");
            }}
          >
            등록 완료
          </Btn>
        ) : (
          <BtnC onPress={handleUpload}>등록 완료</BtnC>
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
  btnC: {
    paddingHorizontal: 16,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
});
