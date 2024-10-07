import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../styles/ReuseComponents/showToast";

// 북마크 상태 저장 함수
export const saveBookmarkStatus = async (itemId, isBookmarked) => {
  try {
    await AsyncStorage.setItem(
      `bookmark_${itemId}`,
      JSON.stringify(isBookmarked)
    );
  } catch (error) {
    showToast("북마크 상태 저장 중 오류가 발생하였습니다 :", error);
  }
};

// 북마크 상태 불러오기 함수
export const getBookmarkStatus = async (itemId) => {
  try {
    const result = await AsyncStorage.getItem(`bookmark_${itemId}`);
    return result !== null ? JSON.parse(result) : false;
  } catch (error) {
    showToast("북마크 상태를 불러오는 중 오류가 발생하였습니다 :", error);
    return false;
  }
};

// 저장된 모든 북마크된 제품 ID 가져오기
export const getAllBookmarkedProducts = async (productIds) => {
  try {
    const bookmarkedProducts = [];
    for (const id of productIds) {
      const isBookmarked = await getBookmarkStatus(id);
      if (isBookmarked) {
        bookmarkedProducts.push(id);
      }
    }
    return bookmarkedProducts;
  } catch (error) {
    showToast("북마크된 제품 불러오기 중 오류가 발생하였습니다 :", error);
    return [];
  }
};
