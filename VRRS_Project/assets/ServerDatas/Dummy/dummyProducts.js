import { vegTypes } from "./dummyVegTypes";
import { categories } from "./dummyProductCate";
import { reviews } from "./dummyReviews";

// 더미 제품 데이터 생성
export const products = [
  {
    id: 1,
    name: "제품 1",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 1,
    veg_type_id: 1,
    rec: 12,
    review: 20,
    created_at: new Date("2023-09-01T12:00:00Z"),
  },
  {
    id: 2,
    name: "제품 2",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 2,
    veg_type_id: 1,
    rec: 3,
    review: 12,
    created_at: new Date("2023-09-02T15:00:00Z"),
  },
  {
    id: 3,
    name: "제품 3",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 3,
    veg_type_id: 2,
    rec: 7,
    review: 14,
    created_at: new Date("2023-09-03T10:00:00Z"),
  },
  {
    id: 4,
    name: "제품 4",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 4,
    veg_type_id: 2,
    rec: 16,
    review: 18,
    created_at: new Date("2023-09-04T08:00:00Z"),
  },
  {
    id: 5,
    name: "제품 5",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 5,
    veg_type_id: 3,
    rec: 11,
    review: 22,
    created_at: new Date("2023-09-05T14:00:00Z"),
  },
  {
    id: 6,
    name: "제품 6",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 6,
    veg_type_id: 3,
    rec: 16,
    review: 19,
    created_at: new Date("2023-09-06T11:00:00Z"),
  },
  {
    id: 7,
    name: "제품 7",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 7,
    veg_type_id: 4,
    rec: 8,
    review: 21,
    created_at: new Date("2024-03-07T13:00:00Z"),
  },
  {
    id: 8,
    name: "제품 8",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 8,
    veg_type_id: 4,
    rec: 15,
    review: 20,
    created_at: new Date("2024-09-08T09:00:00Z"),
  },
  {
    id: 9,
    name: "제품 9",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 9,
    veg_type_id: 5,
    rec: 22,
    review: 23,
    created_at: new Date("2023-11-09T17:00:00Z"),
  },
  {
    id: 10,
    name: "제품 10",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 10,
    veg_type_id: 5,
    rec: 16,
    review: 22,
    created_at: new Date("2023-09-10T16:00:00Z"),
  },
  {
    id: 11,
    name: "제품 11",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 11,
    veg_type_id: 6,
    rec: 18,
    review: 24,
    created_at: new Date("2023-09-17T07:00:00Z"),
  },
  {
    id: 12,
    name: "제품 12",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 12,
    veg_type_id: 6,
    rec: 21,
    review: 23,
    created_at: new Date("2023-09-12T12:00:00Z"),
  },
  {
    id: 13,
    name: "제품 13",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 13,
    veg_type_id: 1,
    rec: 8,
    review: 25,
    created_at: new Date("2023-09-13T18:00:00Z"),
  },
  {
    id: 14,
    name: "제품 14",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 14,
    veg_type_id: 2,
    rec: 7,
    review: 22,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 15,
    name: "제품 15",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 15,
    veg_type_id: 3,
    rec: 12,
    review: 21,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 16,
    name: "제품 16",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 16,
    veg_type_id: 4,
    rec: 7,
    review: 44,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 17,
    name: "제품 17",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 17,
    veg_type_id: 5,
    rec: 7,
    review: 9,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 18,
    name: "제품 18",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 18,
    veg_type_id: 6,
    rec: 0,
    review: 0,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 19,
    name: "제품 19",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 19,
    veg_type_id: 1,
    rec: 0,
    review: 4,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 20,
    name: "제품 20",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 20,
    veg_type_id: 2,
    rec: 0,
    review: 0,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 21,
    name: "제품 21",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 21,
    veg_type_id: 3,
    rec: 0,
    review: 2,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 22,
    name: "제품 22",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 22,
    veg_type_id: 4,
    rec: 6,
    review: 14,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
  {
    id: 23,
    name: "제품 23",
    category: "카테고리",
    ingredients: [
      "원재료명 1",
      "원재료명 2",
      "원재료명 3",
      "원재료명 4",
      "원재료명 5",
      "원재료명 6",
    ],
    img_path: "https://via.placeholder.com/150",
    pro_type_id: 23,
    veg_type_id: 5,
    rec: 3,
    review: 3,
    created_at: new Date("2023-09-14T15:00:00Z"),
  },
];

// 특정 제품의 채식 유형 이름을 ID로 찾는 함수
export const getVegTypeName = (vegTypeId) => {
  const vegType = vegTypes.find((type) => type.id === vegTypeId);
  return vegType ? vegType.name : "전체";
};

// 특정 제품의 식품 유형 이름을 ID로 찾는 함수
export const getProTypeNAme = (proTypeId) => {
  const proType = categories.find((type) => type.id === proTypeId);
  return proType ? proType.name : "미정";
};

// 리뷰 수를 업데이트하는 함수
export const updateReviewCount = (reviews) => {
  products.forEach((product) => {
    // 각 제품의 id에 맞는 리뷰를 필터링하여 총 리뷰 수를 업데이트
    const productReviews = reviews.filter(
      (review) => review.pro_id === product.id
    );
    product.review = productReviews.length;
  });
};

// 추천 수를 업데이트하는 함수
export const updateRecCount = (reviews) => {
  products.forEach((product) => {
    // 각 제품의 id에 맞는 추천 리뷰(is_rec: true)의 수를 업데이트
    const productRec = reviews.filter(
      (review) => review.pro_id === product.id && review.is_rec
    );
    product.rec = productRec.length;
  });
};

// 초기 실행 시 제품 데이터를 업데이트
updateReviewCount(reviews);
updateRecCount(reviews);

// 전체 제품 데이터를 가져오는 함수
export const getAllProducts = () => {
  return products;
};
