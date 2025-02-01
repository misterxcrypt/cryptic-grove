Server-Side Request Forgery (SSRF) | PortSwigger labs | Part 1
==============================================================

![Source: https://www.linkedin.com/pulse/risk-ssrf-cicd-environments-devops-aly-ragab-3pl1f/](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*GpfT_KbI3kCYoOId)

[Reference](https://medium.com/the-first-digit/server-side-request-forgery-ssrf-portswigger-labs-part-1-38772199d495?source=your_stories_page-------------------------------------) by [MrXcrypt](https://medium.com/@misterxcrypt?source=post_page---byline--38772199d495--------------------------------)

What is SSRF?
=============

Server-side request forgery is a web security vulnerability that allows an attacker to cause the server-side application to request an unintended location.

In layman's terms, SSRF is a vulnerability where an attacker tricks the server into fetching sensitive data or connecting to places it normally won’t because the server assumes the request is safe. With PortSwigger’s labs, we can safely explore and understand how SSRF vulnerabilities work in real-world scenarios. #SSRF #PortSwigger 

Types of SSRF Attacks:
======================

Open SSRF
---------

This is the more straightforward type, where the attacker immediately sees the server’s response. Open SSRF attacks can fetch data from other servers or verify responses directly, making them easier to exploit. #OpenSSRF

Blind SSRF
----------

In this, the attacker doesn’t get a direct response from the server, so they must use indirect methods to detect if the attack succeeded. This type often requires out-of-band channels like DNS logs or timing-based inference to confirm successful exploitation. #BlindSSRF 

SSRF attack vectors
===================

1.  **URL parameters:** SSRF attacks often exploit URL parameters in web applications that accept URLs to fetch data from other servers or even internal resources.
2.  **HTTP headers:** HTTP headers, such as `X-Forwarded-For` or `Host`, can also be manipulated to perform SSRF attacks, especially in applications where headers control redirection or proxy behavior.
3.  **Third-Party Integrations:** Many applications use third-party integrations to fetch content, such as integrating with external APIs, analytics tools, or cloud services. SSRF can arise if these integrations accept URLs or endpoints from user input without proper validation.

Lab 1: Basic SSRF against the local server (Apprentice)
=======================================================

**Description:** This lab has a stock check feature that fetches data from an internal system. To solve the lab, change the stock check URL to access the admin interface `http://localhost/admin` and delete the user. `carlos`. #Apprentice

![Home page of the lab](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ak5li509LrabPRxL-dmx1Q.png)

On Selecting a product, We see a button to check stock in an area.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Hgzo-sgJnhioo5EQue135Q.png)

When we are interpreting the request, we see the following:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CAoRS1HrBJIoa5df5NlqOw.png)

As we know, We can try manipulating the URL parameter ‘stockApi’. We aim to delete the user ‘Carlos’ by accessing the admin panel.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*hBDEnDLbrbbyRobB4iUEig.png)

