Phone App
============

To get started
--------------


1. Start by creating an .env-file in the root of the whole project. In it put IP={your computers ip}.

2. Copy that same .env-file to the root of this folder (phone-app).

3. On your phone, install the "expo go"-app.

If not using WSL2 skip to step 6.

4. If you are using WSL2 you might have to forward your WSL2-ip to your computers ip to be able to access the app on your phone.

Here is a Windows PowerShell script to forward WSl2 traffic on port 8081 [link to script](https://gist.github.com/kendallroth/1f4871febffa0577338214f58673cc1a#file-forward_wsl2_ports-ps1).

To use the script after you've downloaded it, make a shortcut for it in windows and put in

```
powershell.exe -noexit -ExecutionPolicy Bypass -File <file_path>
```

5. Run the shortcut as administrator.

6. In project root run:

```
docker compose up
```

6. Scan the QR code with your phone.


