# Installation

The backdoor lets an attacker bypass security measures and hide the access. A backdoor is also known as an access point.

==Scenario :-== Once the attacker gets access to the system, he would want to reaccess the system if he loses the connection to it or if he got detected and got the initial access removed, or if the system is later patched. He will no longer have access to it. That is when the attacker needs to install a **[persistent backdoor](https://www.offensive-security.com/metasploit-unleashed/persistent-backdoors/).** A persistent backdoor will let the attacker access the system he compromised in the past.

## Persistence Methods:

1. Installing a **web shell** on the webserver
2. Installing a backdoor on the victim's machine
3. Creating or modifying Windows services
4. Adding the entry to the "run keys" for the malicious payload in the Registry or the Startup Folder


> [!attack] Timestomping #attack 
> **[Timestomping](https://attack.mitre.org/techniques/T1070/006/)** technique to avoid detection by the forensic investigator and also to make the malware appear as a part of a legitimate program. The Timestomping technique lets an attacker modify the file's timestamps, including the modify, access, create and change times.


