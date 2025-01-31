# Domain Names

Domain Names can be thought as simply mapping an IP address to a string of text.
Domain Names can be a little more of a pain for the attacker to change as they would most likely need to purchase the domain, register it and modify DNS records. 
==Unfortunately for defenders, many DNS providers have loose standards and provide APIs to make it even easier for the attacker to change the domain.==

> [!attack] Punycode attack #attack 
> Punycode is a way of converting words that cannot be written in ASCII, into a Unicode ASCII encoding.
> 
> Ex: `adıdas.de` which has the Punycode of `http://xn--addas-o4a.de/`
> 

URL shortener is used in phishing. To reveal the actual website, you can add '+' at the end of the tiny URL or use this site:

> [!Tool] Tool #tool
> https://fredirect.vercel.app/. 


**Any.run** is a sandboxing service that executes the sample, we can review any connections such as HTTP requests, DNS requests or processes communicating with an IP address.
