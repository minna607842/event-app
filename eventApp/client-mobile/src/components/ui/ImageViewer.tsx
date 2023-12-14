import { StyleSheet, Image } from 'react-native'

export default function ImageViewer({ selectedImage }) {
  const imageSource = !!selectedImage
    && { uri: selectedImage }
  return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 200,
    borderRadius: 18,
    marginBottom: 30,
  },
})
