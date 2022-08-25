import {Platform} from 'react-native';
import {request, Permission, PERMISSIONS} from 'react-native-permissions';

type PermsType = 'location' | 'microphone' | 'activity' | 'camera';

const permissions = {
  location: Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }),
  microphone: Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  }),
  activity: Platform.select({
    ios: PERMISSIONS.IOS.MOTION,
    android: PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
  }),
  camera: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
} as {[K in PermsType]: Permission};

export const requestAllPermissions = async () => {
  for (let key in permissions) {
    const type: PermsType = key as PermsType;
    await request(permissions[type]);
  }
};
