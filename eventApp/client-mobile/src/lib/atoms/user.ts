import { Region } from 'react-native-maps'
import { atom } from 'recoil'
import { UserPlan } from 'shared/enum/event'
import { User } from 'shared/types'

export const defaultUser: User = {
  userId: '',
  userName: '',
  userImgSrc: '',
  email: '',
  desc: {
    experience: '',
    like: '',
    worry: '',
    free: '',
  },
  SNS: {
    twitter: '',
    fb: '',
    instagram: '',
    youtube: '',
  },
}

const defaultUsers = [defaultUser]

export const user = atom({
  key: 'app-user',
  default: defaultUser,
})