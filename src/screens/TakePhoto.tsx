import { Camera, CameraType } from "expo-camera";
import React, { useRef } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import {graphql, useMutation} from "react-relay";

export default function TakePhoto({
    navigation
}): JSX.Element {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const ref = useRef(null);

  const TakePhotoMutation = graphql`
    mutation TakePhotoMutation($input: String!) {
      savePhoto(base64Data: $input)
    }
  `;

  const [savePhoto, isInFlight] = useMutation(TakePhotoMutation);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  
  const cheese = async () => {
    const photo = await ref.current.takePictureAsync({
        base64: true,
        quality: 0,
    });
    console.debug(photo.base64.length);

    savePhoto({
        variables: {
            input: photo.base64
        }
    });

    console.log("saved!");

    navigation.navigate("Photos", {});
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.front}
        ratio="1:1"
        ref={ref}
      >
      </Camera>
      <Button title="Cheese!" onPress={cheese} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },
});
