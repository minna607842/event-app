import { useState, useEffect } from 'react'
import { LatLng } from 'react-native-maps'
import * as Location from 'expo-location'
import { convertEnglishToPrefecture, translations } from '../method/location'

export default function useFormattedAddress(region: LatLng) {
  const [address, setAddress] = useState<string>('')

  async function getFormattedAddress() {
    try {
      const [location] = await Location.reverseGeocodeAsync(region)
      let regionName = location?.region;
      
      // isoCountryCodeがJP（日本）で、regionNameが変換リストに存在する場合、変換を試みる
      if (location?.isoCountryCode === 'JP' && Object.keys(translations).includes(regionName.toLowerCase())) {
        regionName = convertEnglishToPrefecture(regionName);
      }

      const fullAddress = `${location?.isoCountryCode}#${regionName}`;
      setAddress(fullAddress);
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
      getFormattedAddress()
  }, [region])

  return { address, getFormattedAddress }
}