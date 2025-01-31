# [Cyber Analytics Repository](https://car.mitre.org/)

_The MITRE Cyber Analytics Repository (CAR) is a knowledge base of analytics developed by MITRE based on the MITRE ATT&CK_® _adversary model. CAR defines a data model that is leveraged in its pseudocode representations but also includes implementations directly targeted at specific tools (e.g., Splunk, EQL) in its analytics. With respect to coverage, CAR is focused on providing a set of validated and well-explained analytics, in particular with regards to their operating theory and rationale._

Let's Review: [CAR-2020-09-001: Scheduled Task - File Access](https://car.mitre.org/analytics/CAR-2020-09-001/).

In order to gain persistence, privilege escalation, or remote execution, an adversary may use the Windows Task Scheduler to schedule a command to be run at a specified time, date, and even host. Task Scheduler stores tasks as files in two locations - C:\\Windows\\Tasks (legacy) or C:\\Windows\\System32\\Tasks. Accordingly, ==this analytic looks for the creation of task files in these two locations.==

We have different implementations for this analytics such as Pseudo code, 
Splunk search, LogPoint Search, EQL (Event Query Language).



