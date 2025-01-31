# Intro to CTI

Cyber Threat Intelligence (CTI) can be defined as evidence-based knowledge about adversaries, including their indicators, tactics, motivations, and actionable advice against them. These can be utilised to protect critical assets and inform cyber security teams and management business decisions.

As security analysts, CTI is vital for investigating and reporting against adversary attacks with organisational stakeholders and external communities.

Cyber Threat Intelligence is typically a managerial mystery to handle, with organisations battling with how to input, digest, analyse and present threat data in a way that will make sense. So Platforms like [[OpenCTI]] comes into play to aid in manage CTI through storage, analysis, visualisation and presentation of malware, IOCs, threat campaigns.

## Cyber Threat Intelligence Module

- [Threat Intelligence Tools](https://tryhackme.com/room/threatinteltools)
- [YARA](https://tryhackme.com/room/yara)
- [OpenCTI](https://tryhackme.com/room/opencti)
- [MISP](https://tryhackme.com/room/misp)

==**Data==:** Discrete indicators associated with an adversary, such as IP addresses, URLs or hashes.

==**Information==:** A combination of multiple data points that answer questions such as “How many times have employees accessed example.com within the month?”

**==Intelligence==:** The correlation of data and information to extract patterns of actions based on contextual analysis.

### Questions:

- Who’s attacking you?
- What are their motivations?
- What are their capabilities?
- What artefacts and indicators of compromise (IOCs) should you look out for?

## Categories of Threat Intelligence

- **Internal:**
    - Corporate security events such as vulnerability assessments and incident response reports.
    - Cyber awareness training reports.
    - System logs and events.
- **Community:**
    - Open web forums.
    - Dark web communities for cybercriminals.
- **External**
    - Threat intel feeds (Commercial & Open-source)
    - Online marketplaces.
    - Public sources include government data, publications, social media, financial and industrial assessments.

## Threat Intel Classification

Threat Intel is geared towards understanding the relationship between your operational environment and your adversary. With this in mind, we can break down threat intel into the following classifications: 

- ###### **Strategic Intel:** 
- High-level intel that looks into the organisation’s threat landscape and maps out the risk areas based on trends, patterns and emerging threats that may impact business decisions.
    
- ###### **Technical Intel:** 
- Looks into evidence and artefacts of attack used by an adversary. Incident Response teams can use this intel to create a baseline attack surface to analyse and develop defence mechanisms.
    
- ###### **Tactical Intel:** 
- Assesses adversaries’ tactics, techniques, and procedures (TTPs). This intel can strengthen security controls and address vulnerabilities through real-time investigations.
    
- ###### **Operational Intel:** 
- Looks into an adversary’s specific motives and intent to perform an attack. Security teams may use this intel to understand the critical assets available in the organisation (people, processes and technologies) that may be targeted.