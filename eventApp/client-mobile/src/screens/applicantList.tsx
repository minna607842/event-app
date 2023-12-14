import React, { useEffect } from 'react'
import { useRecoilState} from 'recoil'
import * as atoms from '../lib/atoms'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { acceptUser, acceptUserNotification, denyUser, fetchUserData, sendPushNotificationFn } from '../lib/method/graphql'
import uuid from 'react-native-uuid';
const id = uuid.v4().toString();  
import { Notification, User, UserEvent } from 'shared/types'
import { NotificationType } from 'shared/enum'
import useLoading from '../lib/hooks/useLoading'
import { Applicant } from '../components'
import { Application } from '../../../shared/types/Event'
import { showToast } from '../lib/method/toast'

export default function ApplicantListScreen({ navigation }) {
  const [applicants, setApplicants] = useRecoilState(atoms.applicants)
  const [selectedEvent, setSelectedEvent] = useRecoilState(atoms.selectedEvent)
  const [events, setEvents] = useRecoilState(atoms.events)
  const [user, setUser] = useRecoilState(atoms.user)
  const { setIsLoading, loadingElement } = useLoading()
  // applicantsから特定の要素を取り除く関数
  const filterApplicants = () => {
    const acceptedUserIds = selectedEvent.applicationList.accepted.map(a => a.userId);
    const deniedUserIds = selectedEvent.applicationList.denied.map(d => d.userId);
    const updatedApplicants = applicants.filter(applicant =>
      !acceptedUserIds.includes(applicant.userId) &&
      !deniedUserIds.includes(applicant.userId)
    );
    setApplicants(updatedApplicants);
  }

  useEffect(() => {
    filterApplicants();
  }, [selectedEvent]);

  const applyNotification: Notification = {
    notificationId: id,
    userId: user.userId,
    eventId: selectedEvent.eventId,
    userName: user.userName,
    userLogo: user.userImgSrc,
    mainImgSrc: selectedEvent.mainImgSrc,
    title: selectedEvent.title,
    ts: new Date().getTime(),
    type: NotificationType.APPROVED,
  }
  
  const acceptedEvent: UserEvent = {
    eventId: selectedEvent.eventId,
    userId: selectedEvent.userId,
    title: selectedEvent.title,
    mainImgSrc: selectedEvent.mainImgSrc,
    userImgSrc: selectedEvent.userImgSrc,
    desc: selectedEvent.desc,
    locationCategory: selectedEvent.locationCategory,
    situationCategory: selectedEvent.situationCategory,
    date: selectedEvent.date,
  }

  const onAccept = async (item: Application) => {
    setIsLoading(true);
    try {
      const newInput: Application = {
        ts: new Date().getTime(),
        userName: item.userName,
        userId: item.userId,
        userImgSrc: item.userImgSrc,
        expoPushToken: item.expoPushToken,
      };

      const result = await fetchUserData(item.userId);
      if (!result || !result.data) {
        console.log("Error: fetchUserData returned null or undefined");
        return;
      }

      const fetchedUser = result.data;

      if (fetchedUser && fetchedUser.getLocal && fetchedUser.getLocal.user) {
        const acceptedUser: User = fetchedUser.getLocal.user;

        const [acceptedUserResult, notificationResult] = await Promise.all([
          acceptUser(selectedEvent, newInput),
          acceptUserNotification(acceptedUser, applyNotification, acceptedEvent, item),
        ]);

        if (!acceptedUserResult || !acceptedUserResult.data || !acceptedUserResult.data.updateLocal || !acceptedUserResult.data.updateLocal.event) {
          console.log("Error: acceptedUserResult is null or missing expected properties");
          return;
        }

        if (acceptedUser.expoPushToken) {
          const response = await sendPushNotificationFn(
            [acceptedUser.expoPushToken],
            NotificationType.APPROVED,
            selectedEvent,
            user
          );
          console.log(response);
        } else {
          console.log('Error: expoPushToken is null');
        }

        const updatedEvent = acceptedUserResult.data.updateLocal.event;
        setSelectedEvent(updatedEvent);
        setEvents(prevEvents => {
          const updatedEvents = prevEvents.map(event => {
            if (event.eventId === updatedEvent.eventId) {
              return updatedEvent;
            }
            return event;
          });
          return updatedEvents;
        });
        setUser({
          ...user,
          acceptedEvents: [...user.acceptedEvents || [], acceptedEvent],
        });
        showToast('参加許可に成功しました!');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('エラーが発生しました。もう一度やり直してください。');
    } finally {
      setIsLoading(false);
    }
  };


  const onDeny = async (item) => {
    setIsLoading(true)
    try {
      const newInput = {
        ts: new Date().getTime(),
        userName: item.userName,
        userId: item.userId,
        userImgSrc: item.userImgSrc,
      }
      const updatedEvent = await denyUser(selectedEvent, newInput);
      setSelectedEvent(updatedEvent.data.updateLocal.event);
      showToast('参加申請の取り下げに成功しました')
    } catch (error) {
      console.log('Error:', error);
      alert('エラーが発生しました。もう一度やり直してください。');
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      {loadingElement()}
      <FlatList
        data={applicants}
        className='px-4 mt-2'
        keyExtractor={item => item.ts.toString()}
        renderItem={({ item }) => (
          <Applicant
            item={item}
            onPress={() => navigation.navigate('ProfileDetail', { userId: item.userId, routeFrom: 'ApplicantList' })}
            onAccept={() => onAccept(item)}
            onDeny={() => onDeny(item)}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})