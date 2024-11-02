import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import Xheader from "../../../assets/styles/ReuseComponents/Header/xheader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

import terms from '../../../assets/userinfoTerm';
import pterms from '../../../assets/privacyTerm';

import Octicons from "@expo/vector-icons/Octicons";

export default function UserSetting({ navigation }) {

  useTabBarVisibility(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

  const toggleTerms = () => {
    setIsTermsVisible(!isTermsVisible);
  };

  const togglePrivacy = () => {
    setIsPrivacyVisible(!isPrivacyVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Xheader
        onPress={() => {
          navigation.goBack();
        }}
      >
      </Xheader>
      <ScrollView contentContainerStyle={styles.scrcontainer}>
        {/* 이용약관 섹션 */}
        <TouchableOpacity style={styles.termItem} onPress={toggleTerms}>
          <Text style={styles.termTitle}>이용약관</Text>
          <Octicons name="chevron-down" size={20} color={Gray_theme.gray_40} style={styles.icon} />
        </TouchableOpacity>
        {isTermsVisible && (
          <View style={styles.termContent}>
          <Text style={styles.tbold}>{pterms.tbold1}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent1}</Text>
          <Text style={styles.tbold}>{pterms.tbold2}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent2}</Text>
          <Text style={styles.tbold}>{pterms.tbold3}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent3}</Text>
          <Text style={styles.tbold}>{pterms.tbold4}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent4}</Text>
          <Text style={styles.tbold}>{pterms.tbold5}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent5}</Text>
          <Text style={styles.tbold}>{pterms.tbold6}</Text>
          <Text style={styles.tcontent}>{pterms.tcontent6}</Text>
            <BtnC onPress={toggleTerms}>
              닫기
            </BtnC>
          </View>
        )}
        {/* 개인정보 약관 섹션 */}
        <TouchableOpacity style={styles.termItem} onPress={togglePrivacy}>
          <Text style={styles.termTitle}>개인정보 수집 및 처리 방침</Text>
          <Octicons name="chevron-down" size={20} color={Gray_theme.gray_40} style={styles.icon} />
        </TouchableOpacity>
        {isPrivacyVisible && (
          <View style={styles.termContent}>
            <Text style={styles.tbold}>{terms.tbold1}</Text>
            <Text style={styles.tcontent}>{terms.tcontent1}</Text>
            <Text style={styles.tbold}>{terms.tbold2}</Text>
            <Text style={styles.tcontent}>{terms.tcontent2}</Text>
            <Text style={styles.tbold}>{terms.tbold3}</Text>
            <Text style={styles.tcontent}>{terms.tcontent3}</Text>
            <Text style={styles.tline}>{terms.tline1}</Text>
            <Text style={styles.tcontent}>{terms.tcontent4}</Text>
            <Text style={styles.tline}>{terms.tline2}</Text>
            <Text style={styles.tcontent}>{terms.tcontent5}</Text>
            <Text style={styles.tline}>{terms.tline3}</Text>
            <Text style={styles.tcontent}>{terms.tcontent6}</Text>
            <Text style={styles.tbold}>{terms.tbold4}</Text>
            <Text style={styles.tcontent}>{terms.tcontent7}</Text>
            <Text style={styles.tline}>{terms.tline4}</Text>
            <Text style={styles.tcontent}>{terms.tcontent8}</Text>
            <Text style={styles.tline}>{terms.tline5}</Text>
            <Text style={styles.tcontent}>{terms.tcontent9}</Text>
            <Text style={styles.tline}>{terms.tline6}</Text>
            <Text style={styles.tcontent}>{terms.tcontent10}</Text>
            <Text style={styles.tline}>{terms.tline7}</Text>
            <Text style={styles.tcontent}>{terms.tcontent11}</Text>
            <Text style={styles.tbold}>{terms.tbold5}</Text>

            <BtnC onPress={togglePrivacy}>
              닫기
            </BtnC>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  scrcontainer: {
    paddingHorizontal: 16,
    paddingTop: 8
  },

  termItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Gray_theme.white,
    borderColor: Gray_theme.gray_30,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  termTitle: {
    fontSize: 16,
    fontWeight: 'Pretendard-Bold',
  },
  icon: {
    marginLeft: "auto",
  },
  termContent: {
    padding: 16,
    backgroundColor: Gray_theme.gray_20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Gray_theme.gray_30,
    marginBottom: 16,
  },
  termText: {
    fontSize: 16,
    marginBottom: 10,
  },

  agreementScroll: {
    padding: 16,
  },
  agreementText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: Gray_theme.balck,
  },
  //약관 text효과
  tbold: {
    fontFamily: 'Pretendard-SemiBold'
  },
  tline: {
    textDecorationLine: 'underline',
    fontSize: 16
  },
  tcontent: {
    fontFamily: 'Pretendard-Regular'
  },
});