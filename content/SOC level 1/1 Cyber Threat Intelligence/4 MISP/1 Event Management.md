# Event Management

The Event Actions tab is where you, as an analyst, will create all malware investigation correlations by providing descriptions and attributes associated with the investigation. Splitting the process into three significant phases, we have: 

- Event Creation.
- Populating events with attributes and attachments.
- Publishing.

### Event Creation

In the beginning, events are a storage of general information about an incident or investigation. We add the description, time, and risk level deemed appropriate for the incident by clicking the **Add Event** button.

According to MISP, the following distribution options are available:

- **Your organisation only:** Allows <span style="color:rgb(221, 85, 85)">members of your organisation</span> to see the event.
- **This Community-only:** Users that are part of your MISP community will be able to see the event. This includes your <span style="color:rgb(221, 85, 85)">organisation, organisations on this MISP server and organisations running MISP servers that synchronise</span> with this server.
- **Connected communities:** Users who are part of your MISP community will see the event, including all organisations on this MISP server, all organisations on MISP servers synchronising with this server, and <span style="color:rgb(221, 85, 85)">the hosting organisations of servers that are two hops away from this one.</span>
- **All communities:** This will share the event with <span style="color:rgb(221, 85, 85)">all MISP communities, allowing the event to be freely propagated</span> from one server to the next.

### Attributes & Attachments

Attributes can be added manually or imported through other formats such as OpenIOC and ThreatConnect. To add them manually, click the **Add Attribute** and populate the form fields. 

The analyst can also add file attachments to the event. These may include malware, report files from external analysis or simply artefacts dropped by the malware.

### Publish Event  

Once the analysts have created events, the <span style="color:rgb(221, 85, 85)">_organisation admin_ will review </span>and publish those events to add them to the pool of events. This will also share the events to the distribution channels set during the creation of the events.