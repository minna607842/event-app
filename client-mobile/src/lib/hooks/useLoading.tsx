import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { customStyles } from '../../styles'

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const loadingElement = () => {
    return (
      <>
        {isLoading &&
          <View style={customStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="rgb(22 163 74)" />
          </View>
        }
      </>
    )
  }
  return {
    isLoading,
    setIsLoading,
    loadingElement
  }
}