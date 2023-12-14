import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, Text, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getImage } from '../lib/method/image'

const Applicant = ({ item, onPress, onAccept, onDeny }) => {
  const [userImage, setUserImage] = useState(null);
  const paddingValue = Platform.OS === 'android' ? 'px-5' : 'px-7'; 
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        if (item.userImgSrc) {
          const userImageUrl = await getImage(item.userImgSrc);
          setUserImage(userImageUrl);
        }
      } catch (error) {
        console.error('Error fetching image URLs: ', error);
      }
    };
    fetchImageUrls();
  }, [item.userImgSrc]);

  return (
    <View
      className='flex-row my-4'
      key={item?.ts?.toString()}
    >
      <TouchableOpacity onPress={onPress}>
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            resizeMode='cover'
            style={{
              width: 80,
              height: 80,
              borderRadius: 40
            }}
          />
        ) : (
          <Ionicons name="person-circle-sharp" size={70} color="black" />
        )}
      </TouchableOpacity>
      <View className='pl-5'>
        <Text className='shrink text-xl font-semibold pb-2'>
          {item?.userName}
        </Text>
        <View className='flex-row justify-between gap-2'>
          <TouchableOpacity
            className={`bg-green-500 rounded-xl ${paddingValue} py-2 text-xl`} // パディングの値を動的に設定
            onPress={onAccept}>
            <Text className='text-white font-bold text-base'>承認する</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-gray-300 rounded-xl ${paddingValue} py-2 text-xl`} // パディングの値を動的に設定
            onPress={onDeny}>
            <Text className='font-bold text-base'>拒否する</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Applicant;
