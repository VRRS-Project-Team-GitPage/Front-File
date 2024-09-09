import { products } from "./dummyProducts";
import { users } from "./dummyUsers";

// 더미 리뷰 데이터
export const reviews = [
  {
    pro_id: 1,
    user_id: 1,
    is_rec: true,
    content: "정말 맛있어요!",
    created_at: new Date("2023-09-04T12:00:00Z"),
  },
  {
    pro_id: 1,
    user_id: 4,
    is_rec: false,
    content: "에. 별로였어요.",
    created_at: new Date("2023-09-05T09:30:00Z"),
  },
  {
    pro_id: 2,
    user_id: 5,
    is_rec: true,
    content: "괜찮아요.",
    created_at: new Date("2023-09-06T14:00:00Z"),
  },
  {
    pro_id: 3,
    user_id: 3,
    is_rec: true,
    content: "노래가 절로 나오는 맛",
    created_at: new Date("2023-09-07T08:00:00Z"),
  },
  {
    pro_id: 3,
    user_id: 2,
    is_rec: false,
    content: "별로였어요.",
    created_at: new Date("2023-09-07T11:00:00Z"),
  },
  {
    pro_id: 4,
    user_id: 1,
    is_rec: true,
    content: "다시 사고 싶어요!",
    created_at: new Date("2023-09-08T13:00:00Z"),
  },
  {
    pro_id: 5,
    user_id: 8,
    is_rec: true,
    content: "아주 좋았어요!",
    created_at: new Date("2023-09-09T09:00:00Z"),
  },
  {
    pro_id: 6,
    user_id: 5,
    veg_type_id: 4,
    is_rec: false,
    content: "평범해요.",
    created_at: new Date("2023-09-10T12:00:00Z"),
  },
  {
    pro_id: 7,
    user_id: 6,
    veg_type_id: 5,
    is_rec: true,
    content: "정말 맛있었어요!",
    created_at: new Date("2023-09-11T10:00:00Z"),
  },
  {
    pro_id: 8,
    user_id: 7,
    veg_type_id: 6,
    is_rec: true,
    content: "다음에 또 구매할게요!",
    created_at: new Date("2023-09-12T11:30:00Z"),
  },
  {
    pro_id: 9,
    user_id: 1,
    is_rec: true,
    content: "최고에요!",
    created_at: new Date("2023-09-13T15:00:00Z"),
  },
  {
    pro_id: 10,
    user_id: 8,
    is_rec: false,
    content: "기대 이하였어요.",
    created_at: new Date("2023-09-14T16:00:00Z"),
  },
  {
    pro_id: 11,
    user_id: 4,
    is_rec: true,
    content: "훌륭합니다!",
    created_at: new Date("2023-09-15T13:30:00Z"),
  },
  {
    pro_id: 12,
    user_id: 6,
    is_rec: true,
    content: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-16T17:00:00Z"),
  },
];

// 각 제품의 리뷰 수 및 추천 수 집계 함수
const updateProductStats = () => {
  products.forEach((product) => {
    const productReviews = reviews.filter(
      (review) => review.pro_id === product.id
    );
    product.review = productReviews.length;
    product.rec = productReviews.filter((review) => review.is_rec).length;
  });
};

// 제품 리뷰 수 및 추천 수 업데이트
updateProductStats();

// 전체 리뷰 데이터를 가져오는 함수
export const getAllReviews = () => {
  return reviews;
};
