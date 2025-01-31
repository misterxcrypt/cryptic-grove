# [Pyramid of Pain](https://socradar.io/re-examining-the-pyramid-of-pain-to-use-cyber-threat-intelligence-more-effectively/)

The **Pyramid of Pain** is a concept created by David Bianco to describe the difficulty and impact of using different types of indicators to detect and respond to cyber threats. The pyramid is divided into six levels, each representing a different type of indicator, from the easiest to the most challenging to obtain and use effectively. Understanding these levels helps analysts prioritize their efforts and improve their detection and response strategies.

> [!quotation] David Blanco states, "_**the amount of pain you cause an adversary depends on the types of indicators you are able to make use of**_". #quote 

## Levels of the Pyramid:

1. [[1 Hash Values (Trivial)|Hash Values]]
    - **Description**: Unique identifiers for specific files or pieces of data.
    - **Difficulty**: Low. These can be easily obtained and matched against known malicious files.
    - **Impact**: Low. Attackers can easily change files to avoid detection.
2. [[2 IP Address (Easy)|IP Address]]
    - **Description**: Numerical labels as signed to devices connected to a network.
    - **Difficulty**: Low. IP addresses can be easily identified and blocked.
    - **Impact**: Low. Attackers can switch IP addresses to evade detection.
4. [[3 Domain Names (Simple)|Domain Names]]
    - **Description**: Names used to identify and access websites.
    - **Difficulty**: Low. Domains can be easily listed and blocked.
    - **Impact**: Low. Attackers can frequently change domains.
5. [[4 Host Artifacts (Annoying)|Network/Host Artifacts]]
    - **Description**: Evidence left on the network or host systems, such as log entries or configuration changes.
    - **Difficulty**: Moderate. Requires monitoring and analyzing network and host data.
    - **Impact**: Moderate. Attackers need to change their tools or techniques to avoid leaving artifacts.
6. [[5 Tools (Challenging)|Tools]]
    - **Description**: Software or scripts used by attackers to perform their actions.
    - **Difficulty**: Moderate. Identifying and blocking tools requires deeper analysis.
    - **Impact**: Moderate. Attackers need to find or develop new tools to continue their operations.
8. [[6 TTPs (Tough)|Tactics, Techniques, and Procedures (TTPs)]]
    - **Description**: The methods and patterns used by attackers to achieve their objectives.
    - **Difficulty**: High. Understanding TTPs requires comprehensive threat intelligence and analysis.
    - **Impact**: High. Attackers must significantly alter their behavior and approach to evade detection when their TTPs are understood and countered.

## Summary

The Pyramid of Pain highlights that while low-level indicators (like hash values and IP addresses) are easier to detect and block, they are also easier for attackers to change. Higher-level indicators (like TTPs) are more challenging to identify but provide more effective and long-lasting defense capabilities when understood and mitigated.