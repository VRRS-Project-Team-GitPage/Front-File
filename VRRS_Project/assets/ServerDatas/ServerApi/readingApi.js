// 서버에서 판독 관련 내용을 저장한 파일입니다.
import axios from "axios";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL = "서버_주소";
// OCR URL
const OCR_URL = "OCR_주소";
// reading URL
const READING_URL = "판독_주소";
// 제품 업로드 URL
const UPLOAD_URL = "업로드_주소";

// 북마크 등록 URL 생성 함수
export const getBookmarkUrl = (proId) => {
  return `${SERVER_URL}/bookmark/insert?proId=${proId}`;
};

// OCR 등록 함수
export const getOCRData = async (fileUri, jwt) => {
  try {
    // fileUri가 유효한지 확인
    if (typeof fileUri !== "string" || !fileUri) {
      throw new Error("Invalid file URI");
    }

    // formData 생성 및 파일 추가
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: "ocr_image.jpg",
      type: "image/jpeg",
    });

    // fetch를 사용해 multipart/form-data 요청 보내기
    const response = await fetch(OCR_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
      },
      body: formData,
    });

    if (!response.ok) {
      // 상태 코드에 따라 에러 던짐
      throw new Error(response.status.toString());
    }

    const data = await response.json();
    return data; // 서버에서 반환된 데이터
  } catch (error) {
    throw error; // 상태 코드만 던짐
  }
};

// Reading 함수
export const submitProductData = async (
  reportNum,
  vegTypeId,
  ingredients,
  exists,
  fullBracket,
  jwt
) => {
  try {
    const response = await axios.post(
      READING_URL,
      {
        reportNum: reportNum,
        vegTypeId: vegTypeId,
        ingredients: ingredients,
        exists: exists,
        fullBracket: fullBracket,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 명시
          Authorization: `Bearer ${jwt}`, // JWT 토큰 추가 (필요할 경우)
        },
      }
    );

    console.log("Server response:", response.data); // 서버 응답 확인
    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error("Failed to submit data:", error);
    throw error;
  }
};

// 제품 업로드 함수
export const uploadProductData = async (image, jsonData, jwt) => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: image.uri,
      type: "image/jpeg",
      name: "product_image.jpg",
    });

    formData.append("jsonData", JSON.stringify(jsonData));

    console.log("FormData 내용:", formData._parts);

    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return { success: false, message: "이미 등록된 제품입니다." };
    } else {
      throw error;
    }
  }
};
