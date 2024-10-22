import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnD from "../../../assets/styles/ReuseComponents/Button/BtnD";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

import Octicons from '@expo/vector-icons/Octicons';

export default function User_Withdrawal({ navigation }) {
    useTabBarVisibility(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [isMenuSelected, setIsMenuSelected] = useState(false); // 메뉴 선택 여부를 추적하는 상태

    const handleLogin = () => {
        if (!isMenuSelected) {
            Alert.alert('', '탈퇴하기 전에 필수 항목을 읽어주세요.',
                [
                    { text: '확인', onPress: () => { }, style: 'cancel' },
                ],
            );
        } else {
            Alert.alert('탈퇴 완료', '탈퇴가 완료 되었습니다.',
                [
                    { text: '확인', onPress: () => { }, style: 'cancel' },
                ],
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
                    onPress={handleLogin}
                    containerStyle={{ backgroundColor: 'red', borderColor: 'red', height: 48 }}
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
                        <Text style={styles.modalText}>삭제 안합니다.</Text>
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
        fontSize: 16,
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
