---
Created: 2023-06-15T12:36
Reviewed: false
---
# Volatile Info:

It helps determine a **logical timeline of security incident.**

It resides in registers, cache, RAM.

- It includes:  
      
    ==System time  
    Logged-on user(s)  
    Network information  
    Open files  
    Network connections  
    Network status  
    Process information  
    Process-to-port mapping  
    Process memory  
    Mapped drives  
    Shares  
    Clipboard contents  
    Service/driver information  
    Command history  
    ==

> Note: Acquire or duplicate the memory of the target system before extracting volatile  
> data, as the commands used in the process can alter contents of media and make the  
> proof legally invalid  

\#-cmdtool

%-guitool

### System time

\#date /t & time /t

It helps in re-creating the accurate timeline of events that occurred on the system.

It provides an idea of when an exploit attempt might have been successful.

### Logged-On user

**\#psloggedon**

PsLoggedOn is an applet that displays both the users logged on locally and via resources for  
either on the local, or a remote computer  

**\#net sessions**

net session command displays computer and usernames on a server, open files, and duration Of sessions

**\#logonsessions**

It lists the currently active logon sessions and if the -p option i specified, the processes running in each session is listed .

### Open files

**\#net file**

Information about the files opened by the intruder using remote login

displays details of open shared files on a server, such as a name ID, and the number of each file locks, if any. it also closes individually shared files and removes file locks.

%NetworkOpenedFiles

NetworkOpenedFiles is a utility for Windows OS that lists all the files currently opened on the host system through remote login  
It displays the Filename, Computer and Username, Permission information (Read/Write/Create), Locks count, File Size, File Attributes, etc.  

### Network info

**\#nbtstat**

1. Intruders after gaining access to a remote system, try to discover other systems that are available on the network
2. NetBIOS name table cache maintains a list of connections made to other systems using NetBIOS
3. The Windows inbuilt command line utility nbtstat can be used to view NetBIOS name table cache
4. The nbtstat -c option shows the contents of the NetBIOS name cache, which contains NetBIOS name-to-IP address mappings

### Collecting Information about Network Connections

**\#netstat -ano**

Collecting information about the network connections running to and from the victim system allows to locate logged attacker, IRCbot communication, worms logging into Command and Control server.  
Netstat with —ano switch displays details of the TCP and UDP network connections including listening ports, and the identifiers.  

### Process Information

**%Task Manager**

Investigate the processes running on a potentially compromised system and collect info.

**\#tasklist /v (verbose)**

displays a list of applications and services with their Process ID PID for all tasks running on either a local or remote computer.

**\#PsList**

displays elementary info about all the processes running on a system.

-x switch show process, memory info and threads

### Process-to-port mapping

**\#netstat -o**

traces the port used by a process and protocol connected to the IP

### Process Memory

**%Process Explorer**

Running processes could be suspicious or malicious in nature.  
Process Explorer can be used to  
**check if the process is malicious/suspicious**.  
Process Explorer shows  
**information about opened or loaded handles and DLLs processes**  
If the process is suspicious, it gathers more  
**information by dumping the memory** used by the process using tools such as **ProcDump and Process Dumper**  
The tool comes with built-in  
**VirusTotal support** to check whether the running process is malicious

### Network Status

Info of the NICs of a system to know whether the system is connected to a wireless access point and what IP is being used.

Tools for the network status detection are:

**\#ipconfig**

**%PromiscDetect**

checks if network adapter is running in **promiscuous mode**, which may be sign that a sniffer is running on computer.

**%Promqry**

## Non-Volatile Info:

Ex: emails, word docs, excel docs, various deleted files

resides in hard drive (swap file, slack space, unallocated drive space)

data sources - DVDs, USB thumb drives, smartphone memory, etc.

### Examine File system

**\#dir /o:d**

examine date and time of OS installation

the service packs, patches, and sub directories that automatically update themselves often. ex: drivers

give priority to recently dated files

### ESE database file

Extensible Storage Engine is a data storing tech used by various Microsoft-managed software such as Active Directory, Windows Mail, Windows Search and Windows Update Client.

This database file is also known as JET Blue.

file extension is .edb. examples of ESE db files:

**contacts.edb** - Stores contacts information in Microsoft live products  
  
**WLCalendarStore.edb** - Stores calendar information in Microsoft Windows Live Mail  
  
**Mail.MSMessageStore** - Stores messages information in Microsoft Windows Live Mail **WebCacheV24.dat and WebCacheV01.dat** - Stores cache, history, and cookies information in Internet Explorer 10  
  
**Mailbox Database.edb and Public Folder Database.edb** - Stores mail data in Microsoft Exchange Server  
  
**Windows.edb** - Stores index information (for Windows search) by Windows OS  
  
**DataStore.edb** - Stores Windows updates information (Located under C:\windows\SoftwareDistribution\DataStore)  
  
**spartan.edb** - Stores the Favorites of Internet Explorer 10/11. (Stored under %LOCALAPPDATA%\Packages\Microsoft.MicrosoftEdge_8wekyb3d8bbwe\AC\MicrosoftEdge\User\Default\DataStore\Data\nouserl\120712-0049)

**%ESEDatabseView or %ViewESE**

the data from .edb files are potential evidence. ESEDBView lists all the tables and records found in the selected tables of .edb database file

data → exported to html file.

### Windows Search Index Analysis

Windows Search Index uses ESE data storage tech to store its data. (Windows.edb)

parse those files to extract data pertaining to deleted data, damaged disks, encrypted files, Event bounding etc., which can be a good source of evidence for investigation.