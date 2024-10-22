import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../styles/ReuseComponents/showToast";

// 북마크 상태 저장 함수
export const saveBookmarkWithTimestamp = async (itemId, newStatus) => {
  const timestamp = new Date().toISOString(); // 현재 시간을 ISO 문자열로 저장
  try {
    await AsyncStorage.setItem(
      `bookmark_${itemId}`,
      JSON.stringify({ bookmarked: newStatus, timestamp }) // 북마크와 함께 타임스탬프 저장
    );
  } catch (e) {
    console.error("북마크 저장 중 에러 발생", e.message, e.stack);
    showToast("북마크 저장 중 오류 발생: " + e.message);
  }
};

// 북마크 상태 불러오기 함수
export const getBookmarkStatus = async (itemId) => {
  try {
    const result = await AsyncStorage.getItem(`bookmark_${itemId}`);
    return result !== null
      ? JSON.parse(result)
      : { bookmarked: false, timestamp: null };
  } catch (error) {
    showToast(
      "북마크 상태를 불러오는 중 오류가 발생하였습니다 :",
      error.message
    );
    return { bookmarked: false, timestamp: null };
  }
};

// 저장된 모든 북마크된 제품 ID 가져오기
export const getAllBookmarkedProductsWithTimestamp = async (productIds) => {
  try {
    const bookmarkedProducts = [];
    for (const id of productIds) {
      const bookmarkStatus = await getBookmarkStatus(id);
      if (bookmarkStatus.bookmarked) {
        bookmarkedProducts.push({ id, timestamp: bookmarkStatus.timestamp });
      }
    }
    return bookmarkedProducts;
  } catch (error) {
    showToast(
      "북마크된 제품 불러오기 중 오류가 발생하였습니다 :",
      error.message
    );
    return [];
  }
};
