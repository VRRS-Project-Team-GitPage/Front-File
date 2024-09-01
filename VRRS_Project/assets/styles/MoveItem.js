import React, { useRef, useState } from "react";
import { Animated, View } from "react-native";

const MoveItem = ({ child }) => {
  // vlaue 생성 시 useRef 사용
  // Value() 인자값: 초기값
  const animation = useRef(new Animated.Value(0)).current;
  Animated.timing(animation, {
    toValue: 1,
    useNativeDriver: true,
  });

  return (
    <Animated.View style={[objectStyles, animationStyles]}>
      {child}
    </Animated.View>
  );
};
