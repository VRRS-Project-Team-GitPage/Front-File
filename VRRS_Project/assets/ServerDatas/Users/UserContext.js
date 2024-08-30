// 어플을 사용하는 user의 정보를 AsyncStorage 내 저장하는 로직입니다.
// 현재는 더미 데이터로 해당 내용을 실행하고 있습니다.
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vegTypes } from "../Dummy/dummyVegTypes"; // 채식 유형 데이터 가져오기

// UserContext 생성
const UserContext = createContext(null);

// AsyncStorage에 저장할 때 사용할 키
const USER_STORAGE_KEY = "logged_in_user";

// 채식 유형 ID를 이름으로 변환하는 함수
const getVegTypeNameById = (id) => {
  const vegType = vegTypes.find((type) => type.id === id);
  return vegType ? vegType.name : "비건";
};

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  // 유저 상태 관리
  const [user, setUser] = useState(null);

  // 더미 유저 데이터를 AsyncStorage에 저장하는 함수
  const saveUserToStorage = async (userData) => {
    try {
      // AsyncStorage에 유저 데이터를 저장 (키-값 쌍으로 저장)
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData); // 저장 후 상태 업데이트
    } catch (error) {
      console.error("Failed to save user to storage:", error);
    }
  };

  // 앱이 실행될 때 AsyncStorage에서 유저 데이터를 로드하는 함수
  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        // 유저 정보가 있으면 상태에 저장
        setUser(JSON.parse(storedUser));
      } else {
        // 만약 AsyncStorage에 유저 정보가 없으면, 더미 유저 정보를 저장
        const dummyUser = {
          username: "김철수",
          veg_type_id: 1, // 비건 유형
        };
        saveUserToStorage(dummyUser); // 더미 유저 정보를 AsyncStorage에 저장
      }
    } catch (error) {
      console.error("저장된 유저 정보가 없습니다 :", error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 유저 정보를 로드
  useEffect(() => {
    loadUserFromStorage();
    console.log(loadUserFromStorage());
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// 커스텀 훅: 다른 컴포넌트에서 쉽게 유저 정보에 접근할 수 있게 해줌
export const useUser = () => useContext(UserContext);
