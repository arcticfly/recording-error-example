import {Platform} from 'react-native';
import {request, Permission, PERMISSIONS} from 'react-native-permissions';

type PermsType = 'microphone' | 'camera';

const permissions = {
  //   microphone: Platform.select({
  //     ios: PERMISSIONS.IOS.MICROPHONE,
  //     android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  //   }),
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
