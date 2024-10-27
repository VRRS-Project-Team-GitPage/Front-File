import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function FindID({ navigation }) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const handleFindID = () => {
    fetch('https://chaesigeodi.ddns.net/auth/find/username', {
      method: 'POST',
      body: JSON.stringify({ email: email }), // JSON 형식으로 수정
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.username) {  // 응답이 username 필드를 포함할 경우
          alert(`아이디가 성공적으로 조회되었습니다.`);
          // 이메일과 아이디를 결과 화면에 전달
          navigation.navigate('FindIDr', { username: data.username, email: email });
        } else {
          alert('아이디를 찾을 수 없습니다. 입력한 정보를 확인해주세요.');
          // 이메일과 아이디를 결과 화면에 전달
          navigation.navigate('FindIDr', { email: email });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('네트워크 오류입니다'); // 네트워크 오류 메시지
      });
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
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
            setIsEmailTouched(true);
          }}
          keyboardType="email-address"
          placeholderTextColor={Gray_theme.gray_40}
        />
        <View style={{ height: 16 }}>
          {isEmailTouched && (!isEmailValid || email === '') ? (
            <Text style={styles.warningText}>유효한 이메일을 입력해주세요.</Text>
          ) : isEmailTouched && isEmailValid ? (
            <Text> </Text>
          ) : null}
        </View>
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
  titleContainer: {
    textAlign: 'left',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
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
  warningText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: Main_theme.main_reverse,
    marginTop: 4,
  },
});