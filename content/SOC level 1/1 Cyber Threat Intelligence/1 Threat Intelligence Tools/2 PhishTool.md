# PhishTool


> [!tool] PhishTool #tool
> [PhishTool](https://www.phishtool.com) seeks to elevate the perception of phishing as a severe form of attack and provide a responsive means of email security. Through email analysis, security analysts can uncover email IOCs, prevent breaches and provide forensic reports that could be used in phishing containment and training engagements.

The core features include:

- **Perform email analysis:** PhishTool retrieves metadata from phishing emails and provides analysts with the relevant explanations and capabilities to follow the email’s actions, attachments, and URLs to triage the situation.
- **Heuristic intelligence:** OSINT is baked into the tool to provide analysts with the intelligence needed to stay ahead of persistent attacks and understand what TTPs were used to evade security controls and allow the adversary to social engineer a target.
- **Classification and reporting:** Phishing email classifications are conducted to allow analysts to take action quickly. Additionally, reports can be generated to provide a forensic record that can be shared.

### Analysis Tab

Once uploaded, we are presented with the details of our email for a more in-depth look. Here, we have the following tabs:

- **Headers:** Provides the routing information of the email, such as source and destination email addresses, Originating IP and DNS addresses and Timestamp.
- **Received Lines:** Details on the email traversal process across various SMTP servers for tracing purposes.
- **X-headers:** These are extension headers added by the recipient mailbox to provide additional information about the email.
- **Security:** Details on email security frameworks and policies such as Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM) and Domain-based Message Authentication, Reporting and Conformance (DMARC).
- **Attachments:** Lists any file attachments found in the email.
- **Message URLs:** Associated external URLs found in the email will be found here.