// LocalReviewModal와 관련된 함수를 모아둔 컴포넌트 입니다.
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../styles/ReuseComponents/showToast";
// server 관련
import { submitReview, updateReview } from "../ServerApi/reviewApi";

// 리뷰 저장 함수 - 로컬 저장
export const saveReview = async (serverReview, setMainUserReview) => {
  try {
    const review = {
      pro_id: serverReview.proId, // 서버에서 받은 product ID
      user_id: serverReview.userId, // 서버에서 받은 user ID
      is_rec: serverReview.rec, // 서버에서 받은 추천 여부
      content: serverReview.content, // 서버에서 받은 리뷰 내용
      created_at: serverReview.date, // 서버에서 받은 작성 시간
      upLoadReview: true, // 서버로 업로드 완료 상태
    };

    // 새로운 리뷰 객체를 바로 AsyncStorage에 저장
    const reviewsObject = { [serverReview.proId]: review };

    // 새로운 리뷰 객체를 AsyncStorage에 저장
    await AsyncStorage.setItem("userReview", JSON.stringify(reviewsObject));

    // 상태에 저장
    setMainUserReview(review);

    // 성공 메시지
    showToast("리뷰가 성공적으로 저장되었습니다.");
  } catch (e) {
    showToast("리뷰 저장 중 오류가 발생하였습니다.", e);
  }
};

// 리뷰 수정 함수 - 로컬 저장
const saveUpdatedReviewToLocalStorage = async (
  updatedReview,
  setMainUserReview
) => {
  try {
    const storedReviews = await AsyncStorage.getItem("userReview");
    const reviewsObject =
      storedReviews != null ? JSON.parse(storedReviews) : {};

    // 해당 productID의 리뷰를 업데이트
    reviewsObject[updatedReview.proId] = updatedReview;

    // 업데이트된 리뷰 객체를 다시 AsyncStorage에 저장
    await AsyncStorage.setItem("userReview", JSON.stringify(reviewsObject));

    // 상태에 저장
    setMainUserReview(updatedReview);

    console.log("수정된 리뷰가 성공적으로 저장되었습니다.");
    showToast("리뷰가 성공적으로 수정되었습니다.");
  } catch (e) {
    showToast("리뷰 저장 중 오류가 발생하였습니다.", e);
  }
};

// 리뷰 수정 - 서버 연동 (해당 Component에 불러와 사용)
export const handleReviewUpdate = async () => {
  try {
    const reviewData = {
      proId: productID, // 제품 ID
      content: reviewText, // 수정된 리뷰 내용
      rec: isRec ? 1 : 0, // 추천 여부
    };

    // 리뷰 수정 요청 함수 호출
    const updatedReview = await updateReview(jwt, reviewData);

    // 응답 데이터를 바탕으로 상태 및 로컬 저장소 업데이트
    await saveUpdatedReviewToLocalStorage(updatedReview);

    showToast("리뷰가 성공적으로 수정되었습니다.");
  } catch (error) {
    console.log("수정된 리뷰가 성공적으로 저장되었습니다.", error);
  }
};

// 리뷰 불러오기 함수
export const loadReview = async (
  productID,
  setMainUserReview,
  setReviewTime,
  setUpLoadReview,
  setReviewText,
  setIsRec,
  setIsNotRec,
  resetReviewState
) => {
  try {
    const storedReviews = await AsyncStorage.getItem("userReview");
    const reviewsObject =
      storedReviews != null ? JSON.parse(storedReviews) : {};

    const loadedReview = reviewsObject[productID];

    if (loadedReview && loadedReview.pro_id === productID) {
      setMainUserReview(loadedReview);
      setReviewTime(loadedReview.created_at);
      setUpLoadReview(loadedReview.upLoadReview);
      setReviewText(loadedReview.content);
      setIsRec(loadedReview.is_rec);
      setIsNotRec(!loadedReview.is_rec);
    } else {
      resetReviewState();
    }
  } catch (e) {
    showToast("리뷰 불러오기 중 오류가 발생하였습니다.", e);
  }
};
