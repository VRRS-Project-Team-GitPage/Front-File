// 서버에서 제품의 리뷰 관련 내용을 저장한 파일입니다.
import axios from "axios";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL = "서버 주소";

// 리뷰 등록 URL
const REVIEW_SUBMIT_URL = `${SERVER_URL}/엔드 포인트`;
// 리뷰 수정 URL
const REVIEW_UPDATE_URL = `${SERVER_URL}/엔드 포인트`;
// 리뷰 삭제 URL 생성 함수
export const getDeleteReviewkUrl = (proId) => {
  return `${SERVER_URL}/엔드 포인트${proId}`;
};

// 리뷰 등록 함수
export const submitReview = async (jwt, reviewData) => {
  try {
    const response = await axios.post(REVIEW_SUBMIT_URL, reviewData, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰을 사용하는 경우
        "Content-Type": "application/json",
      },
    });

    // 요청 성공 시 처리
    console.log("리뷰 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    // 요청 실패 시 처리
    console.error("리뷰 등록 실패:", error);
    throw error;
  }
};

// 리뷰 수정 함수
export const updateReview = async (jwt, reviewData) => {
  try {
    // 서버에 PUT 요청으로 수정된 리뷰 데이터를 전송
    const response = await axios.put(REVIEW_UPDATE_URL, reviewData, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 인증 토큰
        "Content-Type": "application/json",
      },
    });

    // 요청 성공 시 응답 데이터 반환
    console.log("리뷰 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    // 요청 실패 시 오류 처리
    console.error("리뷰 수정 중 오류 발생:", error);
    throw error; // 오류를 상위에서 처리할 수 있도록 던짐
  }
};

// 리뷰 삭제 함수
export const deleteReview = async (jwt, proId) => {
  const url = getDeleteReviewkUrl(proId); // URL 생성 함수 호출
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰을 헤더에 포함
      },
    });

    // 요청 성공 시 응답 데이터 반환
    console.log("리뷰 삭제 성공:", response.data);
    return response.data; // 성공적인 응답 반환
  } catch (error) {
    throw new Error("리뷰 삭제 중 오류가 발생했습니다: " + error.message);
  }
};
