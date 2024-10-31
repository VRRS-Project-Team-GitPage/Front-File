// 서버에서 사전 관련 내용을 저장한 파일입니다.
import axios from "axios";

// 북마크 조회 함수
export const fetchBookmarks = async (jwt) => {
  try {
    const response = await axios.get(BOOKMARK_URL, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰을 헤더에 포함
      },
    });

    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("북마크 조회 오류:", error);
    throw error; // 오류를 호출하는 곳으로 전달
  }
};

// 북마크 등록 함수
export const addBookmark = async (id, jwt) => {
  const url = getBookmarkUrl(id);
  try {
    const response = await axios.post(
      url,
      {}, // POST 요청에 data가 필요 없을 때 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // JWT 토큰
        },
      }
    );
    return response.data;
  } catch (error) {
    // 에러 처리
    if (error.response) {
      console.error("Server responded with:", error.response.data.message); // 서버 응답 로그
      throw new Error(error.response.data.message || "북마크 등록 실패");
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};

// 북마크 삭제 함수
export const removeBookmark = async (id, jwt) => {
  const url = deleteBookmarkUrl(id);
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰
      },
    });
    return response.data;
  } catch (error) {
    // 에러 처리
    if (error.response) {
      console.error("Server responded with:", error.response.data.message); // 서버 응답 로그
      throw new Error(
        error.response.data.message || "북마크를 삭제할 수 없습니다."
      );
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};
