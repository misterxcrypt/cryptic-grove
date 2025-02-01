PermX Walkthrough — HackTheBox
==============================

![captionless image](https://miro.medium.com/v2/resize:fit:1388/format:webp/1*_d1GtfPjVEoaekQliy8MHg.png)

[Reference](https://medium.com/@misterxcrypt/hackthebox-walkthrough-permx-f90a1943b156?source=your_stories_page-------------------------------------) by [MrXcrypt](https://medium.com/@misterxcrypt?source=post_page---byline--f90a1943b156--------------------------------)

Introduction
============

In this write-up, We’ll go through an easy Linux machine where we first gain initial foothold by exploiting a CVE, followed by manipulating Access Control Lists (ACL) to achieve root access. #easy #linux #CVE #ACL #writeup #walkthrough #HackTheBox 

Reconnaissance 
==============

1.  After Starting the machine, I set my target IP as $target environment variable and ran nmap command. #nmap #recon 

**_Command — Port Scan: Nmap_**

```
nmap $target --top-ports=1000 -sV -v -sC  -Pn > nmap.out
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1qz0O71h3AqcbCD7VeASTA.png)

2. Then, As usual I added the host:permx.htb in /etc/hosts.

3. While enumerating the website, I started directory fuzzing and subdomain fuzzing in the background.

**_Command — Subdomain Fuzzing: Fuff_** #ffuf

```
ffuf -w /home/mrrobot/Downloads/wordlists/SecLists/Discovery/DNS/subdomains-top1million-20000.txt -u http://permx.htb/ -H "Host:FUZZ.permx.htb" -v -fw 18
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZxZdxch6UiAztb-E6oOIVg.png)

**_Command — Directory Fuzzing: Gobuster_** #gobuster

```
gobuster dir -u http://permx.htb -w /home/mrrobot/Downloads/wordlists/SecLists/Discovery/Web-Content/raft-medium-directories.txt
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*w1_sof_5FuwzQWYPSi9_8Q.png)

4. Let’s Explore the Subdomain: lms.permx.htb which seems interesting.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6llkY6QRohOwr97AhecMDw.png)

5. Using Wappalyzer, I found that the version is Chamilo version 1. #wappalyzer

6. When checking for ‘chamilo lms exploit’, I came across this link. #chamilo #lms #Exploit 

**Exploit:** [https://github.com/m3m0o/chamilo-lms-unauthenticated-big-upload-rce-poc](https://github.com/m3m0o/chamilo-lms-unauthenticated-big-upload-rce-poc)

Initial Foothold
================

1.  Learn about the exploit in this link

**Article:** [https://starlabs.sg/advisories/23/23-4220/](https://starlabs.sg/advisories/23/23-4220/)

_CVE-2023–4220 Description_
---------------------------

> _Unrestricted file upload in big file upload functionality in_ `_/main/inc/lib/javascript/bigupload/inc/bigUpload.php_` _in Chamilo LMS <= v1.11.24 allows unauthenticated attackers to perform stored cross-site scripting attacks and obtain remote code execution via uploading of web shell._

2. You can also use the knowledge from the above article to exploit this vulnerability or also you can use the above Github tool to easily to exploit it. #RemoteCodeExecution #XSS #webshell

3. I used the PHP reverse shell from PentestMonkey to craft a reverse shell and followed the PoC (Proof of Concept) in that article to get a reverse shell. #php #ReverseShell #CVE-2023-4220 #POC

**PHP Reverse Shell:** [https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php)
#phpreverseshell
**Exploit:**
------------
#exploitation
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*FFq34KXpgmeGFag__UJiCA.png)

**Reverse Shell Listener:**
---------------------------

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_5-duRzHfVPo2slKc57evA.png)

**_Command — Spawn Bash shell: python one-liner_**

```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

1.  The above command will spawn the bash shell which is more stable.
2.  Now, as a www-data user, We don’t have much permission.

Lateral Movement
================

i. User Flag
============

1.  After checking what files are available in the system. I thought of finding files which are owned by ’www-data’

**_Command — Files owned by a user: find_** #find #userflag

```
find / -user www-data 2>/dev/null | grep -v '/proc\|/run\|/var/www'
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_5-duRzHfVPo2slKc57evA.png)

2. I tried running linpeas, but nothing interesting turned out. But I found an interesting file ‘configuration.php’. #linpeas

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ud8ITcmFvOv9Oi2SUIu3Pw.png)

3. So I ran a find command to check for any other ‘configuration.php’ file in chamilo application.

**_Command — Finding config file: find_**

```
find / -name configuation.php 2>/dev/null
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*No--SpCl_unGnuI1VS4gPQ.png)

4. Upon opening the file ‘/var/www/chamilo/app/config/configuration.php’, I found the ‘database connection settings’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RhEtJK3nFQalBMGeU1nPhA.png)

5. There are two users in this system. We can find this using the following command:

**_Command — Finding users: /etc/passwd_**

```
cat /etc/passwd | grep
```
![captionless image](https://miro.medium.com/v2/resize:fit:1294/format:webp/1*Vng6EC-FQUCHl_XS8bqB7Q.png)

6. Let’s try ssh using the password from the configuration file.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5CEfMgKqbOnxIIeiOGx_Zw.png)

ii. Root Flag
=============

1.  Now, We have a low privileged user access. First run the usual command to find the sudo privileged files. #rootflag #PrivilegeEscalation

**_Command — Sudo Privileged files: sudo_** #sudo

```
sudo -l
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IBO9k4iwXcoUR_EPokq7Mw.png)

2. Let’s read the contents of the file ‘/opt/acl.sh’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*JuJOrYCimPsqX_AHJsGKiw.png)

3. Understand the script and it’s functionality.

**Things to Note**
------------------

> _This script uses_ `_sudo setfacl_` _to assign the specified permissions to the given user._
> 
> _$1: user — the user for whom ACL permissions will be set.
> $2: perm — the permissions (e.g., rwx).
> $3: file — the file on which permissions will be set._
> 
> The script gets three arguments: user, permission, target file.
> 
> We can use this script to modify permissions of any file which is in the home directory of user ‘mtz’.
> 
> If we able to link any important to a file in the home directory of mtz, we can change the permission using the /opt/acl.sh script.

**_Command — Symbolic link: ln_** #ln

```
ln -s /etc/passwd /home/mtz/passwd1
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uDjISkF0rd06kyI2n3PBBQ.png)

4. This command creates a symbolic link of the ‘/etc/passwd’ file to a file ‘/home/mtz/passwd1’.

5. Since this symbolic file is in the home directory of the user ‘mtz’, we can change the permission of the file using the available script ‘/opt/acl.sh’.

**_Command — Using the script: /opt/ach.sh_**

```
sudo /opt/acl.sh mtz rwx /home/mtz/passwd1
```

6. This command changes the permission of the symbolic file /home/mtz/passwd1.

7. Now, We can just delete the password of the root and change the user to ‘root’.

8. We just deleted the ‘x’ in `root:x:0:0:root:/root:/bin/bash`. It will delete the password of the root.

9. Then we can use the command `su root` to become root.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7VBlRq4SidDsjXSbJ7_e7g.png)

Now, We are ROOT! Thanks for Reading. Happy hacking!!

