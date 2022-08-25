/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ToastAndroid, StatusBar} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {requestAllPermissions} from './src/Permissions';

import {
  FRAMES_PER_SECOND,
  useBestCameraFormat,
} from './src/useBestCameraFormat';

enum CaptureStatus {
  AWAITING_PERMISSIONS = 'AWAITING_PERMISSIONS',
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
}

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const App = () => {
  const cameraRef = React.useRef<Camera>(null);

  const [captureStatus, setCaptureStatus] = React.useState<CaptureStatus>(
    CaptureStatus.AWAITING_PERMISSIONS,
  );

  useEffect(() => {
    const ensurePermissions = async () => {
      await requestAllPermissions();
      setCaptureStatus(CaptureStatus.IDLE);
    };
    ensurePermissions();
  }, []);

  useEffect(() => {
    if (captureStatus === CaptureStatus.IDLE) {
      setTimeout(() => {
        cameraRef.current?.startRecording({
          onRecordingFinished: videoFile => {
            console.log('recording succeeded');
            showToast('saved video to ' + videoFile.path);
            setCaptureStatus(CaptureStatus.IDLE);
          },
          onRecordingError(err) {
            console.log('recording failed');
            showToast('Error recording video' + err);
            console.log(err);
            setCaptureStatus(CaptureStatus.IDLE);
          },
        });
        setCaptureStatus(CaptureStatus.RECORDING);
      }, 5000);
    }
    if (captureStatus === CaptureStatus.RECORDING) {
      setTimeout(() => {
        cameraRef.current?.stopRecording();
      }, 3000);
    }
  }, [captureStatus]);

  const {camera, format} = useBestCameraFormat();

  if (!camera || !format) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={{...camera, neutralZoom: camera.minZoom}}
        format={format}
        fps={FRAMES_PER_SECOND}
        isActive={true}
        video={true}
        audio={false}
        zoom={0}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 24}}>{captureStatus}</Text>
      </View>
    </View>
  );
};

export default App;
