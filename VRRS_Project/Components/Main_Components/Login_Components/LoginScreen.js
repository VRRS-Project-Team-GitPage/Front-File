import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import MainIcons from "../../../assets/Icons/MainIcons";

import Octicons from '@expo/vector-icons/Octicons';

export default function LoginScreen() {
   useTabBarVisibility(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigation = useNavigation();

    // 로그인 처리
    const handleSubmit = () => {
        if (email === 'shinhan' && password === '0000') {
            navigation.navigate("HomeTab", {
                screen: "Home"})
        } else {
            setMessage('이메일이나 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={MainIcons.mainLogo}
                    style={{
                        width: 136,
                        height: 136,
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Octicons name="mail" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="아이디 또는 이메일"
                        keyboardType="email-address"
                        style={styles.inputText}
                    />
                </View>

                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Octicons name="lock" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="비밀번호"
                        secureTextEntry
                        style={styles.inputText}
                    />
                </View>
            </View>

            <View style={styles.componentContainer}>
                <View style={styles.find}>
                    <TouchableOpacity onPress={() => navigation.navigate('Find', { initial: 'FindID' })}>
                        <Text style={styles.findText}>아이디 찾기 | </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Find', { initial: 'FindPW' })}>
                        <Text style={styles.findText}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <BtnC onPress={handleSubmit}>로그인</BtnC>
                </View>

                <View style={styles.join}>
                    <Text style={styles.joinText}>
                        아직 회원이 아니신가요?
                        <TouchableOpacity onPress={() => navigation.navigate('Join1')}>
                            <Text style={{ fontFamily: 'Pretendard-Bold', fontSize: 14, color: Main_theme.main_30}}> 회원가입하러가기</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            {message && <Text style={styles.message}>{message}</Text>}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 52,
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 52,
    },
    componentContainer: {
        flex: 2,
        paddingHorizontal: 16,
    },
    input: {
        marginBottom: 16,
    },
    icon: {
        position: 'absolute',
        left: 16,
        top: 16,
    },
    inputText: {
        width: '100%',
        height: 56,
        paddingLeft: 50,
        fontSize: 14,
        borderWidth: 1,
        borderColor: Gray_theme.gray_40,
        borderRadius: 8,
    },
    find: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 8,
    },
    findText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Medium',
        color:Gray_theme.gray_50,
    },
    button: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    join: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        width: '100%',
    },
    joinText: {
        fontSize: 12,
        textAlign: 'center',
    },  
    message: {
        marginTop: 20,
        color: Main_theme.main_reverse,
        textAlign: 'center',
    },
});
