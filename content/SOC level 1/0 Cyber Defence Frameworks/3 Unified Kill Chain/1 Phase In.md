# Initial Foothold

An attacker will employ numerous tactics to investigate the system for potential vulnerabilities that can be exploited to gain a foothold in the system. For example, a common tactic is the use of ==reconnaissance== against a system to discover potential attack vectors (such as applications and services).

![[Pasted image 20240702233621.png]]

### Reconnaissance ([MITRE Tactic TA0043](https://attack.mitre.org/tactics/TA0043/))

This phase describes techniques for gathering information on a target through passive and active reconnaissance, used in later UKC stages.

Information gathered includes:

- Discovering systems and services on the target, aiding weaponization and exploitation.
- Finding contact lists or employees for social engineering or phishing.
- Looking for credentials useful for pivoting or initial access.
- Understanding network topology and networked systems for pivoting.

### Weaponization ([MITRE Tactic TA0001](https://attack.mitre.org/tactics/TA0001/))

This phase involves setting up infrastructure for the attack, such as command and control servers or systems for catching reverse shells and delivering payloads.

### Social Engineering ([MITRE Tactic TA0001](https://attack.mitre.org/tactics/TA0001/))

This phase involves manipulating employees to aid the attack, such as:

- Getting a user to open a malicious attachment.
- Impersonating a webpage to capture credentials.
- Impersonating a user to request a password reset or gain access.

### Exploitation ([MITRE Tactic TA0002](https://attack.mitre.org/tactics/TA0002/))

This phase involves taking advantage of system vulnerabilities for code execution, such as:

- Uploading and executing a reverse shell.
- Interfering with scripts to execute code.
- Abusing web application vulnerabilities to execute code.

### Persistence ([MITRE Tactic TA0003](https://attack.mitre.org/tactics/TA0003/))

This phase involves maintaining access to a system, such as:

- Creating a service for regaining access.
- Adding the system to a Command & Control server.
- Leaving backdoors that execute with certain actions.

### Defence Evasion ([MITRE Tactic TA0005](https://attack.mitre.org/tactics/TA0005/))

This phase covers techniques for evading defensive measures, such as:

- Web application firewalls.
- Network firewalls.
- Anti-virus systems.
- Intrusion detection systems.

This helps analyze attacks and improve defenses.

### Command & Control ([MITRE Tactic TA0011](https://attack.mitre.org/tactics/TA0011/))

This phase involves establishing communication between the adversary and target system to:

- Execute commands.
- Steal data and credentials.
- Use the controlled server to pivot to other systems.

### Pivoting ([MITRE Tactic TA0008](https://attack.mitre.org/tactics/TA0008/))

Pivoting involves reaching otherwise inaccessible systems within a network, often containing valuable data or weaker security.

