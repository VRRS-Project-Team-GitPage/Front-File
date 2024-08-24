import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home_Components/HomeScreen";
import DicScreen from "./Dic_Components/DicScreen";
import ReadingScreen from "./Reading_Components/ReadingScreen";
import RecommendScreen from "./Recommend_Components/RecommendScreen";
import UserScreen from "./User_Components/UserScreen";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="Dic" component={DicScreen}></Tab.Screen>
        <Tab.Screen name="Read" component={ReadingScreen}></Tab.Screen>
        <Tab.Screen name="Reco" component={RecommendScreen}></Tab.Screen>
        <Tab.Screen name="User" component={UserScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
