---
Created: 2023-04-15T21:25
Reviewed: true
---
# Data Acquisition:

Data acquisition is the use of established methods to extract electronically stored information (ESI) or data from the suspect’s computer or device to gain a better insight of the incident or crime.

Investigators should be able to verify the accuracy of acquired data and the complete process should auditable and acceptable in the court.

**Live Acquisition** - Collecting data from a powered **ON** system.

**Dead Acquisition** (Static Acquisition) - Collecting data from a powered **OFF** system.

## Live Acquisition:

![[Screenshot_2023-04-18_184736.png]]

### Example of Order of Volatility: according to RFC 3227

![[Screenshot_2023-04-18_185652.png]]

## Dead Acquisition:

Examples of Static data: Emails, Word document, web activity, spreadsheets, slack space, unallocated drive space, various deleted files.

## Rules of Thumb for Data Acquisition:

1. Do not work on original Data evidence.
2. Use clean media to store the copies.
3. Produce two or more copies of the original media
4. Verify the integrity of the copies with the original.

# Types of Data Acquisition:

1. Logical Acquisition
2. Sparse Acquisition
3. Bit-stream Disk-to-Image file
4. Bit-stream disk-to-disk

![[Screenshot_2023-04-18_193028.png]]

![[Screenshot_2023-04-18_193118.png]]

# Data Acquisition Formats:

1. Raw Format - It is bit by bit copy. obtained by dd command
2. Proprietary Format - commercial forensic tool formats
3. Advanced Forensics Format (or) AFF4 - open source acquisition format

![[Screenshot_2023-04-18_194508.png]]

![[Screenshot_2023-04-18_194546.png]]

![[Screenshot_2023-04-18_194640.png]]

# Data Acquisition Methodology:

![[Screenshot_2023-04-18_194904.png]]

**Step1 : Data Acquisition method**

Depends on the situation. Needs to find best method suitable for investigation.

SITUATIONS:

⇒ Size of the suspect drive.

⇒ Time required to acquire the image.

⇒ Whether the investigator can retain the suspect drive. ( can we take it with us? )

Investigators need to acquire only the data that is intended to be acquired.

Example:  
• In case the original evidence drive needs to be returned to the owner,  
as in the case of a discovery demand for a civil litigation case, check  
with the requester (lawyer or supervisor) whether logical acquisition  
of the disk is acceptable. If not, you may have to go back to the  
requester.  

![[Screenshot_2023-04-25_193110.png]]

**Step2 : Select the Data Acquisition Tool**

Choose right tool for Data Acquisition based on the type of acquisition technique.

When it comes to imaging tools, choose tools which satisfy certain requirements.

_Rules for a tool:_

⇒ should not change original content

⇒ should log I/O errors including the type of error and location of the error.

⇒ should have the ability to pass scientific and peer review.

⇒ Results must be repeatable and verifiable.

> ⇒ should alert the user if source is larger than destination (before start)

⇒ should create bit-stream copy while no errors in accessing source media.

⇒ should create qualified bit-stream copy while I/O errors in accessing source media.

**Step3 : Sanitize the Target media**

Sanitize the Target media before collecting forensic data.

Post Investigation, Must dispose this media by using the SAME standards, to mitigate the risks of unauthorized disclosure of information.

Some standards to sanitize the target media:

1. Russian Standard, GOST PS0739-9S
2. German: VSITR
3. American: NAVSO P.S239-26 (MFM)
4. American: DoD 5220.22.M
5. American: NAVSO P-S239-26 (RLL)
6. NIST sp 8W88

**Step4 : Acquire Volatile Data**

> **BELKASOFT Live RAM Capturer** is a forensic tool that allows extracting the entire contents of a computer’s volatile memory.

It saves the image files in .mem format.

> [!important]  
> Note: While performing live acquisition, an investigator must be awareof the fact that working on a live system may alter the contents of RAMor processes running on the system. Any involuntary action performedon the system may potentially make the system inaccessible.  

**Step5 : Enable Write Protection on the Evidence Media**

Use Write blockers to preserve the evidence contained in the suspected drive.

A write blocker is a hardware device or software application that allows data acquisition from the storage media without altering its contents

It allows only read-only access to the storage media.

If hardware write blocker is used:

1. Install a write blocker device  
2. Boot the system With the examiner-controlled operating system  
3. Examples of hardware devices: CRU WiebeTech USB WriteBlocker, Tableau Forensic Bridges, etc.  

If software write blocker is used:

1. Boot the system With the examiner-controlled operating system  
2. Activate write protection  
3. Examples of software applications: SAFE Block, MacForensicsLab Write  
Controller, etc.  

**Step6 : Acquire Non-volatile Data**

It involves acquiring data from a hard disk. There is no significant difference in the amount of data acquired from a hard disk between the live and dead acquisition methods.

Live acquisition is performed by using remote acquisition tools (e.g. netcat) and bootable CDs or USBs (e.g. CAINE)

Dead acquisition is performed by removing the hard disk from the suspect drive, connecting it to a forensic workstation, write-blocking the hard disk, and running a forensic acquisition tool on the disk. (e.g. AccessData FTK Imager)

AccessData FTK Imager is a disk imaging program which can preview recoverable data from a disk of any kind and also create copies, called forensics images, of that data.

**Step7 : Plan for contingency**

Must prepare for contingency such as when the hardware or software does not work, or a failure occurs during acquisition.

**Hard Disk Data Acquisition:** Investigators must create at least two images of the digital evidence collected.

**Imaging Tools:** If you possess two imaging tools, it is recommended to create the first image with one tool and second image with other tool. If you possess only one tool, make two or more images of the drive using the same tool.

**Hardware Acquisition Tool:** Consider using a hardware acquisition tool (such as _UFED Ultimate_ or _1M SOLO-4 G3 IT RUGGEDIZED_) that can access the drive at the BIOS level to copy data in the Host Protected Area (HPA)

**Drive Decryption:** Be prepared to deal with encrypted drives. Eg: BitLocker.

**Step8 : Validating Data Acquisition**

Validating data acquisition involves calculating the hash value of the target media and comparing it with its forensic counterpart to ensure that the data is completely acquired.

The unique number or hash value is referred to as “digital fingerprint”.

**Windows Validation Methods:**

The Get-FileHash cmdlet computes the hash value for an evidence file by the specified hash algorithm.

_ProDiscover's .eve files contain metadata_ in segmented files or acquisition files, including the hash value for the original media.  
When you load the image to ProDiscover, it compares the hash value of this image to the hash value of the original media.  
If the hashes do not match, the tool notifies that the image is corrupt, implying that the evidence cannot be considered reliable  

> [!important]  
> Note: In most computer forensics tools, raw format image files do not contain metadata. For raw acquisitions, therefore, a separate manual validation is recommended during analysis.