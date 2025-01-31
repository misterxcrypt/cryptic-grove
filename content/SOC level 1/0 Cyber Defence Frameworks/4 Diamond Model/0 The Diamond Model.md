## The Diamond Model of Intrusion Analysis

The [[diamond.pdf|Diamond Model]] establishes the fundamental atomic element of any intrusion activity. It has 4 core features:

- Adversary
- Infrastructure
- Capability
- Victim

The Diamond Model can help you identify the elements of an intrusion. With this, We can create Diamond Model for events such as a breach, intrusion, attack, or incident, and analyze APTs.

#### Adversary

An **adversary** is also known as an attacker, enemy, cyber threat actor, or hacker. The adversary is the person who stands behind the cyberattack. Cyberattacks can be an instruction or a breach.

It is difficult to identify an adversary during the first stages of a cyberattack. Utilizing data collected from an incident or breach, signatures, and other relevant information can help you determine who the adversary might be.

==**Adversary Operator**== is the “hacker” or person(s) conducting the intrusion activity. (Intention to perform malicious actions against cyber resources)

==**Adversary Customer**== is the entity that stands to benefit from the activity conducted in the intrusion. It may be the same person who stands behind the adversary operator, or it may be a separate person or group.

#### Victim

**Victim** – is a target of the adversary. A victim can be an organization, person, target email address, IP address, domain, etc.

==**Victim Personae**== are the people and organizations being targeted and whose assets are being attacked and exploited. These can be organization names, people’s names, industries, job roles, interests, etc.

==**Victim Assets**== are the attack surface and include the set of systems, networks, email addresses, hosts, IP addresses, social networking accounts, etc., to which the adversary will direct their capabilities.

Example: The spear-phishing email (a well-crafted email targeting a specific person of interest) was sent to the company, and someone (victim) clicked on the link. In this case, the victim is the selected target of interest for an adversary.

#### Capability

Capability is also known as the skill, tools, and techniques used by the adversary in the event. The capability highlights the adversary’s tactics, techniques, and procedures (TTPs).

==**Capability Capacity**== is all of the vulnerabilities and exposures that the individual capability can use. 

**Example:**

- Imagine a piece of malware named "TrojanX." TrojanX can:
    - Exploit SQL injection vulnerabilities
    - Bypass certain types of firewalls
    - Steal credentials from a specific email client

The Capability Capacity of TrojanX includes all these vulnerabilities and exposures it can exploit.

An ==**Adversary Arsenal**== is a set of capabilities that belong to an adversary. The combined capacities of an adversary's capabilities make it the adversary's arsenal.

**Example:**

- Consider a cybercriminal group called "DarkNet Hackers." Their arsenal includes:
    - TrojanX (with its capacity to exploit SQL injections, bypass firewalls, and steal email credentials)
    - A phishing toolkit that targets social engineering vulnerabilities
    - Ransomware that exploits outdated software vulnerabilities

The Adversary Arsenal of DarkNet Hackers is the combination of TrojanX, the phishing toolkit, and the ransomware, along with the combined capacities of each tool. This arsenal represents the full range of attacks the group can carry out.

### Infrastructure

**Infrastructure** – is also known as software or hardware. Infrastructure is the physical or logical interconnections that the adversary uses to deliver a capability or maintain control of capabilities. For example, a command and control centre (C2) and the results from the victim (data exfiltration).

The infrastructure can also be ==IP addresses, domain names, email addresses, or even a malicious USB device== found in the street that is being plugged into a workstation. 

**Type 1 Infrastructure** is the infrastructure controlled or owned by the adversary. 

**Type 2 Infrastructure** is the infrastructure controlled by an intermediary. Sometimes the intermediary might or might not be aware of it. This is the infrastructure that a victim will see as the adversary. Type 2 Infrastructure has the purpose of obfuscating the source and attribution of the activity. Type 2 Infrastructure includes malware staging servers, malicious domain names, compromised email accounts, etc.

**Service Providers** are organizations that provide services considered critical for the adversary availability of Type 1 and Type 2 Infrastructures, for example, Internet Service Providers, domain registrars, and webmail providers.