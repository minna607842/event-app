import { EventDay, InvoiceStatus } from '../enum'
import { Event } from '../types';
import { UserSubscription } from '../types';

const today = new Date();
const thisDate = today.getDate()
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const thisDay = today.getDate();

export const getTodays = (notifications) => {
  return notifications?.filter(el => {
    const tsDate = new Date(el.ts)
    const tsYear = tsDate.getFullYear()
    const tsMonth = tsDate.getMonth() 
    const tsDay = tsDate.getDate()
    return tsYear === thisYear && tsMonth === thisMonth && tsDay === thisDay
  })
}

export const getYesterdays = (notifications) => {
  return notifications?.filter(el => {
    const tsDate = new Date(el.ts)
    const tsYear = tsDate.getFullYear()
    const tsMonth = tsDate.getMonth() 
    const tsDay = tsDate.getDate()
    return tsYear === thisYear && tsMonth === thisMonth && tsDay === thisDay - 1
  })
}

export const getThisWeeks = (notifications) => {
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const thisWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );
  return notifications?.filter(el => {
    const tsDate = new Date(el.ts);
    const tsDay = tsDate.getDate()
    return tsDate >= thisWeekStart && tsDate <= thisWeekEnd && tsDay !== thisDay && tsDay !== thisDay - 1
  })
}

export const getLastWeeks = (notifications) => {
  const lastWeekEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay()) - 7
  );
  return notifications?.filter(el => {
    const tsDate = new Date(el.ts);
    return tsDate <= lastWeekEnd;
  });
}

export const sortNewest = (notifications) => {
  if (notifications) {
    return notifications.sort((a, b) => {
      return b.ts - a.ts
    })
  }
  return [];
}

export const sortNewestMessages = (messages) => {
  if (messages) {
    return messages?.sort((a, b) => {
      return b.ts - a.ts
    })
  }
  return []
}

// epochTime: 1680068228000　→ 3月29日 14時37分 
export const getPostTimeDate = (item) => {
  const postTimeDate = new Date(item)
  const postTime = `${
    postTimeDate.getMonth() + 1
  }月${postTimeDate.getDate()}日 ${postTimeDate.getHours()}時${
    postTimeDate.getMinutes() === 0 ? '0' : ''
  }${postTimeDate.getMinutes()}分`
  return postTime
}

// epochTime: 1680068228000　→ 2:37PM
export const getAMPMHour = (epochTime: number): string => {
  const date = new Date(epochTime)
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString()
  const formattedDate = `${formattedHours}:${minutes} ${amOrPm}`
  return formattedDate
}

// epochTime: 1680068228000　→ 今日、昨日、2月1日
export const getMsgDate = (epoch: number): string => {
  const date = new Date(epoch)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()
  if (year === todayYear && month === todayMonth && day === todayDay) {
    return '今日'
  }
  if (year === todayYear && month === todayMonth && day === todayDay - 1) {
    return '昨日'
  }
  if (year === todayYear && month === todayMonth && day === todayDay + 1) {
    return '明日'
  }
  return `${month}月${day}日`
}


export const getDayOfWeek = (number: number): string => {
  const date = new Date(number).getDay().toString()
  return  [ '日', '月', '火', '水', '木', '金', '土' ][date]
}

export const getPostTime = (selectedFromYear, selectedFromMonth, selectedFromDate, selectedToH: number, selectedToM: number): number | undefined => {
  const postDay = new Date(selectedFromYear, selectedFromMonth - 1, selectedFromDate, selectedToH, selectedToM)
  const result = postDay.getTime()
  return result
}

export const getTodayTomorrow = (time: number): '今日' | '明日' | '' => {
  const today = new Date().getDate()
  const thisDay = new Date(time).getDate()
  let result
  if (today === thisDay) {
    return (result = '今日')
  }
  if (today + 1 === thisDay) {
    return (result = '明日')
  } else {
    return ''
  }
}

