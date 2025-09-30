# Tools
## Discovery & Search

- IACA Darkweb Tools - https://iaca-darkweb-tools.com/
- Ahmia - https://ahmia.fi/
- Intelligence X - https://intelx.io/
- Robin - https://github.com/apurvsinghgautam/robin
## Collection & Crawling

- TorCrawl - https://github.com/MikeMeliz/TorCrawl.py
- TorBot - https://github.com/DedSecInside/TorBot
- VililantOnion - https://github.com/andreyglauzer/VigilantOnion
## Link & entity analysis

- Maltego
## Curated Source Lists

- DeepdarkCTI - https://github.com/fastfire/deepdarkCTI
## Evidence & Forensics

- Hunchly

---
# Techniques

- **OPSEC:** Use isolated hardware or disposable VMs, and non-persistent OSs like Tails, Whonix, or Qubes.
- Route Tor via a reputable VPN, employ burner personas, and export evidence to read-only media, hashing for chain-of-custody integrity
- https://medium.com/%40matt_black/dark-web-osint-tools-2025-field-notes-best-practices-6d58bc8b573b

- **Selector-driven hunting:** Build a data lake using various data leaks Telegram and pivot on emails, domains, BTC addresses, nicknames, PGP keys, and URLs across dark-web sources and leaks (Intelligence X style).

- **Continuous watchlists & alerting:** set up automated monitoring for your brand, VIPs, and IOCs; triage with entity/context enrichment.

- **Graph/link analysis across hidden services:** use Maltego + Hades/Cybersixgill transforms to find relationships (shared BTC/PGP/contact points) and pivot safely.

- **Targeted Tor scraping (read-only):** Automated python scraping to capture pages and extract indicators. 

- **De-Anonymizing Hidden Services:** 
	- Censys.io SSL Certificates
	- Searching Shodan for Hidden Services
	- Checking an IP Address for Tor Usage (https://metrics.torproject.org/exonerator.html)
	- https://hunch.ly/resources/Hunchly-Dark-Web-Setup.pdf

- **Securing web hidden service:** https://blog.0day.rocks/securing-a-web-hidden-service-89d935ba1c1d

- **Real Origin IPs Hiding Behind CloudFlare or Tor:** https://www.secjuice.com/finding-real-ips-of-origin-servers-behind-cloudflare-or-tor/