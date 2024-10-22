import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function Join3({ navigation }) {
    useTabBarVisibility(false);

    const [nickname, setNickname] = useState('');
    const [vegType, setVegType] = useState('none');
    const [isNicknameTouched, setIsNicknameTouched] = useState(false);

    const handleConfirm = () => {
        if (!nickname.trim() || vegType === 'none') {
            alert('입력한 정보를 확인해주세요.');
        } else {
            navigation.navigate('Joinr');
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
            {/* 단계 섹션 */}
            <View style={styles.stepContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={styles.stepHeader}>정보입력</Text>
                </View>
                <View style={styles.stepIndicator1}>
                    <Octicons name="dot-fill" size={24} color="#E0E0E0" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <Octicons name="dot-fill" size={24} color="#E0E0E0" />
                    <Octicons name="kebab-horizontal" size={24} color="#E0E0E0" />
                    <MaterialCommunityIcons name="numeric-3-circle" size={24} color="#468585" />
                </View>
                <View style={styles.stepIndicator2}>
                    <Text style={styles.stepText2}>약관동의</Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText2}>계정생성 </Text>
                    <Octicons name="kebab-horizontal" size={24} color="white" />
                    <Text style={styles.stepText1}>정보입력  </Text>
                </View>
            </View>
            {/* 닉네임 입력란 */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>닉네임 *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChangeText={(text) => {
                        setNickname(text);
                        setIsNicknameTouched(true); // 닉네임 입력 필드가 터치됨
                    }}
                />
                {isNicknameTouched && nickname.trim() === '' && (
                    <Text style={styles.warningText}>반드시 입력해야 하는 정보입니다.</Text>
                )}
                {nickname.trim() && (
                    <Text style={styles.helperText}>사용할 수 있는 닉네임입니다.</Text>
                )}
            </View>

            {/* 채식 유형 선택 */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>채식 유형 *</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={vegType}
                        onValueChange={(itemValue) => setVegType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="채식 유형을 선택해주세요." value="none" />
                        <Picker.Item label="비건" value="vegan" />
                        <Picker.Item label="락토 베지테리언" value="lacto" />
                        <Picker.Item label="오보 베지테리언" value="ovo" />
                        <Picker.Item label="락토 오보 베지테리언" value="lacto_ovo" />
                        <Picker.Item label="페스코 베지테리언" value="pescatarian" />
                        <Picker.Item label="폴로 베지테리언" value="pollotarian" />
                    </Picker>
                </View>
                {vegType === 'none' && (
                    <Text style={styles.warningText}>반드시 입력해야 하는 정보입니다.</Text>
                )}
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
    },
    warningText: {
        fontSize: 12,
        fontFamily: 'Pretendard-Regular',
        color: Main_theme.main_reverse,
        marginTop: 4,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Gray_theme.gray_40,
        borderRadius: 8,
        marginTop: 8,
    },
    picker: {
        height: 48,
        width: '100%',
    },
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
});
