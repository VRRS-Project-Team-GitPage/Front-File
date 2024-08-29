// 특정 Component Touch 시 축소되는 애니메이션을 구현한 페이지 입니다.
// import 후 애니메이션을 적용하고 싶은 Component를 감싸면 기능을 사용할 수 있습니다.
import React, { useRef } from "react";
import { Animated, TouchableWithoutFeedback, StyleSheet } from "react-native";

// Component name: TouchableScale
// <TouchableScale></TouchableScale> 형태로 사용합니다.
const TouchableScale = ({ children, onPress, style, scaleTo = 0.95 }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // 터시 시 작동하는 함수입니다.
  const handlePressIn = () => {
    // 크기를 감소시키는 애니메이션
    Animated.spring(scaleValue, {
      toValue: scaleTo, //크기를 얼마나 줄일 것인지에 대한 Option입니다.
      useNativeDriver: true,
    }).start();
  };

  // 터치 완료 시 작동하는 함수입니다.
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // 크기를 원래대로 돌려줍니다.
      useNativeDriver: true,
    }).start();
  };

  // Component 사용 방식에 대해 다룹니다.
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableScale;
