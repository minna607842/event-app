import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as atoms from '../lib/atoms'
import { Text, View, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPastMyEvents, sortNewestEvents, sortNewestUserEvents } from '../lib/method/event';
import { EventCard } from '../components';
import { useFocusEffect } from '@react-navigation/native';

export default function CopyEventScreen({ navigation }) {
  const [user, setUser] = useRecoilState(atoms.user)
  const [pastMyEvents, setPastMyEvents] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      const events = sortNewestUserEvents(getPastMyEvents(user))
      setPastMyEvents(events);
    }, [user])
  );

  return (
    <>
      <SafeAreaView
        className={`${Platform.OS === 'ios' ? 'px-2' : 'px-4'} bg-white flex-1`}
      >
        {(!pastMyEvents || pastMyEvents.length === 0) && <View className='justify-center items-center'><Text className='text-center text-lg'>過去のコピーできるイベントはありません</Text></View>}
        <Text className='text-center text-2xl pb-2'>コピーするイベントを選択する</Text>
        <FlatList
          data={pastMyEvents}
          className='mt-2'
          renderItem={({ item }) => (
            <EventCard item={item} type="map" navigation={navigation} route='copyEvent' isMyEvent={true} />
          )}
        />
      </SafeAreaView>
    </>
  )
}

