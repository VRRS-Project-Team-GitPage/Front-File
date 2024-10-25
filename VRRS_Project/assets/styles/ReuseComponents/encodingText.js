// 검색어 인코딩 함수
export const encodeSearchTerm = (searchTerm) => {
  const searchTermWithoutSpaces = searchTerm.replace(/\s+/g, ""); // 공백 제거
  return encodeURIComponent(searchTermWithoutSpaces);
};
