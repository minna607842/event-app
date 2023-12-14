import React from 'react'
import { TouchableOpacity, Text, View, Platform } from 'react-native'
import { EventDay } from 'shared/enum'

interface DayButtonProps {
  selectedDay: EventDay;
  setSelectedDay: (day: EventDay) => void;
  setSelectedToDay: (day: EventDay) => void;
}

const DayButton: React.FC<DayButtonProps>  = ({ selectedDay, setSelectedDay, setSelectedToDay }) => {
  return (
    <View className='flex-row'>
      <TouchableOpacity
        className={`${selectedDay === EventDay.TODAY
          ? 'bg-green-400'
          : 'border border-gray-400 bg-white'
          } rounded-l-xl py-2 ${Platform.OS === 'android' ? 'text-lg px-6' : 'text-xl px-8'}`}
        onPress={() => setSelectedDay(EventDay.TODAY)}
      >
        <Text
          className={`${selectedDay === EventDay.TODAY
            ? 'text-white'
            : 'text-black'
            } text-lg font-semibold`}
        >
          今日
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`${selectedDay === EventDay.TOMORROW
          ? 'bg-green-400'
          : 'border border-gray-400 bg-white'
          } rounded-r-xl py-2 ${Platform.OS === 'android' ? 'text-lg px-6' : 'text-xl px-8'}`}
        onPress={() => {
          setSelectedDay(EventDay.TOMORROW);
          setSelectedToDay(EventDay.TOMORROW);
        }}
      >
        <Text
          className={`${selectedDay === EventDay.TOMORROW
            ? 'text-white'
            : 'text-black'
            } text-lg font-semibold`}
        >
          明日
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DayButton
