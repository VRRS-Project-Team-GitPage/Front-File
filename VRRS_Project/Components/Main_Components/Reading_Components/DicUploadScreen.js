import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { StyleSheet, useWindowDimensions, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
// assets 관련 import
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import NomalHeader from "../../../assets/styles/ReuseComponents/Header/NomalHeader";
// Data 관련 import
import { categories } from "../../../assets/ServerDatas/Dummy/dummyProductCate";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import TouchableScale from "../../../assets/styles/TouchableScale";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function DicUploadScreen({ navigation }) {
  // 화면 크기를 저장한 변수
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  const [proImg, setProImg] = useState();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // 정사각형으로 잘라줍니다.
      quality: 1,
    });

    if (!result.canceled) {
      setProImg(result.assets[0].uri);
      setProductImage(result.assets[0].uri);
    }
  };

  const [proName, setProName] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    categories.map((item) => ({ label: item.name, value: item.id }))
  ); // 드롭다운 항목들

  // toast message를 띄워주기 위한 함수
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "전부 작성해주세요",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const [productName, setProductName] = useState();
  const [productImage, setProductImage] = useState();
  const [productCategory, setProductCategory] = useState();

  // 확인 버튼 눌렀을 때 호출될 함수
  const handleSubmit = () => {
    console.log(
      "name:",
      productName,
      "img_path:",
      productImage,
      "pro_type_id:",
      productCategory
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NomalHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        제품 등록
      </NomalHeader>
      <View style={styles.contentsC}>
        <View>
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
              ></TextInput>
            </View>
          </View>
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
            <View style={{ flexDirection: "row" }}>
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
              {proImg ? (
                <View>
                  <Image
                    source={{
                      uri: proImg,
                    }}
                    style={{ ...styles.pickImg, marginLeft: 12 }}
                  ></Image>
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
                    onPress={() => {
                      setProImg(null);
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
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
                backgroundColor: !open ? Gray_theme.gray_20 : Gray_theme.white, // 드롭다운 버튼의 배경색
                borderRadius: 10, // 둥근 모서리
                borderColor: open ? Gray_theme.gray_50 : Gray_theme.gray_80, // 테두리 색상
              }}
              dropDownContainerStyle={{
                paddingHorizontal: 12,
              }}
              textStyle={{
                fontSize: 12, // 텍스트 크기
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.balck, // 텍스트 색상
              }}
              placeholderStyle={{
                fontSize: 12, // 텍스트 크기
                fontFamily: "Pretendard-Medium",
                color: Gray_theme.gray_60, // 플레이스홀더 텍스트 색상
              }}
              onChangeValue={(selectedValue) => {
                setProductCategory(selectedValue);
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 24,
        }}
      >
        {!productName || !productImage || !productCategory ? (
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
    borderRadius: 15,
  },
});
