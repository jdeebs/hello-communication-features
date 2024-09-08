// Import Core React & React Native Components
import { useState } from "react";
import { Button, StyleSheet, View, Image } from "react-native";
import MapView from "react-native-maps";

// Import All Expo Module functions To Reference As Collective Objects
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    // Request permission to access the media library
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // If permission is granted, launch the image library
    if (permissions?.granted) {
      // If the user selects an image, set the image state to the selected image
      ImagePicker.launchImageLibraryAsync()
        .then((result) => {
          if (!result.canceled) setImage(result.assets[0]);
        })
        // If the user cancels selection, set the image state to null
        .catch((error) => {
          console.log(error);
          setImage(null);
        });
    }
  };

  const takePhoto = async () => {
    // Request permission to access the camera
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    // If permission is granted, launch the camera
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      // If the user takes a photo, set the image state to the taken photo
      if (!result.canceled) {
        let mediaLibraryPermissions =
          await MediaLibrary.requestPermissionsAsync();

        // Save the photo to the media library
        if (mediaLibraryPermissions?.granted)
          await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

        // Set the image state to the taken photo
        setImage(result.assets[0]);
        // If the user cancels taking a photo, set the image state to null
      } else setImage(null);
    }
  };

  const getLocation = async () => {
    // Request permission to access the location
    let permissions = await Location.requestForegroundPermissionsAsync();

    // If permission is granted, get the current location
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      // Set the location state to the current location
      setLocation(location);
      // If permission is not granted, alert the user
    } else {
      Alert.alert("Location access denied. Please enable location access.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from the library" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      <Button title="Get my location" onPress={getLocation} />
      {image && (
        <Image
          // Set the image source to the selected image
          source={{ uri: image.uri }}
          // Set the dimensions of the image
          style={{ width: 200, height: 200 }}
        />
      )}
      {location && (
        <MapView
          // Set the dimensions of the map view
          style={{ width: 300, height: 300 }}
          region={{
            // Initial region of the map, centered on the user's current location
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // Delta values control zoom level of the map
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
