import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useRecoilState } from 'recoil'
import * as atoms from '../lib/atoms'
import { TouchableButton } from '../components/ui'

export default function EditLandmarkScreen({ navigation }) {
  const [location, setLocation] = useRecoilState(atoms.selectedLocation)

  const onRegionChange = (region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    })
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={location}
        onRegionChangeComplete={onRegionChange}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableButton
          onPress={() => navigation.goBack()}
          text='保存する'
          className='w-11/12'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

