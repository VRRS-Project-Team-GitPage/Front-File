// 하단바를 숨기거나 나타나게 하는 로직 Component 입니다.
// 필요시 import 후, 해당 Component에서
// useTabBarVisibility(true/false); 로 사용할 수 있습니다
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useTabBarVisibility = (visible) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();
    if (parentNavigator) {
      parentNavigator.setOptions({
        tabBarStyle: {
          display: visible
            ? {
                height: 60,
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                position: "absolute",
              }
            : "none",
        },
      });
    }

    return () => {
      if (parentNavigator) {
        parentNavigator.setOptions({
          tabBarStyle: {
            height: 60,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            position: "absolute",
          }, // Show tab bar again when leaving screen
        });
      }
    };
  }, [navigation, visible]);
};

export default useTabBarVisibility;
