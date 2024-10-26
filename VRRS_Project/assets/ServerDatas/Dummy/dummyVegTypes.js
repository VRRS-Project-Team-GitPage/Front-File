// 채식 유형 데이터
export const vegTypes = [
  { id: 1, name: "비건" },
  { id: 2, name: "락토 베지테리언" },
  { id: 3, name: "오보 베지테리언" },
  { id: 4, name: "락토 오보 베지테리언" },
  { id: 5, name: "페스코 베지테리언" },
  { id: 6, name: "폴로 베지테리언" },
];

export const getVegTypeIdByName = (name) => {
  const vegType = vegTypes.find((type) => type.name === name);
  return vegType ? vegType.id : null; // 해당 name의 id 반환, 없으면 null 반환
};
