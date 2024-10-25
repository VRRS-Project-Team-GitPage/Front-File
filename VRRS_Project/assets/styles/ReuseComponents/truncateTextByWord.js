// 글자 수에 따라 ...을 반환하는 함수
export const truncateTextByWord = (text, maxLength) => {
  if (text.length <= maxLength) return text; // 길이가 최대 길이 이하인 경우 그대로 반환

  const words = text.split(" "); // 공백을 기준으로 단어 배열로 나눕니다.
  let truncatedText = "";

  for (let word of words) {
    // 현재의 텍스트와 다음 단어를 합쳤을 때 길이가 maxLength 이하인지 확인합니다.
    if ((truncatedText + word).length <= maxLength) {
      truncatedText += word + " "; // 단어를 추가합니다.
    } else {
      break; // 최대 길이를 초과하면 루프를 종료합니다.
    }
  }

  return truncatedText.trim() + "..."; // 잘린 텍스트와 '...'을 추가하고, 앞뒤 공백 제거
};
