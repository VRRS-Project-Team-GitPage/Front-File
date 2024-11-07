import "dotenv/config";

export default {
  expo: {
    name: "채식 어디",
    slug: "VRRS_Project",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/System_Image/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.seoleem.VRRS_Project",
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.READ_EXTERNAL_STORAGE",
      ],
      softwareKeyboardLayoutMode: "pan",
    },
    web: {
      favicon: "./assets/System_Image/favicon.png",
    },
    permissions: ["CAMERA"],
    plugins: ["expo-font"],
    extra: {
      // 환경 변수 추가
      serverUrl: process.env.SERVER_URL,
      // 로그인
      loginEndpoint: process.env.LOGIN_ENDPOINT,
      findIdEndpoint: process.env.FINDID_ENDPOINT,
      findPwEndpoint: process.env.FINDPW_ENDPOINT,
      resetPwEndpoint: process.env.RESETPW_ENDPOINT,
      emailEndpoint: process.env.EMAIL_ENDPOINT,
      checkIdEndpoint: process.env.CHECKID_ENDPOINT,
      joinEndpoint: process.env.JOIN_ENDPOINT,
      updateEndpoint: process.env.UPDATE_ENDPOINT,
      withdrawalEndpoint: process.env.WITHDRAWAL_ENDPOINT,
      // 사전
      productEndPoint: process.env.PRODUCT_ENDPOINT,
      productDetailEndPoint: process.env.PRODUCTDETAIL_ENDPOINT,
      productReviewEndPoint: process.env.PRODUCTREVIEW_ENDPOINT,
      feedBackEndPoint: process.env.FEEDBACK_ENDPOIN,
      // 북마크
      bookMarkEndPoint: process.env.BOOKMARK_ENDPOINT,
      getBookMarkEndPoint: process.env.GET_BOOKMARK_ENDPOINT,
      deletetBookMarkEndPoint: process.env.DELETE_BOOKMARK_ENDPOINT,
      // 판독
      ocrEndPoint: process.env.OCR_ENDPOINT,
      readingEndPoint: process.env.READING_ENDPOINT,
      uploadEndPoint: process.env.UPLOAD_ENDPOINT,
      // 인기 순위
      rankEndPoint: process.env.RANK_ENDPOINT,
      categoryEndPoint: process.env.CATEGORY_ENDPOINT,
      keywordEndPoint: process.env.KEYWORD_ENDPOINT,
      // 리뷰
      reviewEndPoint: process.env.REVIEW_SUBMIT_URL,
      reviewUpdateEndPoint: process.env.REVIEW_UPDATE_URL,
      reviewDeleteEndPoint: process.env.REVIEW_DELETE_URL,
      reviewViewEndPoint: process.env.REVIEW_VIEW_URL,
    },
  },
};
