import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Gray_theme} from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function JoinResult({ navigation }) {
    useTabBarVisibility(false);

    const handleConfirm = () => {
        navigation.navigate('Login_Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', fontSize: 32, textAlign:'center'}}>
                    가입을{'\n'}환영합니다!
                </Text>
            </View>

            {/* 다음 버튼 */}
            <View style={styles.button}>
                <BtnC onPress={handleConfirm}>로그인하러 가기</BtnC>
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});
