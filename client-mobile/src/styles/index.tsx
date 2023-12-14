
import { StyleSheet, Platform } from 'react-native'

export const customStyles = StyleSheet.create({
  shadow: {
    borderWidth: 1,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '',
    borderColor: '#ddd',
    shadowColor: Platform.OS === 'ios' ? 'gray' : '#fff',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  thinBorderShadow: {
    borderWidth: 0.5,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '',
    borderColor: '#ddd',
    shadowColor: Platform.OS === 'ios' ? 'gray' : '#fff',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  androidShadow: {
    borderWidth: 0.5,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#fff',
    borderColor: 'rgb(229 231 235)',
    shadowColor: Platform.OS === 'ios' ? 'gray' : 'gray',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  shadowNocolor: {
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: Platform.OS === 'ios' ? 'gray' : '#fff',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  shadowNoBordercolor: {
    borderWidth: 1,
    shadowColor: 'gray',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  shadowTouchable: {
    borderWidth: 1,
    // backgroundColor: Platform.OS === 'ios' ? '#fff' : '',
    borderColor: '#ddd',
    shadowColor: Platform.OS === 'ios' ? 'gray' : '#fff',
    shadowOffset: {
      width: Platform.OS === 'ios' ? 3 : 0,
      height: Platform.OS === 'ios' ? 3 : 2,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 4 : 40,
    elevation: Platform.OS === 'ios' ? 0 : 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    pointerEvents: 'none', // この行を追加
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})