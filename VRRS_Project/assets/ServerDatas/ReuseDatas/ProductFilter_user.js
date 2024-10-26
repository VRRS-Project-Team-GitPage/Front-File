// user의 유형을 기반으로 제품을 filter하는 함수입니다.
// 현재는 더미 데이터를 기반으로 작성되었으며, 추후 서버 구현 시 실제 데이터를 사용할 예정입니다.
import { vegTypes } from "./dummyVegTypes";

// 제품을 유저의 채식 유형에 맞춰 필터링하는 함수
export const filterProductsByUserType = (userVegType, products) => {
  const userVegTypeValue = vegTypes.find([userVegType]);
  return products.filter((product) => {
    const productVegTypeValue = vegTypeMapping[product.vegType];
    return productVegTypeValue <= userVegTypeValue;
  });
};
