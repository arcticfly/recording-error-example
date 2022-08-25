import {useMemo} from 'react';
import {Platform} from 'react-native';
import {CameraDeviceFormat, useCameraDevices} from 'react-native-vision-camera';

export const FRAMES_PER_SECOND = 30;

function getFormatScore(format: CameraDeviceFormat): number {
  const maxFrameRate = format.frameRateRanges.reduce((prev, curr) => {
    if (curr.maxFrameRate > prev) return curr.maxFrameRate;
    else return prev;
  }, 0);
  const minFrameRate = format.frameRateRanges.reduce((prev, curr) => {
    if (curr.minFrameRate < prev || prev === -1) return curr.minFrameRate;
    else return prev;
  }, -1);
  // Don't use any format with a max frame rate less than FRAMES_PER_SECOND or min frame rate greater than FRAMES_PER_SECOND
  if (maxFrameRate < FRAMES_PER_SECOND || minFrameRate > FRAMES_PER_SECOND)
    return -1;

  return format.videoHeight * format.videoWidth;
}

export const useBestCameraFormat = () => {
  const ultraWideDevices = useCameraDevices('ultra-wide-angle-camera');
  const wideDevices = useCameraDevices('wide-angle-camera');
  const fallbackDevices = useCameraDevices();
  const camera =
    ultraWideDevices.back || wideDevices.back || fallbackDevices.back;

  const format = useMemo(() => {
    const formats = camera?.formats.sort(
      (prev, curr) => getFormatScore(curr) - getFormatScore(prev),
    );

    if (formats && formats.length) {
      const bestFormat = formats[0];
      // // android videoHeight and videoWidth can sometimes be switched,
      // // so we need to make sure height is always greater than width in portrait mode
      // if (
      //   Platform.OS === 'android' &&
      //   bestFormat.videoHeight < bestFormat.videoWidth
      // ) {
      //   [bestFormat.videoHeight, bestFormat.videoWidth] = [
      //     bestFormat.videoWidth,
      //     bestFormat.videoHeight,
      //   ];
      // }
      return bestFormat;
    }
  }, [camera?.formats]);

  return {camera, format};
};
