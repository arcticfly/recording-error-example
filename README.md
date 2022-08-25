This repo contains an extremely simple react native recording app that:

1. Requests camera permissions
2. Waits 5 seconds then starts recording
3. Waits 3 seconds then stops recording
4. Repeats steps 2 and 3 indefinitely

This repo was created to demonstrate a bug in [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera) that results in videos failing to record after the camera has started and stopped recording some number of times (usually more than 30 in this simplified version, but sometimes less than 10 when the camera is running in simultaneously with other processes). The error looks like this:

```json
{
    "cause": {
        "message": "[capture/no-valid-data] The recording failed because no valid data was produced to be recorded.
            This error is generated when the essential data for a recording to be played correctly is missing, for example, a recording must contain at least one key frame. The application will need to clean up the output file, such as deleting the file.",
        "stacktrace": "com.mrousavy.camera.NoValidDataError: [capture/no-valid-data] The recording failed because no valid data was produced to be recorded.
            This error is generated when the essential data for a recording to be played correctly is missing, for example, a recording must contain at least one key frame. The application will need to clean up the output file, such as deleting the file.
                at com.mrousavy.camera.CameraView_RecordVideoKt$startRecording$1.accept(CameraView+RecordVideo.kt:62)
                at com.mrousavy.camera.CameraView_RecordVideoKt$startRecording$1.accept(CameraView+RecordVideo.kt:52)
                at androidx.camera.video.Recorder$RecordingRecord.lambda$updateVideoRecordEvent$6$androidx-camera-video-Recorder$RecordingRecord(Recorder.java:2624)
                at androidx.camera.video.Recorder$RecordingRecord$$ExternalSyntheticLambda6.run(Unknown Source:4)
                at android.os.Handler.handleCallback(Handler.java:942)
                at android.os.Handler.dispatchMessage(Handler.java:99)
                at android.os.Looper.loopOnce(Looper.java:201)
                at android.os.Looper.loop(Looper.java:288)
                at android.app.ActivityThread.main(ActivityThread.java:7898)
                at java.lang.reflect.Method.invoke(Native Method)
                at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:548)
                at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:936)"
    },
    "code": "capture/no-valid-data",
    "message": "[capture/no-valid-data] The recording failed because no valid data was produced to be recorded. This error is generated when the essential data for a recording to be played correctly is missing, for example, a recording must contain at least one key frame. The application will need to clean up the output file, such as deleting the file.",
    "userInfo": null
}
```