**Payload:** [http://localhost/admin.](http://localhost/admin.) On reviewing the admin panel code, we found the endpoint to delete the user ‘Carlos’.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*OemMiYw5rIGoMVaGxxgwnA.png)

**Payload:** [http://localhost/admin/delete?username=carlos.](http://localhost/admin/delete?username=carlos.) This payload deletes the user ‘Carlos’ and solves the lab. #SSRFpayloads 

![Lab 1 solved](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v9AxLhUaZKic3vcFmtBamw.png)

Lab 2: Basic SSRF against another back-end system (Apprentice)
==============================================================

**Description:** This lab has a stock check feature that fetches data from an internal system. To solve the lab, use the stock check functionality to scan the internal `192.168.0.X` range for an admin interface on port 8080, then use it to delete the user. `carlos`.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Kb1mBOcgCC0iIbqQeVxBLw.png)

Just like the Lab 1, We got a button to check stock in an area. In this lab, the URL parameter ‘stockApi’ sends the request to a URL: [http://192.168.0.1:8080/product/stock/check?productId=1&storeId=2](http://192.168.0.1:8080/product/stock/check?productId=1&storeId=2).

According to our lab description, we need to check for an admin interface in the internal IP range 192.168.0.x on port 8080. Let’s try a basic payload.

**Payload:** [http://192.168.0.1:8080/admin](http://192.168.0.1:8080/admin)

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8dfSkGJYK51anJhc34q13g.png)

To scan all the IPs in the range 192.168.0.1–192.168.0.254. Let’s send this request to the burp intruder (Ctrl+I). Add § to the final octet of the IP address ([http://192.168.0](http://192.168.0).§3§:8080/admin). Set the numbers in Payload settings from 1 to 255, then start the attack.

**On Payload 192.168.0.152:** [http://192.168.0.152:8080/admin](http://192.168.0.1:8080/admin)

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fZxnBvl81hrg79Msv5mmCw.png)

Now, we can delete the user Carlos just like in the previous lab 1.

**Payload:** [http://](http://localhost/admin/delete?username=carlos.)192.168.0.152:8080[/admin/delete?username=carlos.](http://localhost/admin/delete?username=carlos.) This payload deletes the user ‘Carlos’ and solves the lab.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uBGFH1kqj97pEF8S9wB5dA.png)

Lab 3: Blind SSRF with out-of-band detection (Practitioner)
===========================================================

**Description:** This site uses analytics software that fetches the URL specified in the Referer header when loading a product page. To solve the lab, use this functionality to cause an HTTP request to the public Burp Collaborator server.

For this lab, we need to understand what OAST is, what Burp Collaborator is, and why we should use it. #OAST #practitioner #BurpCollaborator

OAST:
-----

**Out-of-band application security testing** (OAST) uses external servers to see otherwise invisible vulnerabilities. It was introduced to improve further the DAST (dynamic application security testing) model. Burp Collaborator is a tool for OAST. #DAST

Burp Collaborator:
------------------

Burp Collaborator is a network service that enables you **to detect invisible vulnerabilities.** These are vulnerabilities that don’t:

*   Trigger error messages.
*   Cause differences in application output.
*   Cause detectable time delays.

The general process of Burp Collaborator is:

1.  Burp Suite sends payloads to the target application in a request.
2.  The target may interact with these payloads and connect to Burp’s Collaborator server if the target has certain vulnerabilities.
3.  Burp then checks with this server to see if any interactions happened, indicating a possible vulnerability.

![Source: Portswigger (https://portswigger.net/burp/documentation/collaborator)](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*hmj-lR24SOXJEwth.png)

Our mission in this lab is to trigger a request to the Burp Collaborator. First Let’s intercept the request when a product page is loaded.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*7x1l1NZTjvxCfvDFWi7Ypg.png)

We can see that there is a URL in the Referer header. As per the description, the site uses analytics software that fetches the URL specified in the Referer header.

We can give the Burp Collaborator URL to the Referer header and see if the site interacts with the Collaborator.

For this, first send this request to the ‘Repeater’ and then go to the Burp Collaborator, and click ‘Copy to clipboard’ to copy the Collaborator URL.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*w20vNK0_-yN8tiEumlJSrg.png)

Now, Paste the copied URL in the Referer header of the request in the Repeater tab, and send the request.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Xf_0bY5DdyVcG3hBOOBH_g.png)

As this is a Blind SSRF, we won’t see any visual changes in response. Let’s go back to the Collaborator and see if any interactions occurred.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KqADaIylI0oPSww7RUqpNg.png)

If you can’t see these interactions, Click ‘Poll now’ and wait. It may take time since the server-side command is executed asynchronously.

Now You have solved the Blind SSRF lab.

Lab 4: SSRF with blacklist-based input filter (Practitioner)
============================================================

**Description:** This lab has a stock check feature that fetches data from an internal system. To solve the lab, change the stock check URL to access the admin interface `http://localhost/admin` and delete the user `carlos`. The developer has deployed two weak anti-SSRF defenses that you will need to bypass.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GvbPuMuBStLZ1cuBqcQ8jQ.png)

Just like before, We have a button to check stocks in a particular area. This request has a request ‘stockApi’ which calls a URL to check stocks.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*V-YG3L0bhCJDxJTLv2i8-A.png)

Our usual payload doesn’t work this time. Let’s try to bypass the checks.

**Payload:** http://127.1/

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3o8CruEOaQWVtteKuXCSHg.png)

127.1 is the same as 127.0.0.1. We were able to bypass one check but we get blocked again when we use ‘http://127.1/admin’.

**Payload:** [http://127.1/ADMIN](http://127.1/ADMIN)

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pCZyffMx2BFq7o9JYc3HGg.png)

The backend just checks for the word ‘admin’, so we can just bypass the check by adding uppercase letters in the payload.

**Payload:** [http://127.1/ADMIN/delete?username=carlos](http://127.0.0.1/ADMIN//delete?username=carlos). This payload deletes the user ‘Carlos’ and solves the lab.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*tTI3D0CPTD7wu3GNhro-2g.png)

> Read the next part [[SSRF Portswigger labs 2|here]].

