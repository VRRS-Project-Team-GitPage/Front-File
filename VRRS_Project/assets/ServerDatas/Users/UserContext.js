import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vegTypes } from "../Dummy/dummyVegTypes"; // 채식 유형 데이터 가져오기

const UserContext = createContext(null);

const USER_STORAGE_KEY = "logged_in_user";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 전역적으로 사용될 유저 정보입니다.
  const jwt = user?.jwt || null; // 유저 고유 아이디(가입 아이디와는 다른 개념입니다. 유저를 구별하기 위한 용도입니다.)
  const name = user?.nickname || ""; // 유저 닉네임
  const vegTypeId = user?.vegType?.id || 1; // 유저 채식 유형 아이디
  const vegTypeName = user?.vegType?.name || ""; // 유저 채식 유형 이름

  const saveUserToStorage = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData); // 상태 업데이트
    } catch (error) {
      console.error("Failed to save user to storage:", error);
    }
  };

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("저장된 유저 정보가 없습니다 :", error);
    }
  };

  // 로그인 시 유저 정보를 저장할 수 있도록 하는 함수입니다.
  // 1. 로그인 정보를 받아오는 컴포넌트에서 useUser를 import 한다.
  // 2. const { signUpUser } = useUser(); 로 로그인 함수를 불러온다.
  // 3. 서버에 아이디/비밀번호를 전송 후 유저 정보를 받아와 저장한다.
  // 다음과 같은 과정을 진행하면 전역적으로 유저의 정보를 사용할 수 있게 됩니다
  // 사용 방법은 LoginScreen.js에 구현되어 있습니다.

  const signUpUser = async (userData) => {
    // 서버에서 받은 로그인 데이터를 그대로 저장
    const storageUser = {
      jwt: userData.jwt, // JWT 토큰
      nickname: userData.nickname, // 서버에서 받은 닉네임
      vegType: userData.vegType, // 서버에서 받은 vegType (id와 name 포함)
    };

    await saveUserToStorage(storageUser); // 새 유저 정보 저장
  };
  // AsyncStorage를 초기화 하는 함수입니다.
  // 추후 탈퇴 기능을 구현하게 되면 사용해주세요
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      console.log("Storage cleared");
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  };

  // 처음 로딩 시 정보를 불러오는 로직입니다.
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // 전역적으로 관리될 정보들입니다.
  return (
    <UserContext.Provider
      value={{
        user,
        signUpUser,
        clearStorage,
        jwt,
        name,
        vegTypeId,
        vegTypeName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
