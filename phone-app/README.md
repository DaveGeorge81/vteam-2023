Phone App
============

To get started
--------------


1. In "phone-app" directory, make sure you have all dependencies installed.

```
npm install
```

If you are not using WSL and just want to try the app on your phone skip to step 8.

2. Install [Android studio] (https://developer.android.com/studio)
You can ignore the "disable windows hyper-v" warning, we are only using the Android emulator.

3. Boot up Android Studio and click on "More Actions" and select "Virtual Device Manager".

4. (Optional) Create a new device, I chose a Pixel 7 with Android 11 (api 30). But you could probably use the default device.

5. Boot up your device and then close Android Studio.

If you are using WSL you need to do step 6 and 7 to get the Android emulator to work with WSL.

6. Copy the bash script below and replace "user" with your Windows username.

```
echo -e "\n# Android\nexport ANDROID_HOME=/mnt/c/Users/<user>/AppData/Local/Android/Sdk\nexport WSLENV=ANDROID_HOME/p" >> $HOME/.bashrc && source $HOME/.bashrc
```

7. Paste and run the script in your Ubuntu terminal to get your Android emulator to work with WSL. 

8. Start expo client.

```
npm start
```

9. (Optional) If not on WSL you can view the app directly on your phone (Android and iOS). Download Expo Go from you phones app-store. Scan the QR-code to boot the app.

10. Press "a" to launch the app onto your Android Emulator. First time it will install the Expo Go app then you should be good to go.
