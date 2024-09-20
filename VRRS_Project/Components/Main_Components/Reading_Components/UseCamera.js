import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Linking } from "react-native"; // Linking 추가
// compnent 관련
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
// design rhksfus
import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UseCamera({ navigation }) {
  useTabBarVisibility(false);

  // 카메라의 기능을 위한 변수
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const [zoom, setZoom] = useState(0.5);
  const [flash, setFalsh] = useState("off");

  // 권한 여부를 위한 변수
  const [permission, requestPermission] = useCameraPermissions();
  // 권한 상태 확인 및 요청 함수
  const checkPermissions = async () => {
    if (!permission) return; // 권한 정보가 없으면 리턴

    if (permission.status !== "granted") {
      // 권한이 거부되었을 때
      if (!permission.canAskAgain) {
        // 권한을 다시 물어볼 수 없을 때 설정을 엽니다.
        Alert.alert(
          "권한 필요",
          "앱 설정에서 카메라 권한을 변경해주세요.",
          [
            { text: "취소", style: "cancel" },
            {
              text: "설정 열기",
              onPress: () => {
                Linking.openSettings(); // 설정을 여는 기능
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // 권한을 다시 요청할 수 있을 때
        requestPermission();
      }
    }
  };

  useEffect(() => {
    checkPermissions(); // 컴포넌트가 마운트될 때 권한 상태 확인
  }, [permission]);

  // 카메라 전환 함수
  function toggleCameraFacing() {
    setZoom(0.5);
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // 사진 촬영 기능
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();
    const photoUri = photo.uri;
    navigation.navigate("ReadTab", {
      screen: "IngridientScreen",
      params: { photoUri: photoUri, triggerSubmit: true },
    });
  };

  // 줌 기능들
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0));
  };

  const handleZoomReturn = () => {
    setZoom(0.5);
  };

  const handleFlash = () => {
    setFalsh((current) => (current === "off" ? "on" : "off"));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={handleFlash} style={{ marginTop: 24 }}>
          {flash === "on" ? (
            <Ionicons name="flash-sharp" size={24} color={Gray_theme.white} />
          ) : (
            <Ionicons
              name="flash-off-sharp"
              size={24}
              color={Gray_theme.white}
            />
          )}
        </TouchableOpacity>
      </View>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        zoom={zoom}
        animateShutter={true}
        flash={flash}
      >
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 24,
            right: 0,
            left: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.zoomContainer}>
              <TouchableOpacity
                style={{ marginHorizontal: 4 }}
                onPress={handleZoomOut}
              >
                <View style={styles.zoomBtn}>
                  <Octicons name="dash" size={18} color={Gray_theme.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 4 }}
                onPress={handleZoomReturn}
              >
                <View style={styles.zoomBtn}>
                  <Octicons name="circle" size={16} color={Gray_theme.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 4 }}
                onPress={handleZoomIn}
              >
                <View style={styles.zoomBtn}>
                  <Octicons name="plus" size={18} color={Gray_theme.white} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={takePicture}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: Gray_theme.white,
            }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", right: 40 }}
          onPress={toggleCameraFacing}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 50,
              backgroundColor: Gray_theme.gray_80,
            }}
          >
            <Feather
              name="refresh-cw"
              size={24}
              color={Gray_theme.white}
              style={{ marginTop: 16, alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 7,
  },
  zoomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Gray_theme.balck,
    opacity: 0.8,
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  zoomBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: Gray_theme.gray_70,
    borderRadius: 50,
  },
  buttonContainer: {
    flex: 2,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
