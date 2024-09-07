// Import Core React & React Native Components
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

// Import all ImagePicker functions to reference them as a collective object "ImagePicker"
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission to access the media library
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // If permission is granted, launch the image library
    if (permissions?.granted) {
      let result = ImagePicker.launchImageLibraryAsync;
      // If the user selects an image, set the image state to the selected image
      if (!result.canceled) setImage(result.assets[0]);
      // If the user cancels selection, set the image state to null
      else setImage(null);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" onPress={pickImage} />
      <Button title="Take a photo" onPress={() => {}} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
