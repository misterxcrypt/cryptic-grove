# OpenCTI

[OpenCTI](https://github.com/OpenCTI-Platform/opencti) is another open-sourced platform designed to <span style="color:rgb(221, 85, 85)">provide organisations</span> with the means <span style="color:rgb(221, 85, 85)">to manage CTI through the storage, analysis, visualisation and presentation of threat campaigns, malware and IOCs.</span> 

- Main objective is to create a comprehensive tool that allows users to capitalise on technical and non-technical information while developing relationships between each piece of information and its primary source.
- The platform can use the [MITRE ATT&CK framework](https://tryhackme.com/room/mitre) to structure the data. 
- Additionally, it can be integrated with other threat intel tools such as MISP and TheHive.

### OpenCTI Data Model

OpenCTI uses a variety of knowledge schemas in structuring data, the main one being the Structured Threat Information Expression ([STIX2](https://oasis-open.github.io/cti-documentation/stix/intro)) standards. 

[[2 CTI Standards & Frameworks|STIX]] is a serialised and standardised language format used in threat intelligence exchange. It allows for the data to be implemented as entities and relationships, effectively tracing the origin of the provided information.

This data model is supported by how the platform's architecture has been laid out. The image below gives an architectural structure.

![[Pasted image 20240714100731.png]]

Highlight services include:

- **GraphQL API:** The API connects clients to the database and the messaging system.
- **Write workers:** Python processes utilised to write queries asynchronously from the RabbitMQ messaging system.
- **Connectors:** Another set of Python processes used to ingest, enrich or export data on the platform. These connectors provide the application with a robust network of integrated systems and frameworks to create threat intelligence relations and allow users to improve their defence tactics.

| Class                              | Description                                                  | Examples                  |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------- |
| **External Input Connector**       | Ingests information from external sources                    | CVE, MISP, TheHive, MITRE |
| **Stream Connector**               | Consumes platform data stream                                | History, Tanium           |
| **Internal Enrichment Connector**  | Takes in new OpenCTI entities from user requests             | Observables enrichment    |
| **Internal Import File Connector** | Extracts information from uploaded reports                   | PDFs, STIX2 Import        |
| **Internal Export File Connector** | Exports information from OpenCTI into different file formats | CSV, STIX2 export, PDF    |
