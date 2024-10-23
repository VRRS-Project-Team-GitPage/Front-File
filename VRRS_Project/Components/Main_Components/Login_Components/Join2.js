import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';

import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { useUser } from "../../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용

export default function Join2({ navigation }) {
    useTabBarVisibility(false);
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;

    
  // [ 유저의 정보를 저장하는 내용입니다 ]
  const { signUpUser, id, name, vegTypeName } = useUser();
  const [emailText, setemailText] = useState("");
  const [idText, setIdText] = useState("");
  const [passwordText, setpasswordText] = useState("");
  
  // 유저 정보를 저장하는 함수
  const handleSave = () => {
    const userData = {
      // 저장할 내용은 실제 서버에서 받아와 넣어주시면 됩니다.
      email: emailText,
      id: idText,
      password:passwordText
    };
    signUpUser(userData); // 유저 정보를 저장
  };

  // 최종 로그인 함수 입니다
  // 로그인 여부에 필요한 로직을 추가하여 사용해주세요
  // (ex. 서버 내용 불러오기, textInput 확인하기 등)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isIdValid, setIsIdValid] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isIdTouched, setIsIdTouched] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    const validateId = (userId) => {
        const idRegex = /^[a-zA-Z0-9]{6,12}$/;
        setIsIdValid(idRegex.test(userId));
    };

    const validatePassword = (password) => {
        // 8-20자리의 영문자, 숫자, 특수문자만 허용
        const lengthAndCharacterRegex = /^[A-Za-z\d!@#\$%\^&\*\(\)]{8,20}$/;

        // 영문자, 숫자, 특수문자 각각의 존재 여부를 확인
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#\$%\^&\*\(\)]/.test(password);

        // 영문자, 숫자, 특수문자 중 2종류 이상이 포함되어 있는지 확인
        const isValidCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

        // 두 조건을 모두 만족해야 유효한 비밀번호로 인정
        setIsPasswordValid(lengthAndCharacterRegex.test(password) && isValidCombination);
    };

    // 비번 보기
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = () => {
        if (isEmailValid && isIdValid && isPasswordValid && isIdChecked && isEmailChecked) {
            handleSave();
            navigation.navigate('Join3');
        } else {
            alert('입력한 정보를 확인해주세요.');
        }
    };
    const handleCode = () => {
        setIsEmailChecked(true);
        alert('인증번호 전송 완료');
    };
    const handleOverlap = () => {
        setIsIdChecked(true);
        alert('중복확인 완료');
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >회원가입하기
            </BackHeader>

            <View style={styles.stepContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.stepHeader}>계정생성</Text>
                </View>
                <View style={styles.stepIndicator1}>
                    <Octicons name="dot-fill" size={24} color="#E0E0E0" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <MaterialCommunityIcons name="numeric-2-circle" size={24} color="#468585" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <Octicons name="dot" size={24} color="#E0E0E0" />
                </View>
                <View style={styles.stepIndicator2}>
                    <Text style={styles.stepText2}>약관동의</Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText1}>계정생성</Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText2}>정보입력</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>이메일</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="이메일을 입력하세요"
                    value={emailText}
                    onChangeText={(email) => {
                        setemailText(email);
                        setIsEmailTouched(true);
                        setIsEmailChecked(false);
                        validateEmail(email);
                    }}
                    keyboardType="email-address"
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton}>
                    <BtnD onPress={handleCode} disabled={!isEmailValid}>인증번호 전송</BtnD>
                </View>
                <View style={{ height: 24 }}>
                    {isEmailTouched && isEmailChecked ? (
                        <Text style={styles.helperText}>인증되었습니다.</Text>
                    ) : isEmailTouched && !isEmailValid ? (
                        <Text style={styles.warningText}>유효한 이메일을 입력해주세요.</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>아이디</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="아이디를 입력하세요"
                    value={idText}
                    onChangeText={(id) => {
                        setIdText(id);
                        setIsIdTouched(true);
                        setIsIdChecked(false);
                        validateId(id);
                    }}
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton}>
                    <BtnD onPress={handleOverlap} disabled={!isIdValid}>중복확인</BtnD>
                </View>
                <View style={{ height: 24 }}>
                    {isIdTouched && isIdChecked ? (
                        <Text style={styles.helperText}>사용할 수 있는 아이디입니다.</Text>
                    ) : isIdTouched && !isIdValid ? (
                        <Text style={styles.warningText}>아이디는 6-12자의 영문자, 숫자만 사용이 가능합니다.</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>비밀번호</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력하세요"
                    value={passwordText}
                    onChangeText={(password) => {
                        setpasswordText(password);
                        validatePassword(password);
                        setIsPasswordTouched(true);
                    }}
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor={Gray_theme.gray_40}
                />

                <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                        <Octicons name="eye" size={18} color="gray" />
                    ) : (
                        <Octicons name="eye-closed" size={18} color="gray" />
                    )}
                </TouchableOpacity>

                <View style={{ height: 28 }}>
                    {isPasswordTouched && isPasswordValid ? (
                        <Text style={styles.helperText}>사용할 수 있는 비밀번호입니다.</Text>
                    ) : isPasswordTouched && !isPasswordValid ? (
                        <Text style={styles.warningText}>비밀번호는 8-20자리의 영문자, 숫자, 특수문자 조합으로 사용이 가능합니다.</Text>
                    ) : null}
                </View>
            </View>

            <View style={{ ...styles.button, top: windowHeigh -36 }}>
                <BtnC onPress={handleLogin}>다음</BtnC>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    stepContainer: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    stepHeader: {
        fontSize: 24,
        fontFamily: 'Pretendard-Bold',
        color: Main_theme.main_50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepIndicator1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 80,
        marginTop: 20,
    },
    stepIndicator2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 72,
    },
    stepText1: {
        fontSize: 14,
        color: Main_theme.main_50,
    },
    stepText2: {
        fontSize: 14,
        color: Gray_theme.gray_30,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        marginLeft: 8,
    },
    input: {
        height: 42,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: Gray_theme.gray_40,
        fontFamily: "Pretendard-Regular",
        fontSize: 14,
    },
    helperText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Regular',
        color: Main_theme.main_50,
        marginTop: 4,
    },
    warningText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Regular',
        color: Main_theme.main_reverse,
        marginTop: 4,
    },
    overlapButton: {
        position: 'absolute',
        right: 8,
        bottom: 32,
        paddingHorizontal: 16,
    },
    icon: {
        position: 'absolute',
        right: 32,
        bottom: 32,
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
    cPoint: {
        marginLeft: 4,
        marginTop: 2
    },
});
