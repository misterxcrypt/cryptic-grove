# Windows Event Logs

The Windows Event Logs are not text files that can be viewed using a text editor. However, the raw data can be translated into XML using the Windows API. The events in these log files are stored in a proprietary binary format with a .evt or .evtx extension. The log files with the .evtx file extension typically reside in `C:\Windows\System32\winevt\Logs`.

There are three main ways of accessing these event logs within a Windows system:

1. Event Viewer (GUI-based application)
2. Wevtutil.exe (command-line tool)
3. Get-WinEvent (PowerShell cmdlet)

# Sysmon

Sysmon, a tool used to monitor and log events on Windows, is commonly used by enterprises as part of their monitoring and logging solutions. As part of the Windows Sysinternals package, Sysmon is similar to Windows Event Logs with further detail and granular control.﻿

Sysmon gathers detailed and high-quality logs as well as event tracing that assists in identifying anomalies in your environment. It is commonly used with a security information and event management (SIEM) system or other log parsing solutions that aggregate, filter, and visualize events. 

Lastly, Sysmon includes 27 types of Event IDs, all of which can be used within the required configuration file to specify how the events should be handled and analyzed. An excellent example of a configuration file auditing different Event IDs created by SwiftOnSecurity is linked [here](https://github.com/SwiftOnSecurity/sysmon-config).

# OSQuery

Osquery is an open-source tool created by Facebook. With Osquery, Security Analysts, Incident Responders, and Threat Hunters can query an endpoint (or multiple endpoints) using SQL syntax. Osquery can be installed on various platforms: Windows, Linux, macOS, and FreeBSD.

To interact with the Osquery interactive console/shell, open CMD (or PowerShell) and run `osqueryi`. You'll know that you've successfully entered into the interactive shell by the new command prompt.

Osquery only allows you to query events inside the machine. But with Kolide Fleet, you can query multiple endpoints from the Kolide Fleet UI instead of using Osquery locally to query an endpoint. A sample of Kolide Fleet in action below shows a result of a query listing the machines with the `lsass` process running.

# Wazuh

﻿Wazuh is an open-source, freely available, and extensive EDR solution, which Security Engineers can deploy in all scales of environments.

Wazuh operates on a management and agent model where a dedicated manager device is responsible for managing agents installed on the devices you'd like to monitor.  

As mentioned, Wazuh is an EDR; let's briefly run through what an EDR is. Endpoint detection and response (EDR) are tools and applications that monitor devices for an activity that could indicate a threat or security breach. These tools and applications have features that include:  

- Auditing a device for common vulnerabilities
- Proactively monitoring a device for suspicious activity such as unauthorized logins, brute-force attacks, or privilege escalations.
- Visualizing complex data and events into neat and trendy graphs
- Recording a device's normal operating behaviour to help with detecting anomalies