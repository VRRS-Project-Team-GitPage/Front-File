import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import HomeScreen from "../Home_Components/HomeScreen";
import { Gray_theme } from "../../../assets/styles/Theme_Colors";
// Icon 관련 import
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UseCamera({ navigation }) {
  useTabBarVisibility(false);
  //const AnimatedCamera = Animated.createAnimatedComponent(CameraView);

  // 카메라 참조
  const cameraRef = useRef(null);
  // 카메라 위치- default: 후면
  const [facing, setFacing] = useState("back");
  // 카메라 권한
  const [permission, requestPermission] = useCameraPermissions();
  // 줌 값 관리 (애니메이션 제거)
  const [zoom, setZoom] = useState(0.5); // 초기 줌 값
  // 플래시 모드
  const [flash, setFalsh] = useState("off");

  // 카메라 권한 로딩 중일 때
  if (!permission) {
    return <View />;
  }

  // 카메라 권한 요청이 없을 때
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>카메라 권한이 필요합니다.</Text>
        <Button onPress={requestPermission} title="권한 요청" />
      </SafeAreaView>
    );
  }

  // 카메라 전환 함수
  function toggleCameraFacing() {
    // 카메라 전환 시 줌 값을 기본값으로 설정
    setZoom(0.5);
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // 사진 촬영 기능
  const takePicture = async () => {
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) {
      return;
    } else {
      const photo = await cameraRef.current.takePictureAsync(); // 사진 객체를 반환
      const photoUri = photo.uri; // 반환된 객체에서 uri 속성만 가져오기
      navigation.navigate("ReadTab", {
        screen: "IngridientScreen",
        params: { photoUri: photoUri, triggerSubmit: true },
      });
    }
  };

  // 줌 인 기능 (애니메이션 제거)
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 1)); // 최대 줌 값은 1
  };

  // 줌 아웃 기능 (애니메이션 제거)
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0)); // 최소 줌 값은 0
  };

  // 줌 기본값으로 복구
  const handleZoomReturn = () => {
    setZoom(0.5); // 기본 줌 값
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
        <TouchableOpacity
          onPress={handleFlash}
          style={{ marginTop: 24 }}
          activeOpacity={0.8}
        >
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
              {/* 줌 아웃 버튼 */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginHorizontal: 4 }}
                onPress={handleZoomOut}
              >
                <View style={styles.zoomBtn}>
                  <Octicons name="dash" size={18} color={Gray_theme.white} />
                </View>
              </TouchableOpacity>
              {/* 줌 기본 버튼 */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginHorizontal: 4 }}
                onPress={handleZoomReturn}
              >
                <View style={styles.zoomBtn}>
                  <Octicons name="circle" size={16} color={Gray_theme.white} />
                </View>
              </TouchableOpacity>
              {/* 줌 인 버튼 */}
              <TouchableOpacity
                activeOpacity={0.8}
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
          activeOpacity={0.8}
          style={{
            position: "absolute",
            right: 40,
          }}
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
              style={{
                marginTop: 16,
                alignSelf: "center",
              }}
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
