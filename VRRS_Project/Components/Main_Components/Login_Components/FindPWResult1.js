import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";

export default function FindPWResult1({ navigation }) {
    useTabBarVisibility(false);

    const [timer, setTimer] = useState(180); // 3분 (180초)
    const [isTimerExpired, setIsTimerExpired] = useState(false); // 타이머 만료 여부
    const [authCode, setAuthCode] = useState(''); // 인증번호 상태
  
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

    // 초를 분:초로 변환
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // 재전송 버튼
    const handleResend = () => {
        alert(`재전송 완료`);
    };

    const handleLogin = () => {
      if (!isTimerExpired&&authCode==='123') {
        alert('인증번호 입력 완료');
        navigation.navigate('FindPWr2');
      } else {
        Alert.alert('인증 오류', '만료되거나 잘못된 인증번호입니다.');
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >인증번호 입력
            </BackHeader>
            <Text style={styles.description}>이메일로 인증 번호가 전송되었습니다.{"\n"}전송받은 인증 번호를 입력해주세요.</Text>
            <Text style={styles.email}>shinhan123@gmail.com</Text>

            {/* 인증번호 입력 필드 */}
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="인증번호 입력"
                    keyboardType="numeric"
                    value={authCode}
                    onChangeText={setAuthCode}
                />
                <View style={styles.resendButton}>
                    <BtnD onPress={handleResend}>재전송</BtnD>
                </View>
            </View>

            {/* 남은 시간 표시 */}
            <Text style={styles.timerText}>남은 시간 {formatTime(timer)}</Text>

            {/* 확인 버튼 */}
            <View style={styles.Button}>
                <BtnC onPress={handleLogin}>확인</BtnC>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'flex-start',
        color: Gray_theme.balck,
        marginTop:24,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    email: {
        fontSize: 16,
        fontFamily: 'Pretendard-Bold',
        color: Main_theme.main_50,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    inputSection: {
        position: 'relative',
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    input: {
        height: 48,
        width: '100%',
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Gray_theme.gray_40,
        fontFamily: "Pretendard-Medium",
        fontSize: 14,
    },
    resendButton: {
        position: 'absolute',
        right: 8, 
        top: 8,
        paddingHorizontal: 16,
    },
    timerText: {
        fontSize: 14,
        color: Main_theme.main_reverse,
        marginBottom: 44,
        paddingHorizontal: 24,
    },
    Button:{
        paddingHorizontal: 16,
    }
});