import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vegTypes } from "../Dummy/dummyVegTypes"; // 채식 유형 데이터 가져오기

const UserContext = createContext(null);

const USER_STORAGE_KEY = "logged_in_user";

// 유저의 veg_type_id를 받아 비교하여 유저 타입에 해당하는 텍스트를 추출하는 함수입니다.
const getVegTypeNameById = (id) => {
  const vegType = vegTypes.find((type) => type.id === id);
  return vegType ? vegType.name : "비건";
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 전역적으로 사용될 유저 정보입니다.
  const id = user?.id || null; // 유저 고유 아이디(가입 아이디와는 다른 개념입니다. 유저를 구별하기 위한 용도입니다.)
  const name = user?.name || ""; // 유저 닉네임
  const vegTypeName = user ? getVegTypeNameById(user.veg_type_id) : ""; // 유저 타입

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
      } else {
        const dummyUser = {
          // 사용을 위한 더미 데이터 입니다.
          id: 1,
          name: "김철수",
          veg_type_id: 1,
        };
        await saveUserToStorage(dummyUser); // 더미 유저 저장을 완료한 후에 로드
      }
    } catch (error) {
      console.error("저장된 유저 정보가 없습니다 :", error);
    }
  };

  // 로그인 시 유저 정보를 저장할 수 있도록 하는 함수입니다.
  // 1. 로그인 정보를 받아오는 컴포넌트에서 useUser를 import 한다.
  // 2. const { signUpUser } = useUser(); 를 통해 해당 함수를 불러온다.
  // 3. 유저 정보 object를 저장한다.
  // 다음과 같은 과정을 진행하면 전역적으로 유저의 정보를 사용할 수 있게 됩니다
  const signUpUser = async (userData) => {
    await saveUserToStorage(userData); // 새 유저 정보 저장
  };

  // AsyncStorage를 초기화 하는 함수입니다.
  // 추후 탈퇴 기능을 구현하게 되면 사용해주세요
  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
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
      value={{ user, signUpUser, clearStorage, id, name, vegTypeName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
