# Tools

At this stage, Most of the attackers will give up. Because they would need to go back and create another tool that serves the same purpose. Investing money in the new tool, finding new tools with same potential or even gets some training to learn how to be proficient in a certain tool.

Software used by the adversary to accomplish their mission.  Mostly this will be things they bring with them. This would include utilities designed to create malicious documents for spear phishing, backdoors used to establish C2 or password crackers or other host-based utilities they may want to use post-compromise.

Ex: A Trojan dropped the suspicious "Stealer.exe" in the Temp folder:
![[Pasted image 20240628005210.png]]

[MalwareBazaar](https://bazaar.abuse.ch/) and [Malshare](https://malshare.com/) are good resources to provide you with access to the samples, malicious feeds, and YARA results - these all can be very helpful when it comes to threat hunting and incident response.

For detection rules, [SOC Prime Threat Detection Marketplace](https://tdm.socprime.com/) is a great platform, where security professionals share their detection rules for different kinds of threats including the latest CVE's that are being exploited in the wild by adversaries.

> [!defense] Fuzzy Hashing #defense
> **|  Context triggered piecewise hashes** 
> 
> Fuzzy hashing is also a strong weapon against the attacker's tools. Fuzzy hashing helps you to perform similarity analysis - match two files with minor differences based on the fuzzy hash values. One of the examples of fuzzy hashing is the usage of [SSDeep](https://ssdeep-project.github.io/ssdeep/index.html)

