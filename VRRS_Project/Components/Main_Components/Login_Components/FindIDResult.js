import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function FindIDResult({ route, navigation }) {
    useTabBarVisibility(false);

    const { username, email } = route.params;

    const handleLogin = () => {
        navigation.navigate('Login_Main');
    };
    const handleRetry = () => {
        navigation.navigate('FindID');
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >
                아이디 찾기
            </BackHeader>
            {/* 상단 텍스트 */}
            <View style={styles.titleContainer}>
                {username ? (
                    <>
                        <Text style={styles.titleText}>
                            <Text style={{ color: Main_theme.main_30 }}>아이디</Text>를 {'\n'}찾았어요!
                        </Text>
                        <Text style={styles.subtitleText}>아래 정보로 로그인해주세요</Text>
                        {/* 사용자 이름 */}
                        <View style={styles.idContainer}>
                            <Text style={styles.usernameText}>{username}</Text>
                        </View>
                        {/* 입력한 이메일 정보 */}
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>입력한 이메일</Text>
                            <Text style={styles.emailText}>{email}</Text>
                            <Text style={styles.infoLabel}>입력된 이메일과 일치하는 아이디입니다.</Text>
                            <Text style={styles.idText}>{username}</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.titleText}>
                            <Text style={{ color: Main_theme.main_30 }}>아이디</Text>를 {'\n'}찾지 못했어요!
                        </Text>
                        <Text style={styles.subtitleText}>입력한 정보를 확인해주세요.</Text>
                        {/* 사용자 이름 */}
                        <View style={styles.idContainer}>
                            <Text style={styles.usernameText}> </Text>
                        </View>
                        {/* 입력한 이메일 정보 */}
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>입력한 이메일</Text>
                            <Text style={styles.emailText}>{email}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: Main_theme.main_reverse,
                                marginBottom: 8,
                            }}>입력한 이메일과 일치하는 아이디가 없습니다.</Text>
                        </View>
                        <View style={styles.button}>
                            <BtnC onPress={handleRetry}>다시 입력하기</BtnC>
                        </View>
                    </>
                )}
            </View>

            {/* 로그인하러 가기 버튼 */}
            {username && (
                <View style={styles.button}>
                    <BtnC onPress={handleLogin}>로그인하러 가기</BtnC>
                </View>
            )}

            {/* <View style={styles.button}>
                {username ? (
                    <BtnC onPress={handleLogin}>로그인하러 가기</BtnC>
                ) : (
                    <BtnC onPress={handleRetry}>다시 입력하기</BtnC>
                )}
            </View> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    titleContainer: {
        paddingTop: 32,
        paddingHorizontal: 24,
    },
    idContainer: {
        paddingHorizontal: 24,
    },

    titleText: {
        fontSize: 36,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'flex-start',
        color: Gray_theme.balck,
    },
    subtitleText: {
        fontSize: 16,
        color: Gray_theme.gray_70,
        marginTop: 13,
        textAlign: 'flex-start',
    },
    usernameText: {
        fontSize: 24,
        color: Main_theme.main_50,
        fontFamily: 'Pretendard-Bold',
        marginTop: 32,
        marginLeft: 8,
    },
    infoBox: {
        backgroundColor: Gray_theme.gray_20,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginHorizontal: 24,
        marginVertical: 24,
    },
    infoLabel: {
        fontSize: 12,
        color: Gray_theme.gray_60,
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        color: Gray_theme.balck,
        marginBottom: 32,
        fontFamily: 'Pretendard-SemiBold',
    },
    idText: {
        fontSize: 16,
        color: Gray_theme.balck,
        fontFamily: 'Pretendard-SemiBold',
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});
