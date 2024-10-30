// 서버에서 로그인 관련 내용을 저장한 파일입니다.
// 해당 파일에 필요한 값을 저장한 후 불러와 사용해주세요
import axios from "axios";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL ="서버주소";

// 로그인 URL
const API_URL = `${SERVER_URL}`; 

// ID찾기 URL
const FINDID_URL = `${SERVER_URL}`;
// PW찾기 URL
const FINDPW_URL = `${SERVER_URL}d`;
// PW재설정 URL
const RESETPW_URL = `${SERVER_URL}`;

// email 인증 URL
const EMAIL_URL =  `${SERVER_URL}`;
// id 중복 확인 URL
const CHECKID_URL = `${SERVER_URL}`;

// 회원 가입 URL
const JOIN_URL = `${SERVER_URL}`;
// 회원 정보 수정 URL
const UPDATE_URL = `${SERVER_URL}`;
// 회원 탈퇴 URL
const WITHDRAWAL_URL = `${SERVER_URL}`;

// 로그인 함수
export const loginUser = async (username, password) => {
  try {
    const response = await axios.put(API_URL, {
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

// ID 찾기 함수
export const findidUser = async (email) => {
  try {
    const response = await axios.post(FINDID_URL, { email });

    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "아이디 찾기에 실패했습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// PW 찾기 함수(인증코드 전송)
export const findpwUser = async (email, username) => {
  try {
    const response = await axios.post(FINDPW_URL, { email, username });

    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message ||
          "입력하신 정보와 일치하는 계정이 없습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// PW 재설정 함수
export const resetpwUser = async (username, password) => {
  try {
    const response = await axios.put(RESETPW_URL, { username, password });

    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "비밀번호 재설정에 실패했습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// email 인증 함수(인증코드 전송)
export const emailUser = async (email) => {
  try {
    const response = await axios.post(EMAIL_URL, { email });

    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "이미 사용 중인 이메일입니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// id 중복 확인 함수
export const checkidUser = async (username) => {
  try {
    const response = await axios.post(CHECKID_URL, { username });
    
    return response.data.exists; // 서버 응답에서 exists 필드만 반환
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "이미 사용 중인 아이디입니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};


// 회원 정보 수정 함수
export const updateUser = async (jwt, nickname, vegTypeId) => {
  try {
    const response = await axios.put(
      UPDATE_URL,
      {
        nickname,
        vegTypeId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
        },
      }
    );
    return response.data; // 성공 시 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "정보 수정에 실패했습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// 회원 탈퇴 함수
export const withdrawalUser = async (jwt) => {
  try {
    const response = await axios.delete(WITHDRAWAL_URL, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
      },
    });
    return response.data; // 성공 시 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "회원 탈퇴에 실패했습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};

// 회원 가입 함수
export const joinUser = async ({
  username,
  email,
  password,
  nickname,
  vegTypeId,
}) => {
  try {
    const response = await axios.post(JOIN_URL, {
      username,
      email,
      password,
      nickname,
      vegTypeId,
    });

    return response.data; // 성공 시 서버에서 반환하는 데이터
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있지만, 에러 상태 코드가 있는 경우
      throw new Error(
        error.response.data.message || "회원 가입에 실패했습니다."
      );
    } else {
      // 네트워크 에러 또는 서버가 응답하지 않는 경우
      throw new Error("서버가 응답하지 않습니다.");
    }
  }
};
