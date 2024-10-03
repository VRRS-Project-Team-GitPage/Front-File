import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function FindID({navigation}) {
  const [email, setEmail] = useState('');

  const handleFindID = () => {
    alert(`아이디 찾기 요청이 전송되었습니다: ${email}`);
    navigation.navigate('FindIDr');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          아이디를 찾기 위해{'\n'}가입했던 이메일을 입력해주세요.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일 입력"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={Gray_theme.gray_40}
        />
      </View>
      <View style={styles.btnContainer}>
        <BtnC onPress={handleFindID}>확인</BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  titleContainer:{
    textAlign: 'left',
    paddingHorizontal:24,
    paddingVertical:24,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom:8,
  },
  btnContainer:{
    paddingHorizontal:16,
    paddingVertical:32,
  },

  title: {
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
  },
  input: {
    height: 48,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_40,
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
  },
});