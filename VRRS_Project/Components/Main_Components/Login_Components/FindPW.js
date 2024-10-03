import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function FindPW({navigation}) {
  const [email, setEmail] = useState('');
  const [id, setid] = useState('');

  const handleFindPW = () => {
    alert(`비밀번호 재설정 요청이 전송되었습니다: ${email}`);
    navigation.navigate('FindPWr1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          비밀번호를 찾기 위해{'\n'}가입했던 이메일과 아이디를 입력해주세요.
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디 입력"
          value={id}
          onChangeText={setid}
          keyboardType="default" // or 'ascii-capable'
          placeholderTextColor={Gray_theme.gray_40}
        />
      </View>
      <View style={styles.btnContainer}>
        <BtnC onPress={handleFindPW}>확인</BtnC>
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