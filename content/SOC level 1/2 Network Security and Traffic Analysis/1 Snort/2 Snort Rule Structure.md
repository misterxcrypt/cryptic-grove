# Snort Rule

![[Pasted image 20241224143541.png]]

Each rule should have a type of **action**, **protocol**, **source** and **destination IP**, **source** and **destination port** and an **option**. Snort is in passive mode by default. So most of the time, we will use Snort as an IDS. We will need to start “inline mode” to turn on IPS mode. But before we start playing with inline mode, let’ s familiarize ourselves with Snort features and rules.

The **Rule Header** is **required** and a rule will not work without it. Meanwhile, the **Rule Options** are “**optional**”. But we will see later that some attacks are detected by using the rule options.

**Action:** The most common actions are listed below.

- **alert**: Generate an alert and log the packet.
- **log**: Log the packet.
- **drop**: Block and log the packet.
- **reject**: Block the packet, log it and terminate the packet session.

**Protocol :** Snort2 supports only four protocols filters in the rules (IP, TCP, UDP and ICMP). However, we can detect the application (like ftp, or ssh) flows using port numbers (21, 22, 23, etc)and options by investigating TCP traffic.

## **IP and Port Numbers**

![[Pasted image 20241224145346.png]]

## **Direction**

The direction operator indicates the traffic flow to be filtered by Snort. The left side of the rule shows the source, and the right side shows the destination.

- **>** Source to destination flow.
- **<>** Bidirectional flow

**Note** that there is **no “<-”** operator in Snort.

![[Pasted image 20241224145210.png]]

**Three main rule options in Snort;**

- General Rule Options - Fundamental rule options for Snort.
- Payload Rule Options - Rule options that help to investigate the payload data. These options are helpful to detect specific payload patterns.
- Non-Payload Rule Options - Rule options that focus on non-payload data. These options will help create specific patterns and identify network issues.

### General Rule Options

![[Pasted image 20241224145254.png]]

## **Payload Detection Rule Options**

![[Pasted image 20241224145438.png]]

## Non-Payload Detection Rule Options

![[Pasted image 20241224145503.png]]

**Remember**, once you create a rule, it is a local rule and should be in your “local.rules” file. This file is located under “**/etc/snort/rules/local.rules**”. A quick reminder on how to edit your local rules is shown below.

```
sudo gedit /etc/snort/rules/local.rules
```