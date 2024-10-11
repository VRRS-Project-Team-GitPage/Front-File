import React from "react";
import { createContext } from "react"; // 전연적으로 정보를 관리하기 위함
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로그인 여부를 로컬에 저장하기 위함
import { useState, useEffect, useContext } from "react";
import showToast from "../../styles/ReuseComponents/showToast";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false); // 사용자의 로그인 여부를 저장

  // 로그인 상태를 불러오는 함수
  const handleLogin = async () => {
    try {
      // 로컬에 저장된 로그인 상태를 저장하는 변수
      const loginStatus = await AsyncStorage.getItem("isLogin");
      if (loginStatus === "true") {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      showToast("로그인 상태를 불러올 수 없습니다.");
    }
  };

  // 컴포넌트 랜더링 시 로그인 여부를 확인
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // 전역적으로 사용될 내용
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
