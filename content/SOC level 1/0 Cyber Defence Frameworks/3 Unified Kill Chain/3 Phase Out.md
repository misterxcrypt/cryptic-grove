# Action On Objectives

This phase wraps up the journey of an adversary’s attack on an environment, where they have critical asset access and can fulfil their attack goals. These goals are usually geared toward compromising the confidentiality, integrity and availability (CIA) triad.

![[Pasted image 20240702235837.png]]

### Collection [MITRE Tactic (TA0009)](https://attack.mitre.org/tactics/TA0009/)

The adversary gathers valuable data, compromising ==confidentiality==. Target sources include drives, browsers, audio, video, and email.

### Exfiltration ([MITRE Tactic TA0010](https://attack.mitre.org/tactics/TA0010/))

The adversary steals data, using encryption and compression to avoid detection. The C2 channel and tunnel from earlier phases are used.

### Impact ([MITRE Tactic TA0040](https://attack.mitre.org/tactics/TA0040/))

To compromise data ==integrity and availability==, the adversary may manipulate, interrupt, or destroy assets, disrupting business operations. This may involve account removal, disk wipes, ransomware, defacement, and DoS attacks.

### Objectives

The adversary seeks to achieve their strategic goal, such as encrypting files for ransom or releasing private information to damage the business's reputation.