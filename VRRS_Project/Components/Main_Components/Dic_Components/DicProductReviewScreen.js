import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// component 관련
import Line from "../../../assets/styles/ReuseComponents/LineComponent";
// design 관련
import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import MainIcons from "../../../assets/Icons/MainIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function DicProductReviewScreen({ route, navigation }) {
  const { reviewLength, reviewList } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      //console.log(reviewList);
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.header}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Octicons
            name="arrow-left"
            size={24}
            color={Gray_theme.gray_90}
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>리뷰</Text>
          <Text style={styles.reviewTotal}>({reviewLength})</Text>
        </TouchableOpacity>
      </View>
      <Line />
      <View style={{ marginBottom: 64 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={reviewList}
          keyExtractor={(item, index) => index.toString()} // 인덱스를 key로 사용
          renderItem={({ item }) => {
            return (
              <View style={styles.reviewContainer}>
                <View style={styles.userReviewContainer}>
                  <Image
                    source={MainIcons.allUser_profile}
                    style={styles.userProfile}
                  ></Image>
                  <View style={styles.userInfo}>
                    <View style={styles.userInfoContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 8,
                        }}
                      >
                        <Text style={styles.userName}>{item.user_name}</Text>
                        <Text style={styles.vegType}>{item.user_veg_type}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <Image
                          source={MainIcons.error}
                          style={styles.reportIcon}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.writeDate}>
                        {new Date(item.created_at).toLocaleDateString()}
                      </Text>
                      <Entypo
                        name="dot-single"
                        size={20}
                        color={Gray_theme.gray_50}
                        style={styles.dot}
                      />
                      {item.is_rec ? (
                        <Image
                          source={MainIcons.good}
                          style={{ ...styles.userRec, marginBottom: 2 }}
                        ></Image>
                      ) : (
                        <Image
                          source={MainIcons.bad}
                          style={{ ...styles.userRec, marginTop: 4 }}
                        ></Image>
                      )}
                    </View>
                  </View>
                </View>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            );
          }}
        />
        <View
          style={{
            marginBottom: 60,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginLeft: 24,
    marginRight: 16,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Pretendard-Bold",
    marginRight: 4,
  },
  reviewTotal: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 12,
    color: Gray_theme.gray_50,
  },
  reviewContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Gray_theme.gray_20,
  },
  userProfile: {
    width: 52,
    height: 52,
    marginRight: 16,
  },
  userReviewContainer: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  userInfo: {
    justifyContent: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  userName: {
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  vegType: {
    marginLeft: 8,
    fontSize: 10,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    backgroundColor: Main_theme.main_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  reportIcon: {
    width: 24,
    height: 24,
    tintColor: Gray_theme.gray_60,
  },
  userRec: {
    width: 16,
    height: 16,
  },
  dot: {
    marginHorizontal: 2,
  },
  writeDate: {
    fontFamily: "Pretendard-Medium",
    fontSize: 12,
    color: Gray_theme.gray_60,
  },
  content: {
    paddingVertical: 16,
    marginLeft: 68,
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
  },
});
