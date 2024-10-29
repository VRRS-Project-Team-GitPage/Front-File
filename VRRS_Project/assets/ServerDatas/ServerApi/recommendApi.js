// 서버에서 순위 관련 내용을 저장한 파일입니다.
import axios from "axios";

// 데이터를 불러오는 함수
export const fetchRecommendData = async (jwt, vegTypeId) => {
  const url = getProductRankUrl(vegTypeId);
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT를 Authorization 헤더에 포함
      },
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response) {
      console.error("Server responded with:", error.response); // 전체 응답 객체 출력
      console.error("Status code:", error.response.status); // 상태 코드 출력
      console.error("Response data:", error.response.data); // 응답 데이터 로그
      throw new Error(
        error.response.data.message || "인기 순위를 불러올 수 없습니다."
      );
    } else {
      console.error("Network error:", error.message); // 네트워크 오류 로그
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 카테고리 기반 데이터를 불러오는 함수
export const fetchCategoryData = async (jwt, vegTypeId) => {
  const url = getCategoryUrl(vegTypeId);
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT를 Authorization 헤더에 포함
      },
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response) {
      console.error("Server responded with:", error.response); // 전체 응답 객체 출력
      console.error("Status code:", error.response.status); // 상태 코드 출력
      console.error("Response data:", error.response.data); // 응답 데이터 로그
      throw new Error(
        error.response.data.message || "제품을 불러올 수 없습니다."
      );
    } else {
      console.error("Network error:", error.message); // 네트워크 오류 로그
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 키워드 기반 데이터를 불러오는 함수
export const fetchKeywordData = async (jwt, text) => {
  const url = getKeywordUrl(text);
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT를 Authorization 헤더에 포함
      },
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response) {
      throw new Error(
        error.response.data.message || "제품을 불러올 수 없습니다."
      );
    } else {
      console.error("Network error:", error.message); // 네트워크 오류 로그
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};
