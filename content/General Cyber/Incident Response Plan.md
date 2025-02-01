# **SANS Incident Response Framework**

The SANS framework divides the incident response process into six phases:

1. **Preparation**
2. **Identification**
3. **Containment**
4. **Eradication**
5. **Recovery**

# Assignment

You are a cybersecurity analyst at a mid-sized e-commerce company. The company recently detected suspicious activity on its payment gateway servers. A preliminary investigation revealed the following:

- Multiple failed login attempts from a single IP address.
- An unusually high volume of traffic during non-business hours.
- Several customer complaints about unauthorized transactions on their credit cards.
- Logs indicating an outdated software version running on the server.

Your task is to assess the situation, outline your response, and address specific questions related to the **Incident Response Process (IRP)**.

---

1. **Containment Strategy :** Describe a step-by-step containment strategy to prevent further unauthorized transactions while ensuring minimal disruption to legitimate customers. How would you balance security and availability?
2. **Log Analysis :** Which specific log entries would you prioritize in identifying how the attacker exploited the outdated software? Suggest at least three critical patterns or indicators you would search for in the logs.
3. **Tool Selection :** Given the scenario, which tools or techniques would you recommend to monitor traffic for similar attacks in real-time? Provide reasoning for your choice.
4. **Impact Assessment :** Draft a concise impact assessment section for your incident report, addressing the financial, operational, and reputational risks posed by this incident.
5. **Customer Communication :** Write a sample email or notification message to affected customers, informing them about the unauthorized transactions and reassuring them of the steps being taken to address the issue.
6. **Post-Incident Recommendations :** Outline three specific security controls or policies you would recommend to prevent a recurrence of this incident. Provide brief justifications for each recommendation."

# Solution

I am a mid-sized e-commerce company's cybersecurity analyst. As such, I will apply the SANS Incident Response Framework in responding to this incident. The SANS framework will help contain the threat while identifying the root cause for prevention in the future.

## Incident Response Plan

### 1. Preparation

The organization should have an **Incident Response Policy** in place, outlining roles, responsibilities, and communication protocols. While this step is proactive, it ensures that our team is ready to act decisively.

### 2. Identification

Let’s assess the nature of the incident based on the evidence provided:

- Indicators:
    - Multiple failed login attempts from a single IP suggest potential brute force or credential stuffing attacks.
- High traffic during non-business hours could indicate bot activity.
    - Unauthorized credit card transactions imply potential compromise of payment systems or data leaks.
    - Outdated software logs indicate a possible exploitation of known vulnerabilities.
- Immediate Action:
    - Activate the Incident Response Team.
    - Identify and categorize the nature of the incident (For example, data breach, system compromise)

### 3. Containment

Tactical Containment Actions:

1. Isolate Involved Systems:
    - Isolate the payment gateway in order to prevent additional unauthorized transactions
    - Block the suspicious IP address at the firewall or through Web Application Firewall (WAF) rules
2. Divert Valid Traffic:
    - Configure a secure, updated backup payment gateway to handle customer transactions, minimizing disruption.
3. Secure the Environment:
    - Disable the outdated software to prevent exploitation.
    - Review all access controls to critical systems, ensuring no further unauthorized access.

Monitoring:

- Enable network traffic monitoring to detect additional threats in real time.

### 4. Eradication

- Root Cause Analysis: Analyze server logs, payment gateway code, and user activity to determine how the hacker gained access to the system.
- Patch and Update: Update the outdated software with the latest version.
- Credential Reset: Force any accounts that might have been compromised to reset their password.
- Remove Malicious Artifacts: Scan and remove any malware or unauthorized scripts installed on the server.

### 5. Recovery

- System Validation: Penetration test the payment system before its activation.
- Gradual Reconnection: Activate services in a controlled manner and monitor for anomalies.
- User Verification: Validate all user accounts and transactions performed during the period affected by the breach.

## Action Undertaken

### **1. Containment Strategy**

Step-by-Step Plan:

