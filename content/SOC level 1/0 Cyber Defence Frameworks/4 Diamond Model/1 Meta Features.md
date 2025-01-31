## Meta Features

Six possible meta-features can be added to the Diamond Model (Not required).

#### Timestamp

Timestamp is the date and time of the event. Each event can be recorded with a date and time that it occurred, such as 2021-09-12 02:10:12.136.
==For example,== if the intrusion or breach happened at 3 am in the United States, it might be possible that the attack was carried out from a specific country with a different time zone and standard business hours.

#### Phases

According to the Diamond Model creators and the Axiom 4, "Every malicious activity contains two or more phases which must be successfully executed in succession to achieve the desired result."
Malicious activities occur as a series of events. 
The phases can be:   
1. Reconnaissance  
2. Weaponization  
3. Delivery  
4. Exploitation  
5. Installation  
6. Command & Control  
7. Actions on Objective

#### Result

While the results and post-conditions of an adversary’s operations will not always be known, they are helpful to capture. It is crucial to capture the results and post-conditions of an adversary's operations, but sometimes they might not always be known. The event results can be labelled as =="success," "failure," or "unknown."==

CIA Triad:
<span style="color:rgb(221, 85, 85)">Confidentiality Compromised, Integrity Compromised, and Availability Compromised.</span>

Another approach can also be documenting all of the post-conditions resulting from the event, for example, information gathered in the reconnaissance stage or successful passwords/sensitive data exfiltration.

#### Direction

This meta-feature helps describe ==host-based and network-based events== and represents the direction of the intrusion attack. The Diamond Model of Intrusion Analysis defines ==seven potential values== for this meta-feature: <span style="color:rgb(0, 112, 192)">Victim-to-Infrastructure, Infrastructure-to-Victim, Infrastructure-to-Infrastructure, Adversary-to-Infrastructure, Infrastructure-to-Adversary, Bidirectional or Unknown.</span>

#### Methodology

This meta-feature will allow an analyst to describe the general classification of intrusion, for example, phishing, DDoS, breach, port scan, etc.

#### Resources

According to the Diamond Model, every intrusion event needs one or more external resources to succeed.

Examples of the resources can include the following: 

- **Software** (e.g., operating systems, virtualization software, or Metasploit framework), 
- **Knowledge** (e.g., how to use Metasploit to execute the attack and run the exploit), 
- **Information** (e.g., a username/password to masquerade), 
- **Hardware** (e.g., servers, workstations, routers), 
- **Funds** (e.g., money to purchase domains), 
- **Facilities** (e.g., electricity or shelter), 
- **Access** (e.g., a network path from the source host to the victim and vice versa, network access from an Internet Service Provider (ISP)).

