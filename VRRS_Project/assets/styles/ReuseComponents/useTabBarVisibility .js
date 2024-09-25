import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useTabBarVisibility = (visible) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setOptions({
        tabBarStyle: {
          display: visible ? "flex" : "none", // visible이 true면 보이고, false면 숨기기
          height: 60,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          position: "absolute",
        },
      });
    }

    // 화면을 벗어날 때 다시 탭바가 보이도록 설정
    return () => {
      if (parentNavigator) {
        parentNavigator.setOptions({
          tabBarStyle: {
            display: "flex", // 탭바가 다시 나타나도록 설정
            height: 60,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            position: "absolute",
          },
        });
      }
    };
  }, [navigation, visible]);
};

export default useTabBarVisibility;
