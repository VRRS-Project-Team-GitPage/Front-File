import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import MainIcons from "../../../assets/Icons/MainIcons";
import showToast from "../../../assets/styles/ReuseComponents/showToast";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import DropDown from "../../../assets/styles/ReuseComponents/Button/DropDown";
import { getVegNameIdByType } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";

import Octicons from "@expo/vector-icons/Octicons";

import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";
import { updateUser } from "../../../assets/ServerDatas/ServerApi/authApi";

export default function User_UpdateScreen({ navigation }) {
    useTabBarVisibility(false);
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;
    // user의 정보를 불러옴
    const { name, vegTypeName, jwt, signUpUser } = useUser();

    const [nickname, setNickname] = useState(name);
    const [vegType, setVegType] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        vegTypes
            .filter((item) => item.id !== 0)
            .map((item) => ({ label: item.name, value: item.id }))
    );

    useEffect(() => {
        const matchedItem = items.find((item) => item.label === vegTypeName);
        if (matchedItem) {
            setVegType(matchedItem.value);
        }
    }, [vegTypeName, items]);

    const handleUpdate = async () => {
        try {
            const data = {
                jwt: jwt,
                nickname: nickname,
                vegType: {
                    id: vegType,
                    name: getVegNameIdByType(vegType),
                },
            }; // 로컬 저장용 데이터
            await updateUser(jwt, nickname, vegType); // 서버에 전달
            signUpUser(data); // 로컬에 유저 정보 업데이트
            console.log("수정:", nickname, vegType);
            showToast("사용자 정보가 수정되었습니다"); // 성공 메시지
            navigation.goBack(); // 이전 화면으로 돌아가기
        } catch (error) {
            console.error("Failed to update info:", error);
            showToast("정보가 수정되지 않았습니다");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >
                내 정보 수정
            </BackHeader>
            <View style={styles.profileContainer}>
                <Image
                    source={MainIcons.user_profile}
                    style={{ width: 120, height: 120 }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>닉네임</Text>
                <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="닉네임을 정해주세요"
                    placeholderTextColor={Gray_theme.gray_40}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>채식 유형</Text>
                <DropDown
                    open={open}
                    value={vegType}
                    items={items}
                    setOpen={setOpen}
                    setValue={setVegType}
                    setItems={setItems}
                    placeholder={"채식 유형을 선택해주세요"}
                ></DropDown>
            </View>
            <View style={{ ...styles.button, top: windowHeigh - 36 }}>
                <BtnC children={"확인"} onPress={handleUpdate} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    profileContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
    },
    //cameraIconContainer: {
    //position: "absolute",
    //right: 144,
    //top: 48,
    //width: 30,
    //height: 30,
    //justifyContent: "center",
    //alignItems: "center",
    //backgroundColor: Gray_theme.gray_50,
    //borderRadius: 15,
    //borderColor: Gray_theme.white,
    //borderWidth: 1,
    //},
    inputContainer: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        color: Gray_theme.balck,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    input: {
        width: "100%",
        height: 48,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: Gray_theme.gray_60,
        borderRadius: 10,
        fontSize: 14,
    },

    button: {
        position: "absolute",
        right: 0,
        left: 0,
        paddingHorizontal: 24,
    },
});