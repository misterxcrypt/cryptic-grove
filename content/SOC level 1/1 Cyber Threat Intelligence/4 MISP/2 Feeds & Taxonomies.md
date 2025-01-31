# Feeds & Taxonomies

## Feeds

Feeds are resources that contain <span style="color:rgb(221, 85, 85)">indicators that can be imported into MISP</span> and <span style="color:rgb(221, 85, 85)">provide attributed information about security events</span>. These feeds provide analysts and organisations with continuously updated information on threats and adversaries and aid in their proactive defence against attacks.

## Taxonomies  

A taxonomy is a means of classifying information based on standard features or attributes. On MISP, taxonomies are used to categorise events, indicators and threat actors based on tags that identify them

![[Pasted image 20240715185451.png]]

Taxonomies are expressed in machine tags, which comprise three vital parts:

- <span style="color:rgb(221, 85, 85)">Namespace</span>: Defines the tag's property to be used.
- <span style="color:rgb(221, 85, 85)">Predicate</span>: Specifies the property attached to the data.
- **<span style="color:rgb(221, 85, 85)">Value</span>:** Numerical or text details to map the property.

##### USAGE

- Set events for <span style="color:rgb(221, 85, 85)">further processing</span> by external tools such as [VirusTotal](https://virustotal.com/).
- Ensure <span style="color:rgb(221, 85, 85)">events are classified appropriately</span> before the Organisation Admin publishes them.
- <span style="color:rgb(221, 85, 85)">Enrich intrusion detection systems' export values with tags</span> that fit specific deployments.

## Tagging

Information from feeds and taxonomies, tags can be placed on events and attributes to identify them based on the indicators or threats identified correctly. Tagging allows for effective sharing of threat information between users, communities and other organisations using MISP to identify various threats.