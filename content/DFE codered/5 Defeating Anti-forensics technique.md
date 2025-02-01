---
Created: 2023-04-26T23:18
Reviewed: true
---
## Anti-forensics:

Anti-forensics (also known as counter forensics) is a common term for a set of techniques aimed at **complicating or preventing a proper forensics investigation process**.

  

**Anti-forensics Techniques**

- Data/File Deletion
- Password Protection
- Steganography
- Data Hiding in File System Structures
- Trail Obfuscation
- Artifact Wiping
- Overwriting Data/Metadata
- Encryption
- Program Packers
- Minimizing Footprint
- Exploiting Forensics Tool Bugs
- Detecting Forensics Tool Activities

  

1. In FAT filesystem, OS replaces deleted file name’s first letter with ‘E5h’. E5h is a special tag which indicates that the file has been deleted.
2. In NTFS filesystem, OS marks the file entry as unallocated. The clusters allocated to the deleted file are marked as free in $BitMap. ($BitMap is a record of all used and unused clusters)

### Data/File Deletion:

1. In Windows, When a file is deleted, the complete path of the file and its name is stored in a hidden file called INF02 ( in Windows 98) in the Recycled folder. This information is used to restore the deleted files to their original locations.
2. Prior to Windows Vista, a file in the Recycle Bin was stored in its physical location and renamed using the syntax: D<original drive letter of file><#>.<original extension> "D" denotes that a file has been deleted.
3. **Example:**  
      
    De7.doc = (File is deleted from E: drive, it is the "eighth" file  
    received by recycle bin, and is a "doc" file)  
    
4. In Windows Vista and later versions, the deleted file is renamed using the syntax: $R<#>.<original extension>, where <#> represents a set of random letters and numbers
5. At the same time, a corresponding metadata file is created which is named as:  
    $l<#>.<original extension>, where <#> represents a set of random letters and  
    numbers the same as used for $R.  
    
6. The $R and $I files are located at C:\$Recycle.Bin\<USER SID>\
7. $I file contains following metadata:  
    Original file name  
    Original file size  
    The date and time the file was deleted.  
    

> [!important]  
> If metadata file $I is corrupted or damaged or deleted. The deleted file will not be visible in recycle bin. For this. We can use cmd to see all the $R files in recycle folder. we use copy command to restore any $R files without $I files.  

### File Carving windows:

In this technique, file identification and extraction is based on certain characters like file headers or footer.

A file header is called signature (magic number). which is a constant numeric or text value that determines a **file format.**

Eg: If the file header is JFIF, then it is .jpg file. It’s hex signature is ‘4A 46 49 46’

Investigators can take a look at file headers to verify the file format using tools such as 010 Editor, Cl Hex Viewer, Hexinator, Hex Editor Neo, Qiew, WinHex, etc.

### File Carving linux:

If a running process keeps a file open and then removes the file, the file contents  
are still on the disk, and other programs will not reclaim the space.  

It is required to note that if an executable erases itself, its contents can be retrieved  
from a /proc memory image. The command “cp /proc/$PID/exe/tmp/file” creates a  
copy of a file in /tmp.  

Tools like Stellar Phoenix Linux Data Recovery, R-Studio for Linux, TestDisk, PhotoRec can be used to recover deleted files from linux.

## Password Protection:

Investigators use password cracking tools such as ophcrack, RainbowCrack to circumvent the password protection.

techniques include brute-force, rule-based, dictionary attack.

## Steganography:

Detection tool: StegSpy (detects steganized file and used to hide the message)

Watermarking tool: OpenStego (extract hidden data for analysis)

## Alternate Data Streams: (ADS)

Attackers use ADS to **hide data in Windows NTFS** and cannot be revealed through command line or windows explorer.

ADS allows attackers to hide any number of data streams into one single file without modifying file size, functionality except **file date.**

> [!important]  
> File date can be modified using TimeStomp (anti-forensics tool part of the Metasploit Framework)  

Sometimes these hidden ADS can be used to **remotely exploit** a web server.

## Trail obfuscation:

To confuse the forensic investigation process

Can mislead Investigators via **log tempering, false email header generation, timestamp modification, various file headers’ modification.**

```JavaScript
- -----------------------------------------------------------------------
- |                             ATTENTION                                |
- -----------------------------------------------------------------------
  Some of the techniques attackers use for data/trail obfuscation:
  - Log cleaners.
  - Misinformation.
  - Spoofing.
  - Zombie accounts.
  - Trojan commands.
```

Traffic content obfuscation can be attained by means of VPNs and SSH tunneling.

## Artifact Wiping:

It involves various methods aimed at permanent deletion of particular files or entire file system. Methods ~

1. Disk wiping utilities - BCWipe Total WipeOut, CyberScrub cyberCide, DriveScrubber, Shredlt, etc.
2. File wiping utilities - BCWipe, R-Wipe & Clean, CyberScrub Privacy Suite, etc.
3. Disk Degaussing/Destruction Techniques - pulverizing, melting, shredding.
4. Disk Formatting - does not erase data but erase the address tables & unlinks all files.

Disk wiping utilities:

It involves erasing data from the disk by deleting its links to memory blocks and overwriting memory content.

File wiping utilities:

Deletes individual files and file table entries from an OS.

_It is recommended to take regular backup of the data._

## Overwriting Data/Metadata:

Overwriting programs (disk sanitizers) work in three modes:

- Overwrite entire media
- Overwrite individual files
- Overwrite deleted files on the media

TimeStomp is used to modify the MACE (Modified-Accessed-Created-Entry) attributes of the file.

It makes the job of creating a timeline and arranging the perpetrator’s actions in a sequence hard for investigators.

## Encryption:

Cryptanalysis can be used to detect encrypted data. Eg: CrypTool.

![[Screenshot_2023-06-15_123022.png]]