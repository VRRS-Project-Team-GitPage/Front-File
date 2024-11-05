// 서버에서 사전 관련 내용을 저장한 파일입니다.
import axios from "axios";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL = "";


// 사전 내용을 가져오는 함수
export const fetchDictionaryData = async (jwt, url) => {
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
      throw new Error(error);
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 제품 상세 내용을 가져오는 함수
export const fetchProductData = async (jwt, id) => {
  const url = getProductDetailUrl(id);
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
      console.error("Server responded with:", error.response.data.message); // 서버 응답 로그
      throw new Error(
        error.response.data.message || "제품 정보를 불러올 수 없습니다."
      );
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 제품 리뷰를 가져오는 함수
export const fetchReviewData = async (jwt, id) => {
  const url = getProductReviewUrl(id);
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
      console.error("Server responded with:", error.response.data.message); // 서버 응답 로그
      throw new Error(
        error.response.data.message || "제품 리뷰를 불러올 수 없습니다."
      );
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 제품 피드백 전송 함수
export const submitFeedback = async (type, content, jwt) => {
  try {
    const response = await axios.post(
      SUBMIT_URL,
      {
        type: type,
        content: content,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 명시
          Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
        },
      }
    );
    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error("Feedback submission error:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
