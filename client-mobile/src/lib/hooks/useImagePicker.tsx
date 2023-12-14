import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Alert } from 'react-native'
import * as Linking from 'expo-linking'

type Image = {
  uri: string
}

export default function useImagePicker() {
  const [image, setImage] = useState<Image | null>(null)
  const [status, setStatus] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const removeMedia = () => {
    setImage(null)
  }

  const launchPicker = async () => {
    const permissionGranted = await checkMediaPermissions()
    if (permissionGranted) {
      await handleMediaOpen()
    } else {
      await requestMediaPermissions()
    }
  }

  const resetMedia = () => setImage(null)

  const checkMediaPermissions = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync()
    return granted
  }

  const handleMediaOpen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage({ uri: result.assets[0].uri })
      setHeight(result.assets[0].height)
      setWidth(result.assets[0].width)
      setStatus(true)
    }
  }

  const requestMediaPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (granted) {
      handleMediaOpen()
    } else {
      Alert.alert(
        'Permission Required',
        'Please grant the required permissions to access the media library.',
        [
          {
            text: 'Go to settings',
            onPress: () => Linking.openSettings(),
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      )
    }
  }

  return {
    image,
    width,
    height,
    status,
    launchPicker,
    resetMedia,
    removeMedia,
  }
}
