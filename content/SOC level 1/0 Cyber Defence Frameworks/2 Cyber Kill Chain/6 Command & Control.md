# Command & Control

C2 channel is created through the malware to remotely control and manipulate the victim.
**C2 Beaconing** as a type of malicious communication between a C&C server and malware on the infected host. The infected host will consistently communicate with the C2 server.

> [!note] Note #note 
> Until recently, IRC (Internet Relay Chat) was the traditional C2 channel used by attackers. This is no longer the case, as modern security solutions can easily detect malicious IRC traffic.

## C2 channels nowadays:

- The protocols HTTP on port 80 and HTTPS on port 443 (help the attacker evade firewalls.)
- DNS (Domain Name Server) 


> [!attack] DNS Tunneling #attack 
> The infected machine makes constant DNS requests to the DNS server that belongs to an attacker. This communication is DNS Tunneling
