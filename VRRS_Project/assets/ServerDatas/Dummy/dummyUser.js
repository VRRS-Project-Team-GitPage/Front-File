import { vegTypes } from "./dummyVegTypes";

export const users = [
  {
    id: 1,
    name: "김철수",
    veg_type_id: 1, // 비건
  },
  {
    id: 2,
    name: "이우빈",
    veg_type_id: 2, // 락토
  },
  {
    id: 3,
    name: "구본하",
    veg_type_id: 3, // 오보
  },
  {
    id: 4,
    name: "안돌진",
    veg_type_id: 4, //락토 오보 베지테리언
  },
  {
    id: 5,
    name: "박민수",
    veg_type_id: 4,
  },
  {
    id: 6,
    name: "최수정",
    veg_type_id: 5,
  },
  {
    id: 7,
    name: "홍길동",
    veg_type_id: 6, //폴로 베지테리언
  },
  {
    id: 8,
    name: "이영희",
    veg_type_id: 1, //비건
  },
];

// 특정 유저의 채식 유형 이름을 ID로 찾는 함수
export const getUserVegTypeName = (vegTypeId) => {
  const vegType = vegTypes.find((type) => type.id === vegTypeId);
  return vegType ? vegType.name : "Unknown";
};

// 전체 유저 데이터를 가져오는 함수
export const getAllUsers = () => {
  return users;
};
