// 서버에서 로그인 관련 내용을 저장한 파일입니다.
// 해당 파일에 필요한 값을 저장한 후 불러와 사용해주세요
import axios from "axios";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL = "서버 주소";

const API_URL = `${SERVER_URL}/엔드 포인트`; // 서버 URL - 추후 실제 URL로 변경 예정

// 로그인 함수
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(error.response.data.message || "가입된 정보가 없습니다.");
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};
