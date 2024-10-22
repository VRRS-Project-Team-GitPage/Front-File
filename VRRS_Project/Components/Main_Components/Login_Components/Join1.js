import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function Join1({ navigation }) {
    useTabBarVisibility(false);

    const [allAgree, setAllAgree] = useState(false);
    const [termsAgree, setTermsAgree] = useState(false);
    const [privacyAgree, setPrivacyAgree] = useState(false);

    const handleConfirm = () => {
        // 모든 체크박스가 체크되었는지 확인
        if (termsAgree && privacyAgree) {
            navigation.navigate('Join2');
        } else {
            Alert.alert('필수 항목에 모두 동의해 주세요.'); // 경고 메시지
        }
    };

    const handleAllAgree = () => {
        const newState = !allAgree;
        setAllAgree(newState);
        setTermsAgree(newState);
        setPrivacyAgree(newState);
    };

    const toggleTermsAgree = () => {
        setTermsAgree((prev) => {
            const newState = !prev;
            if (newState && privacyAgree) {
                setAllAgree(true);
            } else {
                setAllAgree(false);
            }
            return newState;
        });
    };

    const togglePrivacyAgree = () => {
        setPrivacyAgree((prev) => {
            const newState = !prev;
            if (newState && termsAgree) {
                setAllAgree(true);
            } else {
                setAllAgree(false);
            }
            return newState;
        });
    };

    useEffect(() => {
        if (termsAgree && privacyAgree) {
            setAllAgree(true);
        } else {
            setAllAgree(false);
        }
    }, [termsAgree, privacyAgree]);

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >회원가입하기
            </BackHeader>
            {/* 단계 섹션 */}
            <View style={styles.stepContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={styles.stepHeader}>약관동의</Text>
                </View>
                <View style={styles.stepIndicator1}>
                    <MaterialCommunityIcons name="numeric-1-circle" size={24} color="#468585" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <Octicons name="dot" size={24} color="#E0E0E0" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <Octicons name="dot" size={24} color="#E0E0E0" />
                </View>
                <View style={styles.stepIndicator2}>
                    <Text style={styles.stepText1}>  약관동의</Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText2}>계정생성</Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText2}>정보입력</Text>
                </View>
            </View>

            {/* 전체 동의 체크박스 */}
            <View style={styles.checkBoxAContainer}>
                <TouchableOpacity onPress={handleAllAgree}>
                    <View>
                        <MaterialIcons name={allAgree ? "check-box" : "check-box-outline-blank"} size={24} color="#BDBDBD" />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 16, marginLeft: 8 }}>회원가입 약관에 모두 동의합니다.</Text>
            </View>

            {/* 이용약관 동의 */}
            <View style={styles.checkBoxContainer}>
                <View style={styles.checkBoxLabel}>
                    <TouchableOpacity onPress={toggleTermsAgree}>
                        <View>
                            <MaterialIcons name={termsAgree ? "check-box" : "check-box-outline-blank"} size={24} color="#BDBDBD" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.checkBoxText}>이용약관 동의 
                        <Text style={{ color: 'red', fontSize: 12 }}>  (필수)</Text>
                    </Text>
                </View>
                <View style={styles.agreementBox}>
                    <ScrollView style={styles.agreementScroll}>
                        <Text style={styles.agreementText}>
                            제1조(목적) 이 약관은 회사(전자상거래 사업자가 운영하는 인터넷 사이버
                            몰이용자 간의 권리와 의무에 관한 내용을 규정합니다. ...
                        </Text>
                    </ScrollView>
                </View>
            </View>

            {/* 개인정보 수집 동의 */}
            <View style={styles.checkBoxContainer}>
                <View style={styles.checkBoxLabel}>
                    <TouchableOpacity onPress={togglePrivacyAgree}>
                        <View>
                            <MaterialIcons name={privacyAgree ? "check-box" : "check-box-outline-blank"} size={24} color="#BDBDBD" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.checkBoxText}>개인 정보 수집 및 이용 동의
                        <Text style={{ color: 'red', fontSize: 12 }}>  (필수)</Text>
                    </Text>
                </View>
                <View style={styles.agreementBox}>
                    <ScrollView style={styles.agreementScroll}>
                        <Text style={styles.agreementText}>
                            [제1] 개인정보 처리방침{"\n"}{"\n"}
                            1. 목적{"\n"}
                            2. 개인정보의 수집에 대한 동의{"\n"}
                            3. 개인정보의 수집 및 이용 목적{"\n"}
                            4. 흐아아{'\n'}
                            5. 흑흑{'\n'}
                            ...
                        </Text>
                    </ScrollView>
                </View>
            </View>

            {/* 다음 버튼 */}
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
    checkBoxAContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Gray_theme.gray_30,
    },
    checkBoxContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
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
    checkBoxLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkBoxText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        marginLeft: 8,
    },
    agreementBox: {
        borderWidth: 1,
        borderColor: Gray_theme.gray_30,
        borderRadius: 3,
        height: 120,
    },
    agreementScroll: {
        padding: 16,
    },
    agreementText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        color: Gray_theme.balck,
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});
