// 로그인 인증을 관리하는 네비게이션 입니다.
// 해당 파일 내에서 로그인 Stack을 import 후 로그인 여부에 따라 보여지는 화면을 관리합니다.
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../assets/ServerDatas/ReuseDatas/AuthProvider";
// 앱 전제 Stakc
import LoginStack from "./Main_Components/Login_Components/LoginStack";
import Main_BottomBar from "./Main_Components/Main_BottomBar";
import SubStack from "./Main_Components/Anywhere_Components/AnyStack";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  const { isLogin } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogin ? (
        <>
          <Stack.Screen name="appMain" component={Main_BottomBar}></Stack.Screen>
          <Stack.Screen name="appSub" component={SubStack}></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="UserStack" component={LoginStack}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
