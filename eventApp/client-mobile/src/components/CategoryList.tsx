import { useState } from 'react'
import { StyleSheet, FlatList, Platform, Pressable, Text, View } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

export default function CategoryRowList({ onSelect, onCloseModal }) {
  const [location, setLocation] = useState([
    {
      text: 'dog',
      icon: <FontAwesome5 name="dog" size={18} color="black" />,
    },
    {
      text: 'family',
      icon: <MaterialIcons name="emoji-people" size={24} color="black" />,
    },
  ])

  const [situation, setSituation] = useState([
    {
      text: 'dog',
      icon: <FontAwesome5 name="dog" size={18} color="black" />,
    },
    {
      text: 'family',
      icon: <MaterialIcons name="emoji-people" size={24} color="black" />,
    },
  ])

  const CategoryRowList = ({ data }) => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
        data={data}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                onSelect(item)
                onCloseModal()
              }}>
              <View style={styles.image} className='justify-center'>
                <View>
                  {item.icon}
                </View>
                <Text key={index} >{item.text}</Text>
              </View>
            </Pressable>
          )
        }}
      />
    )
  }

  return (
    <>
      <View className='flex-1'>
        <CategoryRowList data={location} />
      </View>
      <View className='border-t border-gray-300 flex-1'>
        <CategoryRowList data={situation} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
  },
})
