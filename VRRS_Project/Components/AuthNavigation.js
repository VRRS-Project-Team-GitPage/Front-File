// 로그인 인증을 관리하는 네비게이션 입니다.
// 해당 파일 내에서 로그인 Stack을 import 후 로그인 여부에 따라 보여지는 화면을 관리합니다.
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../assets/ServerDatas/ReuseDatas/AuthProvider";
// 앱 전제 Stakc
import LoginTestStack from "./LoginTest_Components/LoginTestStack"; // 추후 실제 로그인 Stack으로 변경해주세요
import Main_BottomBar from "./Main_Components/Main_BottomBar";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  const { isLogin, setIsLogin } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogin ? (
        <Stack.Screen name="appMain" component={Main_BottomBar}></Stack.Screen>
      ) : (
        // 추후 component에 실제 로그인 Stakc을 넣어주셔야 합니다
        <Stack.Screen name="appLogin" component={LoginTestStack}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
