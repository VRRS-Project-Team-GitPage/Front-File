import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import MainIcons from "../../../assets/Icons/MainIcons";
// component 관련
// Date 관련
import {
  getAllProducts,
  products,
  getVegTypeName,
  getProTypeNAme,
} from "../../../assets/ServerDatas/Dummy/dummyProducts";

export default function DicProductScreen({ navigation, route }) {
  const { id } = route.params || {};

  // 특정 id를 통해 제품을 찾는 함수
  const findProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  // id를 통해 찾은 제품을 저장할 state
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = findProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Octicons
            name="arrow-left"
            size={24}
            color={Gray_theme.gray_90}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>{product.name}</Text>
          <Image source={MainIcons.error} style={styles.headerIcon}></Image>
        </View>
        <ScrollView>
          <Text>하이</Text>
        </ScrollView>
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
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: Gray_theme.gray_90,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
  },
  conetent: {},
  image: {
    width: 250,
    height: 250,
  },
});
