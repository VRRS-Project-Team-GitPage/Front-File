import { products } from "./dummyProducts";
import { users } from "./dummyUsers";

// 더미 리뷰 데이터
export const reviews = [
  {
    productName: "제품 1",
    username: "김철수",
    veg_type_id: 1,
    like: true,
    comment: "정말 맛있어요!",
    created_at: new Date("2023-09-04T12:00:00Z"),
  },
  {
    productName: "제품 1",
    username: "안돌진",
    veg_type_id: 4,
    like: false,
    comment: "에. 별로였어요.",
    created_at: new Date("2023-09-05T09:30:00Z"),
  },
  {
    productName: "제품 2",
    username: "박민수",
    veg_type_id: 3,
    like: true,
    comment: "괜찮아요.",
    created_at: new Date("2023-09-06T14:00:00Z"),
  },
  {
    productName: "제품 3",
    username: "구본하",
    veg_type_id: 3,
    like: true,
    comment: "노래가 절로 나오는 맛",
    created_at: new Date("2023-09-07T08:00:00Z"),
  },
  {
    productName: "제품 3",
    username: "이우빈",
    veg_type_id: 2,
    like: false,
    comment: "별로였어요.",
    created_at: new Date("2023-09-07T11:00:00Z"),
  },
  {
    productName: "제품 4",
    username: "김철수",
    veg_type_id: 1,
    like: true,
    comment: "다시 사고 싶어요!",
    created_at: new Date("2023-09-08T13:00:00Z"),
  },
  {
    productName: "제품 5",
    username: "이영희",
    veg_type_id: 1,
    like: true,
    comment: "아주 좋았어요!",
    created_at: new Date("2023-09-09T09:00:00Z"),
  },
  {
    productName: "제품 6",
    username: "박민수",
    veg_type_id: 4,
    like: false,
    comment: "평범해요.",
    created_at: new Date("2023-09-10T12:00:00Z"),
  },
  {
    productName: "제품 7",
    username: "최수정",
    veg_type_id: 5,
    like: true,
    comment: "정말 맛있었어요!",
    created_at: new Date("2023-09-11T10:00:00Z"),
  },
  {
    productName: "제품 8",
    username: "홍길동",
    veg_type_id: 6,
    like: true,
    comment: "다음에 또 구매할게요!",
    created_at: new Date("2023-09-12T11:30:00Z"),
  },
  {
    productName: "제품 9",
    username: "김철수",
    veg_type_id: 1,
    like: true,
    comment: "최고에요!",
    created_at: new Date("2023-09-13T15:00:00Z"),
  },
  {
    productName: "제품 10",
    username: "이영희",
    veg_type_id: 1,
    like: false,
    comment: "기대 이하였어요.",
    created_at: new Date("2023-09-14T16:00:00Z"),
  },
  {
    productName: "제품 11",
    username: "박민수",
    veg_type_id: 4,
    like: true,
    comment: "훌륭합니다!",
    created_at: new Date("2023-09-15T13:30:00Z"),
  },
  {
    productName: "제품 12",
    username: "최수정",
    veg_type_id: 5,
    like: true,
    comment: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-16T17:00:00Z"),
  },
];

// 각 제품의 리뷰 수 및 추천 수 집계 함수
const updateProductStats = () => {
  products.forEach((product) => {
    const productReviews = reviews.filter(
      (review) => review.productName === product.name
    );
    product.commentsCount = productReviews.length;
    product.likes = productReviews.filter((review) => review.like).length;
  });
};

// 제품 리뷰 수 및 추천 수 업데이트
updateProductStats();

// 전체 리뷰 데이터를 가져오는 함수
export const getAllReviews = () => {
  return reviews;
};
