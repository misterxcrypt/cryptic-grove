# Event Correlation

Event correlation identifies significant relationships from multiple log sources such as application logs, endpoint logs, and network logs.

Event correlation deals with identifying significant artefacts co-existing from different log sources and connecting each related artefact. For example, a network connection log may exist in various log sources such as Sysmon logs (Event ID 3: Network Connection) and Firewall Logs. The Firewall log may provide the source and destination IP, source and destination port, protocol, and the action taken. In contrast, Sysmon logs may give the process that invoked the network connection and the user running the process.

With this information, we can connect the dots of each artefact from the two data sources:

- Source and Destination IP
- Source and Destination Port
- Action Taken
- Protocol
- Process name
- User Account
- Machine Name

Event correlation can build the puzzle pieces to complete the exact scenario from an investigation.

# Baselining  

Baselining is the process of knowing what is expected to be normal. In terms of endpoint security monitoring, it requires a vast amount of data-gathering to establish the standard behaviour of user activities, network traffic across infrastructure, and processes running on all machines owned by the organization. Using the baseline as a reference, we can quickly determine the outliers that could threaten the organization. 

Below is a sample list of baseline and unusual activities to show the importance of knowing what to expect in your network.

![[Pasted image 20241224154844.png]]

