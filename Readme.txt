  Configure sdk path (When Environment Varable not works) - Only required for testing
      • Open local.properties file under PinIT\Andriod (If not present create one)
      • Change the Path to your installed Andriod SDK

  Run instructions for iOS:
    • cd PinIT && react-native run-ios
    - or -
    • Open PinIT\ios\PinIT.xcodeproj in Xcode or run "xed -b ios"
    • Hit the Run button

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd PinIT && react-native run-android

  Build Debug APK for Andriod
    • In your root project directory
    • Make sure if you have already directory android/app/src/main/assets/ if not there create directory after that create new file and save as index.android.bundle and put your file in like this android/app/src/main/assets/index.android.bundle
    • After run the following in cmd
      react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
      cd android && ./gradlew assembleDebug
    • Then you can get apk app/build/outputs/apk/debug/app-debug.apk
