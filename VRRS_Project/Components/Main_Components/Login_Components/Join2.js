import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function Join2({ navigation }) {
    useTabBarVisibility(false);

    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
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
        const passwordRegex = /^[\w!@#\$%\^&\*\(\)]{8,20}$/;
        setIsPasswordValid(passwordRegex.test(password));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleConfirm = () => {
        if (isEmailValid && isIdValid && isPasswordValid && isIdChecked && isEmailChecked) {
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
                <Text style={styles.label}>이메일 *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        validateEmail(text);
                        setIsEmailTouched(true);
                    }}
                    keyboardType="email-address"
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton}>
                    <BtnD onPress={handleCode}>인증번호 전송</BtnD>
                </View>
                <View style={{ height: 24 }}>
                    {isEmailTouched && isEmailChecked && (!isEmailValid || email === '') ? (
                        <Text style={styles.warningText}>유효한 이메일을 입력해주세요.</Text>
                    ) : isEmailTouched && isEmailChecked && isEmailValid ? (
                        <Text style={styles.helperText}> </Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>아이디 *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="아이디를 입력하세요"
                    value={userId}
                    onChangeText={(text) => {
                        setUserId(text);
                        setIsIdTouched(true);
                        setIsIdChecked(false);
                        validateId(text);
                    }}
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton}>
                    <BtnD onPress={handleOverlap}>중복확인</BtnD>
                </View>
                <View style={{ height: 24 }}>
                    {isIdTouched && isIdChecked ? (
                        <Text style={styles.helperText}>사용할 수 있는 아이디입니다.</Text>
                    ) : isIdTouched && !isIdValid ? (
                        <Text style={styles.warningText}>아이디는 6-12자의 영문, 숫자만 사용이 가능합니다.</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>비밀번호 *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        validatePassword(text);
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

                <View style={{ height: 24 }}>
                    {isPasswordTouched && isPasswordValid ? (
                        <Text style={styles.helperText}>사용할 수 있는 비밀번호입니다.</Text>
                    ) : isPasswordTouched && !isPasswordValid ? (
                        <Text style={styles.warningText}>비밀번호는 8-20자리의 문자, 숫자, 기호 사용이 가능합니다.</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.button}>
                <BtnC onPress={handleConfirm}>다음</BtnC>
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
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
});
