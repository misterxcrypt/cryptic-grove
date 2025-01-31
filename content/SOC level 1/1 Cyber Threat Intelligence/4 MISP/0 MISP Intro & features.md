# MISP

[MISP (Malware Information Sharing Platform)](https://www.misp-project.org/) is an open-source threat information platform that<span style="color:rgb(221, 85, 85)"> facilitates the collection, storage and distribution of threat intelligence and Indicators of Compromise (IOCs)</span> related to malware, cyber attacks, financial fraud or any intelligence within a community of trusted members. 

The threat information can be distributed and consumed by Network Intrusion Detection Systems (NIDS), log analysis tools and Security Information and Event Management Systems (SIEM).

==[[2 Feeds & Taxonomies|MISP Feeds]] provide a way to:==

- Exchange threat information.
- Preview events along with associated attributes and objects.
- Select and import events to your instance.
- Correlate attributes identified between events and feeds.

MISP provides the following core functionalities:  

- **IOC database:** This allows for the <span style="color:rgb(221, 85, 85)">storage</span> of technical and non-technical information about malware samples, incidents, attackers and intelligence.
- **Automatic Correlation:** <span style="color:rgb(221, 85, 85)">Identification of relationships</span> between attributes and indicators from malware, attack campaigns or analysis.
- **Data Sharing:** This allows for <span style="color:rgb(221, 85, 85)">sharing of information</span> using different models of distributions and among different MISP instances.
- **Import & Export Features:** This allows the<span style="color:rgb(221, 85, 85)"> import and export of events</span> in different formats to integrate other systems such as NIDS, HIDS, and OpenIOC.
- **Event Graph:** Showcases the<span style="color:rgb(221, 85, 85)"> relationships between objects and attributes </span>identified from events.
- **API support:** <span style="color:rgb(221, 85, 85)">Supports integration</span> with own systems to fetch and export events and intelligence.

## MISP Terms

- **[[1 Event Management|Event]]:** Collection of contextually linked information.
- **Attributes:** Individual data points associated with an event, such as network or system indicators.
- **Objects:** Custom attribute compositions.
- **Object References:** Relationships between different objects.
- **Sightings:** Time-specific occurrences of a given data point or attribute detected to provide more credibility.
- **Tags:** Labels attached to events/attributes.
- **[[2 Feeds & Taxonomies|Taxonomies]]:** Classification libraries are used to tag, classify and organise information.
- **Galaxies:** Knowledge base items used to label events/attributes.
- **Indicators:** Pieces of information that can detect suspicious or malicious cyber activity.