export const getDay = (timestamp: number): string => {
  let date = new Date(timestamp);
  let month = date.getMonth() + 1; // getMonthは0から始まるので+1をする
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${month}月${day}日${hours}時${minutes}分`
}

export const getYearDay = (timestamp: number): string => {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonthは0から始まるので+1をする
  let day = date.getDate();
  return `${year}年${month}月${day}日`
} 

export const getProgressTime = (ts: number) :string => {
  const diffTime = new Date(new Date().getTime() - ts)
  if (diffTime.getUTCFullYear() - 1970) {
    return diffTime.getUTCFullYear() - 1970 + '年前'
  } else if (diffTime.getUTCMonth()) {
    return diffTime.getUTCMonth() + 'ヶ月前'
  } else if (diffTime.getUTCDate() - 1) {
    return diffTime.getUTCDate() - 1 + '日前'
  } else if (diffTime.getUTCHours()) {
    return diffTime.getUTCHours() + '時間前'
  } else if (diffTime.getUTCMinutes()) {
    return diffTime.getUTCMinutes() + '分前'
  } else {
    return 'たった今'
  }
}

//7月2日（日曜日）明日10:4~10:4
export const getDetailDate = (selectedEvent: Event): string => {
  if (!selectedEvent || !selectedEvent.date) {
    console.error('Error: Invalid argument. Expected an event object with a date property.');
    return '';
  }

  // 現在の年と開始・終了日時の年、月、日を取得
  const currentYear = new Date().getFullYear();
  const startDate = new Date(selectedEvent.date.startTime);
  const endDate = new Date(selectedEvent.date.endTime);
  const startYear = startDate?.getFullYear();
  const endYear = endDate?.getFullYear();
  const startMonth = startDate?.getMonth() + 1;
  const startDay = startDate?.getDate();
  const endMonth = endDate?.getMonth() + 1;
  const endDay = endDate?.getDate();

  // 年が現在の年と異なる、または開始年と終了年が異なる場合にのみ年を表示
  const displayStartYear = startYear !== currentYear || startYear !== endYear ? `${startYear}年` : '';
  const displayEndYear = endYear !== currentYear || startYear !== endYear ? `${endYear}年` : '';

  // 開始日と終了日が同じ月日かどうかを確認
  const isSameDay = startYear === endYear && startMonth === endMonth && startDay === endDay;

   // 時間をフォーマット (nullの場合はデフォルト値を使用)
   const startHour = (selectedEvent.date.selectedFromH ?? 0).toString().padStart(2, '0');
   const startMinute = (selectedEvent.date.selectedFromM ?? 0).toString().padStart(2, '0');
   const endHour = (selectedEvent.date.selectedToH ?? 0).toString().padStart(2, '0');
   const endMinute = (selectedEvent.date.selectedToM ?? 0).toString().padStart(2, '0');

  // 日付と時間を組み合わせて返す
  return `${displayStartYear}${startMonth.toString().padStart(2, '0')}月${startDay.toString().padStart(2, '0')}日 (${getDayOfWeek(selectedEvent.date.startTime) || ''}曜日) ${startHour}:${startMinute}〜${isSameDay ? '' : `${displayEndYear}${endMonth.toString().padStart(2, '0')}月${endDay.toString().padStart(2, '0')}日 `}${endHour}:${endMinute}`;
}

// 2023/7/12 13:00
export const getDate = (ts: number): string => {
  const date = new Date(ts)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export const getHistoryDate = (payment: UserSubscription): string => {
  if (payment.status === InvoiceStatus.void) {
    return getDate(payment?.created || payment?.canceled_at)
  } else {
    return getDate(payment?.created * 1000 || payment?.canceled_at * 1000)
  }
}

export const formatDateValue = (fromTime, toTime) => {
  const currentYear = new Date().getFullYear();
  const formattedFromMonth = (fromTime.month || '').toString().padStart(2, '0');
  const formattedFromDate = (fromTime.date || '').toString().padStart(2, '0');
  const formattedToMonth = (toTime.month || '').toString().padStart(2, '0');
  const formattedToDate = (toTime.date || '').toString().padStart(2, '0');

  if (!fromTime.year || !toTime.year) {
    return '無効な日付';
  }

  const displayFromYear = fromTime.year !== currentYear || fromTime.year !== toTime.year ? `${fromTime.year}年` : '';
  const displayToYear = toTime.year !== currentYear || fromTime.year !== toTime.year ? `${toTime.year}年` : '';
  const sameDay = formattedFromMonth === formattedToMonth && formattedFromDate === formattedToDate;

  return `${displayFromYear}${formattedFromMonth}月${formattedFromDate}日 ${fromTime.hour}時${fromTime.minute.toString().padStart(2, '0')}分 〜 ${sameDay ? '' : `${displayToYear}${formattedToMonth}月${formattedToDate}日 `}${toTime.hour}時${toTime.minute.toString().padStart(2, '0')}分`;
}





