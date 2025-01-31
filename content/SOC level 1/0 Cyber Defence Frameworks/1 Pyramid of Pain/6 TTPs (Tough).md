# Tactics, Techniques & Procedures

This includes the whole [MITRE](https://attack.mitre.org/) ATT&CK Matrix, which means all the steps taken by an adversary to achieve his goal, starting from phishing attempts to persistence and data exfiltration.

> [!Link] Actual TTP of APT40 Actor by CISA #note
> https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-200a

## Consequences

If you can ==detect and respond to the TTPs== quickly, you leave the adversaries almost no chance to fight back. For, example if you could detect a [Pass-the-Hash](https://www.beyondtrust.com/resources/glossary/pass-the-hash-pth-attack) attack using Windows Event Log Monitoring and remediate it, you would be able to ==find the compromised host very quickly and stop the lateral movement inside your network==. At this point, the attacker would have two options:

1. Go back, do more research and training, reconfigure their custom tools
2. Give up and find another target