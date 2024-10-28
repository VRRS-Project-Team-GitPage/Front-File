import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import Octicons from '@expo/vector-icons/Octicons';

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";

import { resetpwUser } from '../../../assets/ServerDatas/ServerApi/authApi';
export default function FindPWResult2({ route, navigation }) {

    useTabBarVisibility(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

    const togglePasswordVisibility1 = () => {
        setIsPasswordVisible1(!isPasswordVisible1);
    };
    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2(!isPasswordVisible2);
    };

    // const handleFindPW = () => {
    //     if (newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '') {
    //         fetch('https://chaesigeodi.ddns.net/auth/reset-password', {
    //             method: 'PUT',
    //             body: JSON.stringify({username: request.username,password: newPassword}),
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response;
    //         })
    //         .then(() => {
    //             Alert.alert("성공", "비밀번호가 변경되었습니다."); // 성공 메시지
    //             navigation.navigate('FindPWr3');
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             Alert.alert("오류", "비밀번호 변경에 실패했습니다."); // 실패 메시지
    //         });
    //     } else {
    //         Alert.alert("오류", "비밀번호가 일치하지 않습니다."); // 비밀번호 불일치 알림
    //     }
    // };
    const { id: username } = route.params; // params에서 값 받기

    const handleFindPW = async () => {
        try {
            await resetpwUser(username, password);

            if (newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '') {
                console.log("수정:", username, password);
                Alert.alert("성공", "비밀번호가 변경되었습니다."); // 성공 메시지
                navigation.navigate('FindPWr3');
            } else {
                Alert.alert("오류", "비밀번호가 일치하지 않습니다."); // 비밀번호 불일치 알림
            }
        } catch (error) {
            console.error("Failed to update password:", error);
            Alert.alert("오류", "비밀번호 변경에 실패했습니다.");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >비밀번호 재설정
            </BackHeader>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    <Text style={{ color: '#30BC94' }}>새 비밀번호</Text>를 {'\n'}입력해주세요.
                </Text>
                <Text style={styles.subtitleText}>기존에 사용하던 비밀번호는 {'\n'}사용할 수 없습니다.</Text>
            </View>

            <View style={styles.componentContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.noticeText}>새 비밀번호</Text>
                    <View style={styles.icon}>
                        <Octicons name="lock" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="새 비밀번호 입력"
                        secureTextEntry={!isPasswordVisible1}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.icon2} onPress={togglePasswordVisibility1}>
                        {isPasswordVisible1 ? (
                            <Octicons name="eye" size={18} color="gray" />
                        ) : (
                            <Octicons name="eye-closed" size={18} color="gray" />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.noticeText}>새 비밀번호 확인</Text>
                    <View style={styles.icon}>
                        <Octicons name="lock" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="새 비밀번호 확인"
                        secureTextEntry={!isPasswordVisible2}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.icon2} onPress={togglePasswordVisibility2}>
                        {isPasswordVisible2 ? (
                            <Octicons name="eye" size={18} color="gray" />
                        ) : (
                            <Octicons name="eye-closed" size={18} color="gray" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.button}>
                <BtnC onPress={handleFindPW}>변경하기</BtnC>
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
        paddingHorizontal: 24,
        marginTop: 32,
    },
    componentContainer: {
        paddingHorizontal: 16,
        marginTop: 36,
    },
    titleText: {
        fontSize: 36,
        fontFamily: 'Pretendard-SemiBold',
        color: Gray_theme.balck,
        textAlign: 'flex-start',
    },
    subtitleText: {
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        color: Gray_theme.gray_70,
        textAlign: 'flex-start',
        marginTop: 13,
    },
    inputContainer: {
        marginBottom: 16,
    },
    noticeText: {
        fontSize: 12,
        fontFamily: 'Pretendard-SemiBold',
        color: Main_theme.main_50,
        paddingLeft: 8,
        marginBottom: 8,
    },
    icon: {
        position: 'absolute',
        left: 16,
        top: 40,
    },
    icon2: {
        position: 'absolute',
        right: 16,
        top: 40,
    },
    input: {
        width: '100%',
        height: 56,
        paddingLeft: 40,
        fontSize: 14,
        borderWidth: 1,
        borderColor: Gray_theme.gray_40,
        borderRadius: 8,
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});