import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
// Data 관련
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";
// 아래 내용을 추후 로그인 화면에 동일하게 import 하여 사용해주세요
import { useAuth } from "../../../assets/ServerDatas/ReuseDatas/AuthProvider"; // 유저의 로그인 여부를 전역적으로 사용
import { useUser } from "../../../assets/ServerDatas/Users/UserContext"; // 유저의 정보(닉네임, 유형)를 전역적으로 사용
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import MainIcons from "../../../assets/Icons/MainIcons";

import Octicons from '@expo/vector-icons/Octicons';

export default function LoginScreen({ navigation }) {
    const windowWidth = useWindowDimensions().width;
    const windowHeigh = useWindowDimensions().height;
    useTabBarVisibility(false);

    // [ 유저의 로그인 정보를 저장하는 내용입니다 ]
    // 로그인 여부를 저장할 변수로 전역으로 관리합니다.
    const { isLogin, setIsLogin } = useAuth();

    // 로그인 여부를 저장할 함수입니다.
    const checkLogin = async () => {
        try {
            await AsyncStorage.setItem("isLogin", "true");
            showToast("로그인 되었습니다");
            setIsLogin(true);
        } catch (e) {
            setMessage('이메일이나 비밀번호가 틀렸습니다.');
        }
    };
    
    // [ 유저의 정보를 저장하는 내용입니다 ]
    const { signUpUser, id, name, vegTypeName } = useUser();
    const [idText, setIdText] = useState("");
    const [passwordText, setPasswordText] = useState('');
    const [message, setMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // 유저 정보를 저장하는 함수
    const handleSave = () => {
        const userData = {
            // 저장할 내용은 실제 서버에서 받아와 넣어주시면 됩니다.
            id: idText,
            password: passwordText,
        };
        signUpUser(userData); // 유저 정보를 저장
    };

    // 최종 로그인 함수 입니다
    // 로그인 여부에 필요한 로직을 추가하여 사용해주세요
    // (ex. 서버 내용 불러오기, textInput 확인하기 등)
    const handleLogin = () => {
        handleSave(); // 유저 정보를 저장
        checkLogin(); // 로그인 여부 저장
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <SafeAreaView style={{ flex: 1, ...styles.container }}>
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
                        <Octicons name="person" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={idText}
                        onChangeText={(id) => setIdText(id)}
                        placeholder="아이디"
                        style={styles.inputText}
                        placeholderTextColor={Gray_theme.gray_40}
                    />
                </View>

                <View style={styles.input}>
                    <View style={styles.icon}>
                        <Octicons name="lock" size={18} color="gray" />
                    </View>
                    <TextInput
                        value={passwordText}
                        onChangeText={setPasswordText}
                        placeholder="비밀번호"
                        style={styles.inputText}
                        secureTextEntry={!isPasswordVisible}
                        placeholderTextColor={Gray_theme.gray_40}
                    />
                    <TouchableOpacity style={styles.icon2} onPress={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                            <Octicons name="eye" size={18} color="gray" />
                        ) : (
                            <Octicons name="eye-closed" size={18} color="gray" />
                        )}
                    </TouchableOpacity>
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
                    <BtnC onPress={handleLogin}>로그인</BtnC>
                </View>
            </View>

            <View style={{ ...styles.joinContainer, top: windowHeigh - 12 }}>
                <Text style={{ fontSize: 12 }}>
                    아직 회원이 아니신가요?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Join1')}>
                    <Text style={{ fontFamily: 'Pretendard-Bold', fontSize: 14, color: Main_theme.main_30 }}> 회원가입하러가기</Text>
                </TouchableOpacity>
            </View>
            {message && <Text style={styles.message}>{message}</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    inputContainer: {
        paddingHorizontal: 16,
        marginTop: 52,
    },
    componentContainer: {
        paddingHorizontal: 16,
    },
    joinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: 24,
        right: 0,
        left: 0,
        paddingHorizontal: 16,
    },
    input: {
        marginBottom: 16,
    },
    icon: {
        position: 'absolute',
        left: 16,
        top: 18,
    },
    icon2: {
        position: 'absolute',
        right: 16,
        top: 18,
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
        color: Gray_theme.gray_50,
    },
    button: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    message: {
        marginTop: 20,
        color: Main_theme.main_reverse,
        textAlign: 'center',
    },
});
