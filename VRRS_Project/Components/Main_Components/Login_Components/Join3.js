import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import DropDown from "../../../assets/styles/ReuseComponents/Button/DropDown";

// Data 관련
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";
// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { useUser } from "../../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용

export default function Join3({ navigation }) {
    useTabBarVisibility(false);
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;


    // [ 유저의 정보를 저장하는 내용입니다 ]
    const { signUpUser, id, name, vegTypeName } = useUser();
    const [nameText, setNameText] = useState("");

    // 유저 정보를 저장하는 함수
    const handleSave = () => {
        const userData = {
            // 저장할 내용은 실제 서버에서 받아와 넣어주시면 됩니다.
            name: nameText,
            veg_type_id: value,
        };
        signUpUser(userData); // 유저 정보를 저장
    };

    // 최종 로그인 함수 입니다
    // 로그인 여부에 필요한 로직을 추가하여 사용해주세요
    // (ex. 서버 내용 불러오기, textInput 확인하기 등)
    const [isNicknameTouched, setIsNicknameTouched] = useState(false);

    // DropDown에 사용될 변수 및 내용입니다
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        vegTypes
            .filter((item) => item.id !== 0)
            .map((item) => ({ label: item.name, value: item.id }))
    );

    const handleLogin = () => {
        if (!nameText.trim() && value === 'none') {
            alert('입력한 정보를 확인해주세요.');
        } else {
            handleSave(); // 유저 정보를 저장
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>닉네임</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="가입 후 변경 가능합니다"
                    value={nameText}
                    onChangeText={(name) => {
                        setNameText(name);
                        setIsNicknameTouched(true); // 닉네임 입력 필드가 터치됨
                    }}
                />
                <View style={{ height: 16 }}>
                    {isNicknameTouched && nameText.trim() === '' && (
                        <Text style={styles.warningText}>반드시 입력해야 하는 정보입니다.</Text>
                    )}
                    {nameText.trim() && (
                        <Text style={styles.helperText}>사용할 수 있는 닉네임입니다.</Text>
                    )}
                </View>
            </View>

            {/* 채식 유형 선택 */}
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <Text style={styles.label}>채식 유형</Text>
                    <FontAwesome5
                        name="star-of-life"
                        size={8}
                        color={Main_theme.main_30}
                        style={styles.cPoint}
                    />
                </View>
                <DropDown
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={"채식 유형을 선택해주세요"}
                ></DropDown>
                <View style={{ height: 16 }}>
                    {value === 'none' && (
                        <Text style={styles.warningText}>반드시 입력해야 하는 정보입니다.</Text>
                    )}
                </View>
            </View>

            {/* 다음 버튼 */}
            <View style={{ ...styles.button, top: windowHeigh - 36 }}>
                <BtnC onPress={handleLogin}>다음</BtnC>
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
        paddingBottom: 16,
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
    button: {
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
    cPoint: {
        marginLeft: 4,
        marginTop: 2
    },
});
