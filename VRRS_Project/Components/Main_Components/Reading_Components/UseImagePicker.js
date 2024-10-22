import React, { useEffect, useState, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";

export default function ImagePickerScreen({ navigation }) {
  // 하단탭 숨기기
  useTabBarVisibility(false);

  // 갤러리 권한을 위함
  const [galleryPermission, setGalleryPermission] = useState(null);

  // 앱 설정 열기
  const openAppSettings = () => {
    Alert.alert(
      "권한 필요",
      "앱 설정에서 권한을 변경해주세요.",
      [
        {
          text: "취소",
          style: "cancel",
          onPress: () => {
            navigation.navigate("HomeTab", {
              screen: "Home",
            });
          },
        },
        {
          text: "이동",
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false }
    );
  };

  // 권한 요청 및 갤러리 열기
  const openGallery = async () => {
    const { status, canAskAgain } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    setGalleryPermission(status);

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imgUri = result.assets[0].uri;
        navigation.navigate("ReadTab", {
          screen: "ProNameScreen",
          params: { imgUri: imgUri, triggerSubmitImg: true },
        });
      } else {
        // 갤러리가 닫히거나 X 버튼이 눌린 경우 홈 화면으로 이동
        navigation.navigate("HomeTab", {
          screen: "Home",
        });
      }
    } else {
      if (canAskAgain) {
        const { status: newStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(newStatus);
        if (newStatus !== "granted") openAppSettings();
      } else {
        openAppSettings();
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      openGallery();
    }, [])
  );

  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
