Phone App
============
Known issues:
--------------
As of right now it's not possible to install the app on your Android emulator with WSL2 through Docker. The current solution to this is to install it
locally with

```
npm install
```
in the phone-app directory without docker.

Then run 

```
npx expo run:android
```

to install the expo-phone-app on your Android Emulator.

Note:
To be able to use the map you need to provide your own GoogleMaps api-key and place it in app.json where it says "YOUR API-KEY HERE".


To get started
--------------

Note: Currently this app is only developed to function on Android. In theory it should work on iOS with a few adjustments but we have no means to try it in an iOS simulator.
It is therefore highly recommended to use an Android emulator like Android Studio.

1. Start by creating an .env-file in the root of the whole project. In it put IP={your computers ip}.

2. Copy that same .env-file to the root of this folder (phone-app).

If not using WSL2 skip to step 5.

3. If you are using WSL2 you might have to forward your WSL2-ip to your computers ip to be able to access the app on your phone.

Here is a Windows PowerShell script to forward WSl2 traffic on port 8081 [link to script](https://gist.github.com/kendallroth/1f4871febffa0577338214f58673cc1a#file-forward_wsl2_ports-ps1).
(not made by us so use at own risk).

To use the script after you've downloaded it, make a shortcut for it in windows and put in

```
powershell.exe -noexit -ExecutionPolicy Bypass -File <file_path>
```

4. Run the shortcut as administrator.

5. Start up your Android Emulator.


6. In project root run:

```
docker compose up
```

7. Open the app (named phone-app) on your Android emulator and connect to your computers IP-address.

If any errors occur, try running 
```
docker compose build phone
```
first.




