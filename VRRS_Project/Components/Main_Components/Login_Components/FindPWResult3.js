import React from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function FindPWResult3({ navigation }) {

    useTabBarVisibility(false);

    const handleConfirm = () => {
        navigation.navigate('Login_Main'); // 'Log' 화면으로 이동
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    비밀번호가{'\n'}변경되었어요!
                </Text>
            </View>

            <View style={styles.button}>
                <BtnC onPress={handleConfirm}>로그인하러 가기</BtnC>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
    },
    titleContainer: {
        alignItems: 'center', // 가로 중앙 정렬
    },
    title: {
        fontSize: 32,
        fontFamily: 'Pretendard-SemiBold',
        color: Gray_theme.balck,
        paddingHorizontal: 16,
        textAlign: 'center',
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});
