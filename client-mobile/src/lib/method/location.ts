import * as Location from 'expo-location';
import { Platform } from '../../../../shared/enum/user';
import { Platform as RNPlatform } from 'react-native';

export async function requestLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('位置情報へのアクセスが拒否されました。');
    return;
  }
}

export async function askPermission() {
  // 位置情報へのアクセス権限のステータスを確認
  const permission = await Location.getForegroundPermissionsAsync();

  // 権限が与えられていない場合のみ、権限をリクエスト
  if (permission.status !== 'granted') {
    await requestLocationPermission();
  }
}

export const getAddress = (details) => {
  // Filter the address components to find the one with the desired type
  const administrativeArea = details?.address_components?.find(component => 
    component.types.includes('administrative_area_level_1')
  );

  const prefecture = administrativeArea?.short_name || "";

  return `JP#${prefecture}`;
};



export const translations = {
  'hokkaido': '北海道',
  'aomori': '青森県',
  'iwate': '岩手県',
  'miyagi': '宮城県',
  'akita': '秋田県',
  'yamagata': '山形県',
  'fukushima': '福島県',
  'ibaraki': '茨城県',
  'tochigi': '栃木県',
  'gunma': '群馬県',
  'saitama': '埼玉県',
  'chiba': '千葉県',
  'tokyo': '東京都',
  'kanagawa': '神奈川県',
  'niigata': '新潟県',
  'toyama': '富山県',
  'ishikawa': '石川県',
  'fukui': '福井県',
  'yamanashi': '山梨県',
  'nagano': '長野県',
  'gifu': '岐阜県',
  'shizuoka': '静岡県',
  'aichi': '愛知県',
  'mie': '三重県',
  'shiga': '滋賀県',
  'kyoto': '京都府',
  'osaka': '大阪府',
  'hyogo': '兵庫県',
  'nara': '奈良県',
  'wakayama': '和歌山県',
  'tottori': '鳥取県',
  'shimane': '島根県',
  'okayama': '岡山県',
  'hiroshima': '広島県',
  'yamaguchi': '山口県',
  'tokushima': '徳島県',
  'kagawa': '香川県',
  'ehime': '愛媛県',
  'kochi': '高知県',
  'fukuoka': '福岡県',
  'saga': '佐賀県',
  'nagasaki': '長崎県',
  'kumamoto': '熊本県',
  'oita': '大分県',
  'miyazaki': '宮崎県',
  'kagoshima': '鹿児島県',
  'okinawa': '沖縄県'
};

export const convertEnglishToPrefecture = (englishName) => {
  const nameWithoutPrefecture = englishName.replace(/\s*prefecture\s*/i, '').toLowerCase();

  if (translations[nameWithoutPrefecture]) {
    return translations[nameWithoutPrefecture];
  } else {
    console.warn(`Unknown prefecture name: ${englishName}`);
    return 'Unknown';
  }
}

// 使用例
// const japaneseName = convertEnglishToPrefecture('NonexistentPrefecture');

export const getPlatform = (): Platform => {
  return RNPlatform.OS === 'ios' ? Platform.ios : Platform.android;
}