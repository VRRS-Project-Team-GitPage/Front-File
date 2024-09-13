import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, AutoFocus, CameraType } from "expo-camera";

export default function UseCamera() {
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  return (
    <SafeAreaView>
      <Camera useRef={cameraRef} type={cameraType}></Camera>
    </SafeAreaView>
  );
}
