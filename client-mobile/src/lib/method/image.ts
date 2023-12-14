import * as ImageManipulator from 'expo-image-manipulator';
import { Storage } from 'aws-amplify';
import uuid from 'react-native-uuid';


export async function resizeImage(uri: string, width: number, height: number) {
  try {
    if (!uri || !width || !height) {
      throw new Error('Invalid parameters provided for resizing the image');
    }
    const actions = [{
      resize: {
        width: width * 0.5,
        height: height * 0.5,
      },
    }];
    const saveOptions = {
      base64: true,
      format: ImageManipulator.SaveFormat.JPEG,
      compress: 0.6,
    };
    const result = await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
    if (!result.uri) {
      throw new Error('Failed to resize the image');
    }
    return result.uri;
  } catch (err) {
    console.error('Error resizing image: ', err);
    return null;
  }
}

export async function uploadImage(uri: string): Promise<string | null> {
  try {
    if (!uri) {
      throw new Error('Invalid URI provided for uploading the image');
    }
    const id = uuid.v4().toString();  // Generate a version 4 UUID
    const response = await fetch(uri);
    if (!response.ok && response.type !== 'default') {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    if (!blob) {
      throw new Error('Failed to convert the response to a blob');
    }
    const result = await Storage.put(id, blob);
    if (!result.key) {
      throw new Error('Failed to upload the image');
    }
    return result.key;
  } catch (err) {
    console.error('Error uploading file: ', err);
    // Here you can add more detailed error handling
    if (err.message.includes('HTTP error')) {
      // This is a network error
      console.error('Network error while uploading the image: ', err);
    } else if (err.message.includes('Failed to convert')) {
      // This is an error with the blob conversion
      console.error('Error converting the response to a blob: ', err);
    } else if (err.message.includes('Failed to upload')) {
      // This is an error with the upload
      console.error('Error uploading the image to the storage: ', err);
    }
    return null;
  }
}


export async function getImage(uri: string): Promise<string | null> {
  try {
    const url = await Storage.get(uri, {expires: 60 * 60 * 24});
    return url;
  } catch (err) {
    console.error('Error storage get image: ', err);
    if (err.message && err.message.includes('No such key')) {
      console.log('Key does not exist in storage: ', uri);
      // handle case when key does not exist
    }
    return null;
  }
}
