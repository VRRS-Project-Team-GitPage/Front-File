import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

import Octicons from '@expo/vector-icons/Octicons';
import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { withdrawalUser } from '../../../assets/ServerDatas/ServerApi/authApi';
import { useAuth } from "../../../assets/ServerDatas/ReuseDatas/AuthProvider";

export default function User_Withdrawal({ navigation }) {
    useTabBarVisibility(false);
    // user의 정보를 불러옴
    const { jwt } = useUser();

    const { isLogin, setIsLogin } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [isMenuSelected, setIsMenuSelected] = useState(false); // 메뉴 선택 여부를 추적하는 상태
    // 네비게이션 리셋을 위한 함수
    const restart = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login_Main" }], // 초기 화면으로 이동할 경로 설정
        });
    };
    const handleWithdrawal = async () => {
        if (!isMenuSelected) {
            Alert.alert('', '탈퇴하기 전에 필수 항목을 읽어주세요.',
                [
                    { text: '확인', onPress: () => { }, style: 'cancel' },
                ],
            );
        } else {
            Alert.alert('신중히 선택하세요!', '탈퇴하시겠습니까?',
                [
                    {
                        text: '확인',
                        onPress: async () => {
                            try {
                                await withdrawalUser(jwt);
                                setIsLogin(false);
                                Alert.alert('탈퇴 완료', '탈퇴가 완료되었습니다.',
                                    [
                                        { text: '확인', onPress: () => restart(), style: 'cancel' },
                                    ]);
                            } catch (error) {
                                console.error('Error removing token:', error);
                                Alert.alert('오류', '탈퇴 처리 중 오류가 발생했습니다.');
                            }
                        },
                    },
                    {
                        text: '취소',
                        onPress: () => { }, // 취소 시 아무것도 하지 않음
                        style: 'cancel',
                    },
                ]
            );
        }
    };

    const openModal = () => {
        setModalVisible(true);
        setIsMenuSelected(true); // 메뉴가 선택되면 true로 설정
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >탈퇴하기
            </BackHeader>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>탈퇴 신청 전에{'\n'}반드시 확인해 주세요.</Text>
            </View>

            <View style={styles.componentContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={openModal}>
                    <Text style={styles.menuText}>회원 탈퇴 시 사전 및 리뷰 관리에 대해
                        <Text style={{ color: 'red', fontSize: 12 }}>   (필수)</Text>
                    </Text>
                    <Octicons name="chevron-right" size={16} color="gray" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <Text style={[styles.agreeText, { textAlign: 'center' }]}>
                    탈퇴 시 위 내용에 동의한 것으로 간주합니다.
                </Text>
                <BtnD
                    onPress={handleWithdrawal}
                    containerStyle={{ backgroundColor: 'red', borderColor: 'red', height: 48 }}
                    disabled={!isMenuSelected}
                >
                    탈퇴하기
                </BtnD>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            {'\n'}
                            탈퇴 완료 시 개인 사전 데이터 및 작성하신 리뷰는 {'\n'}모두 삭제됩니다.{'\n'}{'\n'}
                            탈퇴로 인한 모든 책임과 조치는 [이용약관]과 [개인정보 처리 및 방침] ('내 정보' 탭에서 확인 가능합니다.)에
                            의거하며 회원의 귀책사유로 인한 손해에 대해서는 신한대학교 졸업 프로젝트 4조가 책임을 지지 않습니다.
                            {'\n'}
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    titleContainer: {
        paddingHorizontal: 8,
        marginTop: 24,
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    componentContainer: {
        paddingHorizontal: 16,
    },

    titleText: {
        fontSize: 24,
        fontFamily: 'Pretendard-SemiBold',
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Gray_theme.gray_40,
    },
    menuText: {
        fontSize: 14,
        fontFamily: "Pretendard-Medium",
    },
    icon: {
        marginLeft: 'auto',
    },
    agreeText: {
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        color: Gray_theme.gray_60,
        marginBottom: 16,
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: Gray_theme.white,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: Gray_theme.gray_30,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: Gray_theme.gray_90,
        fontSize: 14,
        fontFamily: 'Pretendard-SemiBold',
    },
});