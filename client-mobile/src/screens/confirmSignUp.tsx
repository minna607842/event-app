import React, { useState } from 'react';
import { useRecoilState } from 'recoil'
import * as atoms from '../lib/atoms'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserPlan } from 'shared/enum';
import { Analytics, Auth } from 'aws-amplify';
import useLoading from '../lib/hooks/useLoading';
import { handleCreateLocal } from '../lib/method/graphql';
import { showToast } from '../lib/method/toast';

const ConfirmSignUpScreen = ({route, navigation}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(atoms.user)
  const { email, name, password } = route.params
  const { setIsLoading, loadingElement } = useLoading()

  const signInUser = async (email, password) => {
    try {
      const signInResult = await Auth.signIn(email, password);
      console.log('User signed in:');
      return signInResult;
    } catch (error) {
      console.log('Error signing in user:', error);
      throw error;
    }
  };
  
  const pressConfirm = async () => {
    setIsLoading(true)
    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(email, code);
      console.log('auth response', response);

      const signInResult = await signInUser(email, password);
      const userId = signInResult.attributes.sub;
      const input = {
        type_id: `user#${userId}`,
        type: 'user',
        user: {
          userName: name,
          email: email,
          userId: userId,
          plan: UserPlan.FREE,
        }
      };
      await handleCreateLocal(input);
      await Analytics.record({ name: 'new user' });
      setUser({
        ...user, 
        userName: name,
        email: email,
        userId: userId,
        plan: UserPlan.FREE
      })
      showToast('アカウント登録に成功しました')
      navigation.navigate('EditProfile', {
        isRegister: true,
      })
    } catch (error) {
      console.log('error confirming sign up', error);
      alert('登録に失敗しました。もう一度やり直してください。');
    } finally {
      setLoading(false);
      setIsLoading(false)
    }
  };

  const resendCode = async () => {
    setIsLoading(true)
    try {
      const response = await Auth.resendSignUp(email);
      console.log('resendSignUp response', response);
      Alert.alert('再送信成功', '確認コードが再送信されました');
    } catch (error) {
      console.log('error resending sign up code', error);
      Alert.alert('再送信失敗', '確認コードの再送信に失敗しました');
    }
    setIsLoading(false)
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      {loadingElement()}
      <Text className='mb-6 text-base'>メールアドレスに送られたコードを入力してください</Text>
      <TextInput
        autoCapitalize='none'
        onChangeText={setCode}
        value={code}
        placeholder="Confirmation Code"
        keyboardType="numeric"
        className='border border-gray-300 rounded w-full p-2 mb-4'
      />
      <TouchableOpacity
        onPress={pressConfirm}
        disabled={loading}
        className={`bg-blue-500 rounded w-full px-2 py-3 mb-4' ${loading ? 'opacity-50' : 'opacity-100'}`}
      >
        <Text className='text-white text-center text-lg'>確認する</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={resendCode}
        className='text-blue-500 text-sm'
      >
        <Text className='text-center pt-3'>コードを再送する</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmSignUpScreen;