1. Immediate Actions:
    - Block the Suspected IP: Put up in the firewall to block that ip which had multiple login failure cases.
    - Enable Payment Gateway Limits: Set limits for time periods, like when all the strange traffic came through- probably outside of business hours.
2. Temporary Isolation
    - Isolate Outdated Applications: Immediately cut off the old application or payment gateway from the network to prevent further exploitation. Deploy a Temporary Payment Proxy: Route legitimate traffic through a secure, updated backup system to ensure service availability to customers.
3. Keep the Communication Channels Open:
    - Alert internal teams such as customer support and IT, regarding potential disruptions and customer handling protocols that need updation.
4. Monitoring Security:
    - Utilize a real-time monitoring tool to scan through the current traffic and find any other anomalies.
5. Verification
    - Test the temporary system setup to ensure functionality and security before re-establishing full operations.

### **2. Log Analysis**

To identify how the attacker exploited the outdated software, We need to focus on the below log patterns:

1. **Failed Login Attempts:**
    - Analyze repeated failed logins to identify brute force or credential stuffing attacks.
    - Timestamps can be utilized to identify the usage of bots for brute force attacks.
    - Key fields are timestamps, source IP, and user-agent strings.
2. **Unauthorized Transactions:**
    - Analyze transactions marked as unauthorized by customers, correlating with time, IP address, and user-agent.
    - This will identify patterns or anomalies that could reveal how the attacker accessed the system.

### 3. **Tool Selection**

Recommended Tools:

1. **Network Traffic Analysis:** Wireshark for packet-level traffic inspection to detect suspicious activity.
    - **Reason:** It provides granular insights into traffic patterns and potential exploit attempts.
2. **SIEM Solution:** Splunk or Elastic Security to centralize and correlate log data for anomalies.
    - **Reason:** Such tools are available with advanced features of real-time alerting as well as anomaly detection.
3. **Vulnerability Scanners:** Using Nessus or Qualys on the payment server and the network for the identification of not patched vulnerabilities.
    - **Reason:** Helps eliminate vulnerability risks by identifying older software

### 4. Impact Analysis

**Incident Summary:** Unprotected access to the payment gateway led to fraudulent transactions based on the security vulnerability attributed to old software.

**Financial Impact:**

- Loss in financial terms due to chargeback on unauthorized transactions.
- Incidence response activities in the form of containment, remediation, and customer support.

**Operational Impact:**

- Disrupted payment processing for the actual customers during the temporary downtime of containment.
- Allocation of resources for the purpose of investigation and recovery.

**Reputational Impact:**

- Customers would lose trust due to their financial data being compromised.
- Negative publicity, affecting the brand image and loyalty.

### **5. Customer Communication**

Subject: Payment Gateway Incident Notification

Dear Customer,

We have recently detected some suspicious activity on our payment gateway, which could have impacted a few transactions, including yours. We are deeply sorry for the inconvenience this may have caused and want to assure you that protecting your data is our number one priority.

Here's what we are doing:

1. Implemented enhanced security measures to prevent further unauthorized access.
2. Conducting a thorough investigation to identify and resolve the issue.
3. Collaborate with our payment processors to cancel the unauthorized transactions.

Actions to Take:

- Look over your last few credit card statements for any activity you don't recognize.
- If you see anything that looks suspicious, notify your bank right away.
- Change your online password if you haven't done it recently.

Our support team is available at [contact@company.com](mailto:contact@company.com).

We thank you for your understanding and patience as we do everything in our power to make your account safe.

Sincerely,

Cybersecurity Team

### **6. Post-Incident Recommendations**

- Regular Software Updates:
    - Have a policy of automatically applying patches and updates on the systems.
    - This will prevent exploitation of known vulnerabilities in outdated software.
- Multi-Factor Authentication (MFA):
    - Have MFA for administrative and customer accounts.
    - This provides an additional layer of security, making unauthorized access much harder.
- Real-Time Threat Monitoring:
    - Deploy Intrusion Detection and Prevention Systems (IDPS) that can monitor and mitigate in real-time threats.
    - It gives proactive threat detection with real-time capability for a response.