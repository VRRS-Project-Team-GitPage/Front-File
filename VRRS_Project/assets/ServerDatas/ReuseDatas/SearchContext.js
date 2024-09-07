// 사용자가 검색한 내용을 전역적으로 관리하는 Component 입니다.
// 주로 사전 검색 파트에서 사용될 예정입니다.
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 공유할 데이터 항목
export const SearchContext = createContext();

// AsyncStorage에서 데이터를 가져올 때 사용할 키
const STORAGE_KEY = "@Search_List";

// Provider => 해당 데이터를 전달해주는 함수
export const SearchProvider = ({ children }) => {
  // TextInput에 작성될 내용
  const [searchText, setSearchText] = useState("");
  // 작성된 내용을 저장하는 변수
  const [searchList, setSearchList] = useState([]);

  // 로컬 저장소에서 검색어 리스트를 불러오는 함수
  const loadSearchList = async () => {
    const load_lists = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedLists = load_lists ? JSON.parse(load_lists) : [];
    setSearchList(parsedLists);
  };

  // 로컬 저장소에 검색어 리스트를 저장하는 함수
  const saveSearchList = async (newList) => {
    const saveNewList = JSON.stringify(newList);
    await AsyncStorage.setItem(STORAGE_KEY, saveNewList);
  };

  // 텍스트를 저장하고 리스트를 업데이트하는 함수
  const saveSearchText = async () => {
    const checkIdx = searchList.findIndex((item) => item.text === searchText);
    let newList;

    if (checkIdx !== -1) {
      const newListCopy = [...searchList];
      const item = newListCopy[checkIdx];
      newListCopy.splice(checkIdx, 1);
      newList = [item, ...newListCopy];
    } else {
      newList = [
        {
          id: Date.now(),
          text: searchText,
        },
        ...searchList,
      ];

      if (newList.length > 20) {
        newList.pop();
      }
    }
    // 변경된 내용을 변수 및 로컬에 저장
    setSearchList(newList);
    await saveSearchList(newList);
  };

  // list의 특정 항목을 지우는 함수
  const deleteList = async (id) => {
    const newList = searchList.filter((item) => item.id != id);
    setSearchList(newList);
    await saveSearchList(newList);
  };

  // list의 모든 항목을 지우는 함수
  const deleteAllList = async () => {
    setSearchList([]);
    await saveSearchList([]);
  };

  // 초기화 시 리스트를 로드
  useEffect(() => {
    loadSearchList();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        searchList,
        saveSearchText,
        deleteList,
        deleteAllList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
