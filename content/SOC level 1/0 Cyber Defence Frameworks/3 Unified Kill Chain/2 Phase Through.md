# Network Propagation

This phase follows a successful foothold being established on the target network. An attacker would seek to gain additional access and privileges to systems and data to fulfil their goals. The attacker would set up a base on one of the systems to act as their pivot point and use it to gather information about the internal network

![[Pasted image 20240702234717.png]]

### Pivoting ([MITRE Tactic TA0008](https://attack.mitre.org/tactics/TA0008/))

After gaining access, the attacker uses the system as a staging site and tunnel between their operations and the victim’s network. It becomes a distribution point for malware and backdoors.

### Discovery ([MITRE Tactic TA0007](https://attack.mitre.org/tactics/TA0007/))

The adversary uncovers system and network information, building knowledge from user accounts, permissions, applications, web activity, files, directories, network shares, and system configurations.

### Privilege Escalation ([MITRE Tactic TA0004](https://attack.mitre.org/tactics/TA0004/))

The adversary tries to gain higher permissions using account vulnerabilities and misconfigurations, aiming for:

- SYSTEM/ROOT.
- Local Administrator.
- Admin-like user accounts.
- Specific access user accounts.

### Execution ([MITRE Tactic TA0002](https://attack.mitre.org/tactics/TA0002/))

Using the pivot system, the attacker deploys malicious code, such as remote trojans, C2 scripts, malicious links, and scheduled tasks, to maintain persistence.

### Credential Access ([MITRE Tactic TA0006](https://attack.mitre.org/tactics/TA0006/))

The adversary attempts to steal account names and passwords through keylogging and credential dumping, using legitimate credentials to avoid detection.

### Lateral Movement ([MITRE Tactic TA0008](https://attack.mitre.org/tactics/TA0008/))

With credentials and elevated privileges, the adversary moves through the network to other targeted systems, using stealthy techniques.