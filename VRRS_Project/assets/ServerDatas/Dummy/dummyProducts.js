// 채식 유형 데이터
export const vegTypes = [
  { id: 1, name: "비건" },
  { id: 2, name: "락토 베지테리언" },
  { id: 3, name: "오보 베지테리언" },
  { id: 4, name: "락토 오보 베지테리언" },
  { id: 5, name: "페스코 베지테리언" },
  { id: 6, name: "폴로 베지테리언" },
];

// 더미 제품 데이터 생성
export const products = [
  {
    id: 1,
    name: "제품 1",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 1, // Vegan
  },
  {
    id: 2,
    name: "제품 2",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 1, // 비건
  },
  {
    id: 3,
    name: "제품 3",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 1, // 비건
  },
  {
    id: 4,
    name: "제품 4",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 1, // 비건
  },
  {
    id: 5,
    name: "제품 5",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 2, // 락토
  },
  {
    id: 6,
    name: "제품 6",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 2, // 락토
  },
  {
    id: 7,
    name: "제품 7",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 3, // 오보
  },
  {
    id: 8,
    name: "제품 8",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 3, // 오보
  },
  {
    id: 9,
    name: "제품 9",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 4, // 락토-오보
  },
  {
    id: 10,
    name: "제품 10",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 4, // 락토-오보
  },
  {
    id: 11,
    name: "제품 11",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 5, // 페스코
  },
  {
    id: 12,
    name: "제품 12",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 5, // 페스코
  },
  {
    id: 13,
    name: "제품 13",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 6, // 폴로
  },
  {
    id: 14,
    name: "제품 14",
    category: "카테고리",
    ingredients: ["원재료명 1", "원재료명 2", "원재료명 3"],
    image_url: "https://via.placeholder.com/150",
    veg_type_id: 6, // 폴로
  },
];

// 특정 제품의 채식 유형 이름을 ID로 찾는 함수
export const getVegTypeName = (vegTypeId) => {
  const vegType = vegTypes.find((type) => type.id === vegTypeId);
  return vegType ? vegType.name : "Unknown";
};

// 전체 제품 데이터를 가져오는 함수
export const getAllProducts = () => {
  return products;
};
