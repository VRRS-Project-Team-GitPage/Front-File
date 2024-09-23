import { users, getUserVegTypeName } from "./dummyUser";

// 더미 리뷰 데이터
export const reviews = [
  // 제품 1에 대한 리뷰 (총 3개)
  {
    pro_id: 1,
    user_id: 1,
    is_rec: true,
    content: "정말 맛있어요!",
    created_at: new Date("2023-09-04T12:00:00Z"),
  },
  {
    pro_id: 1,
    user_id: 2,
    is_rec: false,
    content: "맛이 별로네요.",
    created_at: new Date("2023-10-01T12:00:00Z"),
  },
  {
    pro_id: 1,
    user_id: 3,
    is_rec: true,
    content: "다시 살 것 같아요.",
    created_at: new Date("2023-10-10T12:00:00Z"),
  },

  // 제품 2에 대한 리뷰 (총 4개)
  {
    pro_id: 2,
    user_id: 4,
    is_rec: true,
    content: "깔끔하고 좋아요.",
    created_at: new Date("2023-09-06T12:00:00Z"),
  },
  {
    pro_id: 2,
    user_id: 5,
    is_rec: false,
    content: "그냥 그래요.",
    created_at: new Date("2023-09-07T14:00:00Z"),
  },
  {
    pro_id: 2,
    user_id: 6,
    is_rec: true,
    content: "아이들도 좋아해요!",
    created_at: new Date("2023-09-08T12:00:00Z"),
  },
  {
    pro_id: 2,
    user_id: 1,
    is_rec: false,
    content: "저랑은 안 맞아요.",
    created_at: new Date("2023-09-10T09:00:00Z"),
  },

  // 제품 3에 대한 리뷰 (총 2개)
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

  // 제품 4에 대한 리뷰 (총 3개)
  {
    pro_id: 4,
    user_id: 7,
    is_rec: true,
    content: "다시 사고 싶어요!",
    created_at: new Date("2023-09-08T13:00:00Z"),
  },
  {
    pro_id: 4,
    user_id: 6,
    is_rec: true,
    content: "아주 좋았습니다.",
    created_at: new Date("2023-09-08T15:00:00Z"),
  },
  {
    pro_id: 4,
    user_id: 5,
    is_rec: false,
    content: "별로였습니다.",
    created_at: new Date("2023-09-09T09:30:00Z"),
  },

  // 제품 5에 대한 리뷰 (총 5개)
  {
    pro_id: 5,
    user_id: 8,
    is_rec: true,
    content: "아주 좋았어요!",
    created_at: new Date("2023-09-09T09:00:00Z"),
  },
  {
    pro_id: 5,
    user_id: 2,
    is_rec: false,
    content: "기대 이하였어요.",
    created_at: new Date("2023-09-09T10:00:00Z"),
  },
  {
    pro_id: 5,
    user_id: 1,
    is_rec: true,
    content: "만족스러워요.",
    created_at: new Date("2023-09-09T12:00:00Z"),
  },
  {
    pro_id: 5,
    user_id: 7,
    is_rec: true,
    content: "추천합니다.",
    created_at: new Date("2023-09-10T11:30:00Z"),
  },
  {
    pro_id: 5,
    user_id: 3,
    is_rec: false,
    content: "아쉬운 부분이 많았어요.",
    created_at: new Date("2023-09-10T14:00:00Z"),
  },

  // 제품 6에 대한 리뷰 (총 1개)
  {
    pro_id: 6,
    user_id: 5,
    is_rec: false,
    content: "평범해요.",
    created_at: new Date("2023-09-10T12:00:00Z"),
  },

  // 제품 7에 대한 리뷰 (총 2개)
  {
    pro_id: 7,
    user_id: 6,
    is_rec: true,
    content: "정말 맛있었어요!",
    created_at: new Date("2023-09-11T10:00:00Z"),
  },
  {
    pro_id: 7,
    user_id: 7,
    is_rec: false,
    content: "별로였어요.",
    created_at: new Date("2023-09-11T15:00:00Z"),
  },

  // 제품 8에 대한 리뷰 (총 3개)
  {
    pro_id: 8,
    user_id: 8,
    is_rec: true,
    content: "다음에 또 구매할게요!",
    created_at: new Date("2023-09-12T11:30:00Z"),
  },
  {
    pro_id: 8,
    user_id: 4,
    is_rec: true,
    content: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-12T14:00:00Z"),
  },
  {
    pro_id: 8,
    user_id: 2,
    is_rec: false,
    content: "별로였어요.",
    created_at: new Date("2023-09-12T16:00:00Z"),
  },

  // 제품 9에 대한 리뷰 (총 2개)
  {
    pro_id: 9,
    user_id: 1,
    is_rec: true,
    content: "최고에요!",
    created_at: new Date("2023-09-13T15:00:00Z"),
  },
  {
    pro_id: 9,
    user_id: 5,
    is_rec: true,
    content: "또 사고 싶어요.",
    created_at: new Date("2023-09-13T17:00:00Z"),
  },

  // 제품 10에 대한 리뷰 (총 1개)
  {
    pro_id: 10,
    user_id: 8,
    is_rec: false,
    content: "기대 이하였어요.",
    created_at: new Date("2023-09-14T16:00:00Z"),
  },

  // 제품 11에 대한 리뷰 (총 1개)
  {
    pro_id: 11,
    user_id: 4,
    is_rec: true,
    content: "훌륭합니다!",
    created_at: new Date("2023-09-15T13:30:00Z"),
  },

  // 제품 12에 대한 리뷰 (총 1개)
  {
    pro_id: 12,
    user_id: 6,
    is_rec: true,
    content: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-16T17:00:00Z"),
  },
  // 제품 13에 대한 리뷰 (총 7개)
  {
    pro_id: 13,
    user_id: 1,
    is_rec: true,
    content: "가격 대비 만족스럽습니다.",
    created_at: new Date("2023-09-17T09:00:00Z"),
  },
  {
    pro_id: 13,
    user_id: 7,
    is_rec: false,
    content: "별로였어요.",
    created_at: new Date("2023-09-17T09:30:00Z"),
  },
  {
    pro_id: 13,
    user_id: 2,
    is_rec: true,
    content: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-17T10:00:00Z"),
  },
  {
    pro_id: 13,
    user_id: 4,
    is_rec: false,
    content: "실망스럽네요.",
    created_at: new Date("2023-09-17T10:30:00Z"),
  },
  {
    pro_id: 13,
    user_id: 8,
    is_rec: true,
    content: "가성비 좋네요.",
    created_at: new Date("2023-09-17T11:00:00Z"),
  },
  {
    pro_id: 13,
    user_id: 6,
    is_rec: false,
    content: "다신 안 살 것 같아요.",
    created_at: new Date("2023-09-17T12:00:00Z"),
  },
  {
    pro_id: 13,
    user_id: 5,
    is_rec: true,
    content: "다시 구매할 예정입니다.",
    created_at: new Date("2023-09-17T13:00:00Z"),
  },

  // 제품 14에 대한 리뷰 (총 8개)
  {
    pro_id: 14,
    user_id: 2,
    is_rec: true,
    content: "매우 만족합니다.",
    created_at: new Date("2023-09-18T11:00:00Z"),
  },
  {
    pro_id: 14,
    user_id: 3,
    is_rec: false,
    content: "그저 그래요.",
    created_at: new Date("2023-09-18T11:30:00Z"),
  },
  {
    pro_id: 14,
    user_id: 4,
    is_rec: true,
    content: "좋았어요!",
    created_at: new Date("2023-09-18T12:00:00Z"),
  },
  {
    pro_id: 14,
    user_id: 5,
    is_rec: false,
    content: "생각보다 별로였습니다.",
    created_at: new Date("2023-09-18T12:30:00Z"),
  },
  {
    pro_id: 14,
    user_id: 6,
    is_rec: true,
    content: "잘 샀어요.",
    created_at: new Date("2023-09-18T13:00:00Z"),
  },
  {
    pro_id: 14,
    user_id: 7,
    is_rec: true,
    content: "매우 좋았습니다.",
    created_at: new Date("2023-09-18T14:00:00Z"),
  },
  {
    pro_id: 14,
    user_id: 1,
    is_rec: false,
    content: "다시 구매는 안 할 듯.",
    created_at: new Date("2023-09-18T15:00:00Z"),
  },
  {
    pro_id: 14,
    user_id: 8,
    is_rec: true,
    content: "추천할 만한 제품입니다.",
    created_at: new Date("2023-09-18T16:00:00Z"),
  },

  // 제품 15에 대한 리뷰 (총 9개)
  {
    pro_id: 15,
    user_id: 1,
    is_rec: true,
    content: "정말 좋았습니다.",
    created_at: new Date("2023-09-19T10:00:00Z"),
  },
  {
    pro_id: 15,
    user_id: 2,
    is_rec: false,
    content: "제 기대에는 못 미쳤어요.",
    created_at: new Date("2023-09-19T10:30:00Z"),
  },
  {
    pro_id: 15,
    user_id: 3,
    is_rec: true,
    content: "만족스러운 제품입니다.",
    created_at: new Date("2023-09-19T11:00:00Z"),
  },
  {
    pro_id: 15,
    user_id: 4,
    is_rec: false,
    content: "가격 대비 좀 아쉽네요.",
    created_at: new Date("2023-09-19T11:30:00Z"),
  },
  {
    pro_id: 15,
    user_id: 5,
    is_rec: true,
    content: "매우 좋았어요!",
    created_at: new Date("2023-09-19T12:00:00Z"),
  },
  {
    pro_id: 15,
    user_id: 6,
    is_rec: true,
    content: "다음에도 구매할 겁니다.",
    created_at: new Date("2023-09-19T12:30:00Z"),
  },
  {
    pro_id: 15,
    user_id: 7,
    is_rec: false,
    content: "생각보다 별로였습니다.",
    created_at: new Date("2023-09-19T13:00:00Z"),
  },
  {
    pro_id: 15,
    user_id: 8,
    is_rec: true,
    content: "좋아요. 재구매할 겁니다.",
    created_at: new Date("2023-09-19T13:30:00Z"),
  },
  {
    pro_id: 15,
    user_id: 11,
    is_rec: false,
    content: "다시는 구매 안 할 것 같아요.",
    created_at: new Date("2023-09-19T14:00:00Z"),
  },

  // 제품 16에 대한 리뷰 (총 10개)
  {
    pro_id: 16,
    user_id: 1,
    is_rec: true,
    content: "정말 좋았어요.",
    created_at: new Date("2023-09-20T10:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 2,
    is_rec: true,
    content: "가성비 최고입니다.",
    created_at: new Date("2023-09-20T10:30:00Z"),
  },
  {
    pro_id: 16,
    user_id: 3,
    is_rec: false,
    content: "좀 실망했어요.",
    created_at: new Date("2023-09-20T11:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 4,
    is_rec: true,
    content: "만족스러워요!",
    created_at: new Date("2023-09-20T11:30:00Z"),
  },
  {
    pro_id: 16,
    user_id: 5,
    is_rec: true,
    content: "다시 구매할 예정입니다.",
    created_at: new Date("2023-09-20T12:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 6,
    is_rec: false,
    content: "가격대비 별로네요.",
    created_at: new Date("2023-09-20T12:30:00Z"),
  },
  {
    pro_id: 16,
    user_id: 7,
    is_rec: true,
    content: "좋습니다. 추천해요.",
    created_at: new Date("2023-09-20T13:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 8,
    is_rec: true,
    content: "잘 샀어요.",
    created_at: new Date("2023-09-20T13:30:00Z"),
  },
  {
    pro_id: 16,
    user_id: 9,
    is_rec: false,
    content: "생각보다 별로였습니다.",
    created_at: new Date("2023-09-20T14:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 10,
    is_rec: true,
    content: "정말 좋았어요.",
    created_at: new Date("2023-09-20T10:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 11,
    is_rec: true,
    content: "가성비 최고입니다.",
    created_at: new Date("2023-09-20T10:30:00Z"),
  },
  {
    pro_id: 16,
    user_id: 12,
    is_rec: false,
    content: "좀 실망했어요.",
    created_at: new Date("2023-09-20T11:00:00Z"),
  },
  {
    pro_id: 16,
    user_id: 13,
    is_rec: true,
    content: "다시 구매할 예정입니다.",
    created_at: new Date("2023-09-20T12:00:00Z"),
  },

  // 제품 17에 대한 리뷰 (총 7개)
  {
    pro_id: 17,
    user_id: 4,
    is_rec: true,
    content: "맛있게 먹었습니다.",
    created_at: new Date("2023-09-21T09:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 6,
    is_rec: false,
    content: "기대보다 별로였어요.",
    created_at: new Date("2023-09-21T10:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 2,
    is_rec: true,
    content: "재구매 의향 있습니다.",
    created_at: new Date("2023-09-21T11:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 7,
    is_rec: true,
    content: "잘 먹었습니다.",
    created_at: new Date("2023-09-21T12:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 12,
    is_rec: false,
    content: "조금 실망했어요.",
    created_at: new Date("2023-09-21T13:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 5,
    is_rec: true,
    content: "아이들도 좋아했어요.",
    created_at: new Date("2023-09-21T14:00:00Z"),
  },
  {
    pro_id: 17,
    user_id: 11,
    is_rec: true,
    content: "추천할 만한 제품이에요.",
    created_at: new Date("2023-09-21T15:00:00Z"),
  },

  // 제품 18에 대한 리뷰 (총 5개)
  {
    pro_id: 18,
    user_id: 3,
    is_rec: true,
    content: "맛있었습니다.",
    created_at: new Date("2023-09-22T09:00:00Z"),
  },
  {
    pro_id: 18,
    user_id: 9,
    is_rec: false,
    content: "별로였습니다.",
    created_at: new Date("2023-09-22T10:00:00Z"),
  },
  {
    pro_id: 18,
    user_id: 1,
    is_rec: true,
    content: "다시 살 것 같아요.",
    created_at: new Date("2023-09-22T11:00:00Z"),
  },
  {
    pro_id: 18,
    user_id: 8,
    is_rec: true,
    content: "추천합니다.",
    created_at: new Date("2023-09-22T12:00:00Z"),
  },
  {
    pro_id: 18,
    user_id: 4,
    is_rec: false,
    content: "다시는 안 살 거 같아요.",
    created_at: new Date("2023-09-22T13:00:00Z"),
  },

  // 제품 19에 대한 리뷰 (총 6개)
  {
    pro_id: 19,
    user_id: 2,
    is_rec: true,
    content: "괜찮은 선택이었습니다.",
    created_at: new Date("2023-09-23T09:00:00Z"),
  },
  {
    pro_id: 19,
    user_id: 6,
    is_rec: false,
    content: "별로였습니다.",
    created_at: new Date("2023-09-23T10:00:00Z"),
  },
  {
    pro_id: 19,
    user_id: 5,
    is_rec: true,
    content: "다시 구매할 예정입니다.",
    created_at: new Date("2023-09-23T11:00:00Z"),
  },
  {
    pro_id: 19,
    user_id: 10,
    is_rec: true,
    content: "매우 만족합니다.",
    created_at: new Date("2023-09-23T12:00:00Z"),
  },
  {
    pro_id: 19,
    user_id: 12,
    is_rec: false,
    content: "기대 이하였습니다.",
    created_at: new Date("2023-09-23T13:00:00Z"),
  },
  {
    pro_id: 19,
    user_id: 9,
    is_rec: true,
    content: "맛있었어요.",
    created_at: new Date("2023-09-23T14:00:00Z"),
  },

  // 제품 20에 대한 리뷰 (총 7개)
  {
    pro_id: 20,
    user_id: 3,
    is_rec: false,
    content: "실망스러웠습니다.",
    created_at: new Date("2023-09-24T09:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 4,
    is_rec: true,
    content: "가격 대비 괜찮습니다.",
    created_at: new Date("2023-09-24T10:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 7,
    is_rec: true,
    content: "만족스러워요.",
    created_at: new Date("2023-09-24T11:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 8,
    is_rec: true,
    content: "추천할 만합니다.",
    created_at: new Date("2023-09-24T12:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 11,
    is_rec: false,
    content: "별로였습니다.",
    created_at: new Date("2023-09-24T13:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 10,
    is_rec: true,
    content: "다시 구매할 것 같아요.",
    created_at: new Date("2023-09-24T14:00:00Z"),
  },
  {
    pro_id: 20,
    user_id: 5,
    is_rec: true,
    content: "좋은 제품이었습니다.",
    created_at: new Date("2023-09-24T15:00:00Z"),
  },
  {
    pro_id: 23,
    user_id: 3,
    is_rec: true,
    content: "재구매 의향이 있습니다.",
    created_at: new Date("2023-09-25T09:00:00Z"),
  },
  {
    pro_id: 23,
    user_id: 7,
    is_rec: false,
    content: "기대에 못 미쳤습니다.",
    created_at: new Date("2023-09-25T10:30:00Z"),
  },
  {
    pro_id: 23,
    user_id: 11,
    is_rec: true,
    content: "좋은 선택이었어요.",
    created_at: new Date("2023-09-25T12:00:00Z"),
  },
  {
    pro_id: 23,
    user_id: 9,
    is_rec: true,
    content: "가격 대비 괜찮습니다.",
    created_at: new Date("2023-09-25T14:00:00Z"),
  },
];

// 리뷰의 `created_at`을 ISO 문자열로 변환하는 함수
export const convertReviewDatesToString = () => {
  reviews.forEach((review) => {
    if (review.created_at instanceof Date) {
      review.created_at = review.created_at.toISOString(); // Date 객체를 문자열로 변환
    }
  });
};

// 사용 예시
convertReviewDatesToString();

// 특정 제품에 대한 리뷰를 가져오는 함수
export const getReviewsByProduct = (productId) => {
  return reviews.filter((review) => review.pro_id === productId);
};

// 리뷰에 유저 정보를 연동하는 함수
export const getReviewsWithUserInfo = (reviews) => {
  return reviews.map((review) => {
    // 해당 리뷰의 user_id를 통해 유저 정보 찾기
    const user = users.find((user) => user.id === review.user_id);

    return {
      ...review,
      user_name: user ? user.name : null, // 유저 이름 추가
      user_veg_type: user ? getUserVegTypeName(user.veg_type_id) : null, // 채식 유형 추가
    };
  });
};

// 리뷰를 최신순으로 정렬하는 함수
export const sortReviewsByDate = (reviews) => {
  return reviews.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
};

// 전체 리뷰 데이터를 가져오는 함수
export const getAllReviews = () => {
  return reviews;
};
