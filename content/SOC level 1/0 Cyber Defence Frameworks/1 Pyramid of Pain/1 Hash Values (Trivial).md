# Hash

Command to get hash:
```
Get-FileHash .\filename -Algorithm MD5
```

Command to change hash:
```
echo 'hello' >> .\filename
```

It is really easy to spot a malicious file if we have the hash in our arsenal.  However, as an attacker, modifying a file by ==even a single bit is trivial==, which would produce a different hash value. With ***so many variations and instances of known malware or ransomware***, threat hunting using file hashes as the IOC (Indicators of Compromise) can become difficult.