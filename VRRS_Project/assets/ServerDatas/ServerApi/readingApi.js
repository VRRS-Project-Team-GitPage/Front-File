// 서버에서 판독 관련 내용을 저장한 파일입니다.
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

// 서버 IP 주소: 실제 주소로 변경
const SERVER_URL ="서버주소";

// OCR URL
const OCR_URL = `${SERVER_URL}`;

// reading URL
const READING_URL = `${SERVER_URL}`;

// 북마크 등록 URL 생성 함수
export const getBookmarkUrl = (proId) => {
  return `${SERVER_URL}`;
};


// OCR 등록 함수

export const getOCRData = async (fileUri, jwt) => {
  try {
    // fileUri가 유효한지 확인
    if (typeof fileUri !== "string" || !fileUri) {
      throw new Error("Invalid file URI");
    }
    // 이미지 크기 줄이기 (예: 50%로 축소)
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      fileUri,
      [{ resize: { width: 1000 } }], // 너비를 1000px로 줄이고 비율 유지
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // 압축 수준과 형식 설정
    );

    // formData 생성 및 리사이즈한 파일 추가
    const formData = new FormData();
    formData.append("file", {
      uri: manipulatedImage.uri, // 리사이즈된 이미지 URI
      name: "ocr_image.jpg", // 서버에 저장될 파일 이름
      type: "image/jpeg", // 이미지 파일 형식
    });

    const response = await axios.post(OCR_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
      },
    });

    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error("OCR submission error:", error);
    throw error;
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
