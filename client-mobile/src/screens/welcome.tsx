import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import * as atoms from '../lib/atoms'
import { Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import { TouchableButton } from '../components/ui'
import women from '../../assets/women.jpg'


export default function WelcomeScreen({ navigation, route }) {
  const { width, height } = Dimensions.get('window');
  const { routeFrom } = route?.params || {}
  const [user, setUser] = useRecoilState(atoms.user)
  
  useEffect(() => {
    if(routeFrom !== 'deepLinking' && user.userId) {
      navigation.navigate("AppTabs", { screen: "Search" });
    }
  },[route, navigation])
  return (
    <>
      <ImageBackground
        source={women}
        style={{ flex: 1, width: width, height: height }}
      >
        <View className='flex-1 items-center justify-center mx-4'>
          <TouchableOpacity className='bg-slate-100 py-4 px-3 w-full rounded-lg'
            onPress={() => navigation.push('Login')}
          >
          <View className='flex-row justify-center items-center'>
            <Text className='text-xl font-semibold pl-2'>ログイン</Text>
          </View>
        </TouchableOpacity>
          <View className='pb-6'/>
          <TouchableButton
            onPress={() => navigation.push('Register')}
            text={'新規登録'}
            className='mb-6'
          />
        </View>
      </ImageBackground>
    </>
  )
}
