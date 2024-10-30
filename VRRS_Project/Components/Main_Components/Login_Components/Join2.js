
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { emailUser } from "../../../assets/ServerDatas/ServerApi/authApi";
import { checkidUser } from "../../../assets/ServerDatas/ServerApi/authApi";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

export default function Join2({ navigation }) {
    useTabBarVisibility(false);
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;

    const [timer, setTimer] = useState(180); // 3분 (180초)
    const [isTimerExpired, setIsTimerExpired] = useState(false); // 타이머 만료 여부
    const [isTimerVisible, setIsTimerVisible] = useState(false);

    // 타이머 
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsTimerExpired(true); // 타이머가 0이 되면 만료 처리
        }
    }, [timer]);

    const resetTimer = () => {
        setTimer(180);
        setIsTimerExpired(false);
    };

    const stopTimer = () => {
        setTimer(0);
    };

    // 초를 분:초로 변환
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const [email, setemailText] = useState("");
    const [username, setusername] = useState("");
    const [passwordText, setpasswordText] = useState("");
    const [code, setCode] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isIdValid, setIsIdValid] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isIdTouched, setIsIdTouched] = useState(false);
    const [isCodeChecked, setIsCodeChecked] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태
    const [messagecode, setMessagecode] = useState(''); // 인증 상태 메시지
    const [messageStyle, setMessageStyle] = useState(null); // 인증 메시지 스타일
    const [messageid, setMessageid] = useState(''); // 아이디 상태 메시지


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

    // 이메일 인증번호 전송
    const handleCode = async () => {
        try {
            // 이메일 전송 API 호출
            await emailUser(email);

            // 응답이 성공적이면 인증번호 전송 완료로 처리
            setIsEmailChecked(true);
            setClickCount(prevCount => prevCount + 1); // 클릭 횟수 증가
            alert('인증번호 전송 완료');

            // 타이머 초기화 및 시작
            resetTimer();
            setIsTimerVisible(true);
        } catch (error) {
            console.error('Email sending error:', error);
            Alert.alert("오류", "네트워크 오류입니다. 다시 시도해주세요.");
        }
    };


    //인증번호 재전송
    const handleResend = () => {
        handleCode();
    }

    //인증번호 확인
    const handleCodecheck = () => {
        if (!isTimerExpired && code === code) {
            setIsCodeChecked(true);
            stopTimer();
            setMessagecode('인증 완료');
            setMessageStyle(styles.helperText);
        } else {
            setMessagecode('만료되거나 잘못된 인증번호입니다.');
            setMessageStyle(styles.warningText);
        }
    }

    // 아이디 중복 확인
    const handleOverlap = async () => {
        try {
            const exists = await checkidUser(username); // checkidUser 호출하여 exists 값 받아오기
            if (!exists) {
                setIsIdChecked(true);
                setMessageid('사용 가능한 아이디 입니다.');
                setMessageStyle(styles.helperText);
            } else {
                setMessageid('사용할 수 없는 아이디 입니다.');
                setMessageStyle(styles.warningText);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("오류", "네트워크 오류입니다. 다시 시도해주세요.");
        }
    };


    //계정 생성 완료
    const handleConfirm = () => {
        if (isEmailValid && isIdValid && isPasswordValid && isIdChecked && isEmailChecked && isCodeChecked) {
            navigation.navigate('Join3', {
                email: email,
                username: username,
                password: passwordText
            });
        } else {
            alert('입력한 정보를 확인해주세요.');
        }
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
                    value={email}
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
                    <BtnD onPress={clickCount > 0 ? handleResend : handleCode} disabled={!isEmailValid}>
                        {clickCount > 0 ? '재전송' : '인증번호 전송'}
                    </BtnD>
                </View>
                <View style={{ height: 24 }}>
                    {isEmailTouched && !isEmailValid && (
                        <Text style={styles.warningText}>유효한 이메일을 입력해주세요.</Text>
                    )}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>인증번호 입력</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <TextInput
                    style={{ ...styles.input, marginRight: 100 }}
                    placeholder="이메일을 먼저 입력하세요"
                    keyboardType="default"
                    value={code}
                    onChangeText={(code) => {
                        setCode(code);
                        setIsCodeChecked(false);
                    }}
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton2}>
                    <BtnD onPress={handleCodecheck}>확인</BtnD>
                </View>

                <View style={{ height: 24, left: 4 }}>
                    {isTimerVisible && (
                        <Text style={{
                            fontSize: 12,
                            color: Main_theme.main_reverse,
                        }}>남은 시간 {formatTime(timer)}</Text>)}
                    <Text style={[messageStyle]}>
                        {messagecode}
                    </Text>
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
                    value={username}
                    onChangeText={(id) => {
                        setusername(id);
                        setIsIdTouched(true);
                        setIsIdChecked(false);
                        validateId(id);
                    }}
                    placeholderTextColor={Gray_theme.gray_40}
                />
                <View style={styles.overlapButton}>
                    <BtnD onPress={handleOverlap} disabled={!isIdValid}>중복확인</BtnD>
                </View>
                <View style={{ height: 28, left: 4 }}>
                    {isIdTouched && !isIdValid && (
                        <Text style={styles.warningText}>아이디는 6-12자의 영문 또는 숫자입니다.</Text>
                    )}
                    <Text style={[messageStyle]}>
                        {messageid}
                    </Text>
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

            <View style={{ ...styles.button, top: windowHeigh - 36 }}>
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
        marginleft: 8
    },
    warningText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Regular',
        color: Main_theme.main_reverse,
        marginTop: 4,
        left: 4
    },
    overlapButton: {
        position: 'absolute',
        right: 8,
        bottom: 32,
        paddingHorizontal: 16,
    },
    overlapButton2: {
        position: 'absolute',
        right: 108,
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
