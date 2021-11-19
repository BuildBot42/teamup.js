<a name="Teamjs"></a>

## Teamjs
**Kind**: global class  

* [Teamjs](#Teamjs)
    * [new Teamjs([options])](#new_Teamjs_new)
    * [.getCalendarConfiguration(calendarOrOptions)](#Teamjs+getCalendarConfiguration) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEventsCollection(calendarOrOptions)](#Teamjs+getEventsCollection) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getEvent([options])](#Teamjs+getEvent) ⇒ <code>Promise.&lt;Object&gt;</code> \| <code>Promise.&lt;String&gt;</code>
    * [.createEvent([options])](#Teamjs+createEvent) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateEvent([options])](#Teamjs+updateEvent) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteEvent([options])](#Teamjs+deleteEvent) ⇒ <code>Promise.&lt;String&gt;</code>
    * [.getModifiedSinceEvents([options])](#Teamjs+getModifiedSinceEvents) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.searchEvents([options])](#Teamjs+searchEvents) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getEventHistory([options])](#Teamjs+getEventHistory) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getEventAux([options])](#Teamjs+getEventAux) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.getSubcalendarsCollection(calendarOrOptions)](#Teamjs+getSubcalendarsCollection) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getSubcalendar([options])](#Teamjs+getSubcalendar) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createSubcalendar([options])](#Teamjs+createSubcalendar) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateSubcalendar([options])](#Teamjs+updateSubcalendar) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteSubcalendar([options])](#Teamjs+deleteSubcalendar) ⇒ <code>Promise.&lt;(Boolean\|Object)&gt;</code>
    * [.getAccessKeysCollection(calendarOrOptions)](#Teamjs+getAccessKeysCollection) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.getAccessKey([options])](#Teamjs+getAccessKey) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.createAccessKey([options])](#Teamjs+createAccessKey) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateAccessKey([options])](#Teamjs+updateAccessKey) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deleteAccessKey([options])](#Teamjs+deleteAccessKey) ⇒ <code>Promise.&lt;(Boolean\|Object)&gt;</code>

<a name="new_Teamjs_new"></a>

### new Teamjs([options])
Intializes a new client with provided options.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options object for configuration. |
| [options.token] | <code>string</code> | Required. Your API key for https://api.teamup.com |
| [options.defPassword] | <code>string</code> | Optional. A default password to use when operating on calendars. |
| [options.defLang] | <code>string</code> | defaults to `en_GB`. A default languge to use when operating on calendars. |
| [options.defTimezone] | <code>string</code> | defaults to `UTC`. A default timezone to use when operating on calendars. |
| [options.verifyToken] | <code>boolean</code> | defaults to `true`. Whether or not to verify the API key upon intialization. |

**Example**  
```js
const Teamjs = require('team.js');
//Client with default options and no extra defaults
const client = new Teamjs({
  token: 'YOUR_API_KEY_HERE',
});
```
<a name="Teamjs+getCalendarConfiguration"></a>

### teamjs.getCalendarConfiguration(calendarOrOptions) ⇒ <code>Promise.&lt;Object&gt;</code>
Fetches a calendar's configuration.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The object representing the calendar's configuration.  

| Param | Type | Description |
| --- | --- | --- |
| calendarOrOptions | <code>string</code> \| <code>Object</code> | Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}. |

**Example**  
```js
//Single parameter calendar provided
client.getCalendarConfiguration('a_calendar_Id').then(res => console.log(res));

//Options paramter provided
client.getCalendarConfiguration({calendar: 'a_calendar_Id', password: 'thePassword'}).then(res => console.log(res));
```
<a name="Teamjs+getEventsCollection"></a>

### teamjs.getEventsCollection(calendarOrOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
Fetches a calendar's events collection.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array containing all queried events.  

| Param | Type | Description |
| --- | --- | --- |
| calendarOrOptions | <code>string</code> \| <code>Object</code> | Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, `timezone` {string}, `subcalendarIds` {Integer[]}, `startDate` {Date}, and `endDate` {Date}; requires `calendar` {string}. |

**Example**  
```js
//Single parameter calendar provided
client.getEventsCollection('a_calendar_Id').then(res => console.log(res));

//Options parameter provided
client.getEventsCollection({calendar: 'a_calendar_Id', startDate: new Date(), endDate: new Date()}).then(res => console.log(res));
```
<a name="Teamjs+getEvent"></a>

### teamjs.getEvent([options]) ⇒ <code>Promise.&lt;Object&gt;</code> \| <code>Promise.&lt;String&gt;</code>
Fetches a single event by Id.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> \| <code>Promise.&lt;String&gt;</code> - The object containing the event, or the stringified event in iCalendar format.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | An object representing the options provided. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the event. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the event. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to fetch the event from. |
| [options.event] | <code>string</code> | Required. The event Id to fetch. |
| [options.icf] | <code>boolean</code> | defaults to false. Whether or not to return the calendar in iCalendar format. |

**Example**  
```js
//Get single event
client.getEvent({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));

//Get single event in iCalendar format
client.getEvent({calendar: 'a_calendar_Id', event: '0000', icf: true}).then(res => console.log(res));
```
<a name="Teamjs+createEvent"></a>

### teamjs.createEvent([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates an event with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created event.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to create the event. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the event. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the event. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to create the event in. |
| [options.data] | <code>Object</code> | Required. The data to create the event with, supports `subcalendarIds` {Integer[]}, `startDate` {Date}, `endDate` {Date}, `allDay` {boolean}, `title` {string}, `who` {string}, `location` {string}, `notes` {string}, and `rrule` {string} (view https://apidocs.teamup.com/#event-data-structure for variable explanations). |

**Example**  
```js
//Creates an event
client.createEvent({calendar: 'a_calendar_Id', data: {title: 'New Event', subcalendarIds: [111, 222, 333]}}).then(res => console.log(res));
```
<a name="Teamjs+updateEvent"></a>

### teamjs.updateEvent([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates an existing event with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The updated event.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to update the event. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the event. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the event. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the event to update. |
| [options.event] | <code>string</code> | Required. The event Id of the event to update. |
| [options.data] | <code>Object</code> | Required. The data to update the event with, supports `subcalendarIds` {Integer[]}, `startDate` {Date}, `endDate` {Date}, `allDay` {boolean}, `title` {string}, `who` {string}, `location` {string}, `notes` {string}, `rrule` {string}, and `redit` {string} (view https://apidocs.teamup.com/#event-data-structure for variable explanations). |

**Example**  
```js
//Updates an event
client.updateEvent({calendar: 'a_calendar_Id', event: '0000', 'data: {title: 'New Event', subcalendarIds: [111, 222, 333]}}).then(res => console.log(res));
```
<a name="Teamjs+deleteEvent"></a>

### teamjs.deleteEvent([options]) ⇒ <code>Promise.&lt;String&gt;</code>
Deletes an event with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;String&gt;</code> - The undo-id.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to delete the event. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the response. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the response. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the event to delete. |
| [options.event] | <code>string</code> | Required. The event Id of the event to delete. |
| [options.version] | <code>string</code> | Requierd. The latest version string (see https://apidocs.teamup.com/#delete-event for more). |
| [options.redit] | <code>string</code> | defaults to `single`. How to handle deleting recurring events (see https://apidocs.teamup.com/#delete-event for more). |

**Example**  
```js
//Deletes an event
client.deleteEvent({calendar: 'a_calendar_Id', event: '0000', version: 'abc123'}).then(res => console.log(res));
```
<a name="Teamjs+getModifiedSinceEvents"></a>

### teamjs.getModifiedSinceEvents([options]) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets a list of recently changed events.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array containing the modified since events.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options to determine return value. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the events. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the events. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the events to fetch. |
| [options.modifiedSince] | <code>Date</code> | defaults to seven days ago. Events modified within this time frame are returned (maxium of 30 days, see https://apidocs.teamup.com/#get-events-changed for more). |

**Example**  
```js
//Fetch reecently updated events from the past day
client.getModifiedSinceEvents({calendar: 'a_calendar_Id', modifiedSince: new Date(new Date().getTime() - 86400000)}).then(res => console.log(res));
```
<a name="Teamjs+searchEvents"></a>

### teamjs.searchEvents([options]) ⇒ <code>Promise.&lt;Array&gt;</code>
Searches for events with a query string.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array containing all queried events.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options to determine return value. |
| [options.password] | <code>String</code> | defaults to default password. A password to provide to access the calendar. |
| [options.lang] | <code>String</code> | defaults to default language. The language to use when receiving the events. |
| [options.timezone] | <code>String</code> | defaults to default timezone. The timezone to use when receiving the events. |
| [options.calendar] | <code>String</code> | Required. The calendar Id to search. |
| [options.query] | <code>String</code> | Required. The query to use when searching the calendar. |
| [options.startDate] | <code>Date</code> | defaults to seven days ago. The start date to use (see https://apidocs.teamup.com/#search-events for more). |
| [options.endDate] | <code>Date</code> | defaults to seven days in the future.The end date to use (see https://apidocs.teamup.com/#search-events for more). |
| Optional. | <code>Array.&lt;Integer&gt;</code> | An array of subcalendar Ids to use (see https://apidocs.teamup.com/#search-events for more). |

**Example**  
```js
//Searches for events in subcalendar 111 with query `example`
client.searchEvents({calendar: 'a_calendar_Id', query: 'example', subcalendarIds: [111]}).then(res => console.log(res));
```
<a name="Teamjs+getEventHistory"></a>

### teamjs.getEventHistory([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets the event history of a specific event.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The object containing the event history.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | An object representing the options provided. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the event. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the event. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to fetch the event from. |
| [options.event] | <code>string</code> | Required. The event Id to fetch. |

**Example**  
```js
//Gets an event's history
client.getEventHistory({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));
```
<a name="Teamjs+getEventAux"></a>

### teamjs.getEventAux([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets the auxiliary information of an event.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The object containing the event history.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | An object representing the options provided. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the event. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the event. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to fetch the event from. |
| [options.event] | <code>string</code> | Required. The event Id to fetch. |

**Example**  
```js
//Gets an event's auxiliary information
client.getEventAux({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));
```
<a name="Teamjs+getSubcalendarsCollection"></a>

### teamjs.getSubcalendarsCollection(calendarOrOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
Fetches a calendar's subcalendars collection.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array containing all subcalendars.  

| Param | Type | Description |
| --- | --- | --- |
| calendarOrOptions | <code>string</code> \| <code>Object</code> | Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}. |

**Example**  
```js
//Single parameter calendar provided
client.getSubcalendarsCollection('a_calendar_Id').then(res => console.log(res));

//Options parameter provided
client.getSubcalendarsCollection({calendar: 'a_calendar_Id', lang: 'de'}).then(res => console.log(res));
```
<a name="Teamjs+getSubcalendar"></a>

### teamjs.getSubcalendar([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Fetches a single subcalendar by Id.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The object containing the subcalendar.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | An object representing the options provided. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the subcalendar. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the subcalendar. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to fetch the subcalendar from. |
| [options.subcalendar] | <code>string</code> | Required. The subcalendar Id to fetch. |

**Example**  
```js
//Fetch a single subcalendar
client.getSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000'}).then(res => console.log(res));
```
<a name="Teamjs+createSubcalendar"></a>

### teamjs.createSubcalendar([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a subcalendar with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created subcalendar.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to create the subcalendar. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the subcalendar. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the subcalendar. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to create the subcalendar in. |
| [options.data] | <code>Object</code> | Required. The data to create the subcalendar with, supports `name` {string}, `active` {string}, `color` {Integer}, and `overlap` {boolean} (see https://apidocs.teamup.com/#sub-calendar-data-structure for variable explanations). |

**Example**  
```js
//Creates an subcalendar
client.createSubcalendar({calendar: 'a_calendar_Id', data: {name: 'My Subcalendar'}}).then(res => console.log(res));
```
<a name="Teamjs+updateSubcalendar"></a>

### teamjs.updateSubcalendar([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates an existing subcalendar with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The updated subcalendar.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to update the subcalendar. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the subcalendar. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the subcalendar. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the subcalendar to update. |
| [options.subcalendar] | <code>string</code> | Required. The event Id of the subcalendar to update. |
| [options.data] | <code>Object</code> | Required. The data to update the subcalendar with, supports `name` {string}, `active` {string}, `color` {Integer}, and `overlap` {boolean} (see https://apidocs.teamup.com/#sub-calendar-data-structure for variable explanations). |

**Example**  
```js
//Updates a subcalendar
client.updateSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000', 'data: {name: 'New Name'}}).then(res => console.log(res));
```
<a name="Teamjs+deleteSubcalendar"></a>

### teamjs.deleteSubcalendar([options]) ⇒ <code>Promise.&lt;(Boolean\|Object)&gt;</code>
Deletes a subcalendar with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;(Boolean\|Object)&gt;</code> - Returns true upon success, else returns the response.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to delete the subcalendar. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the subcalendar to delete. |
| [options.subcalendar] | <code>string</code> | Required. The subcalendar Id of the subcalendar to delete. |

**Example**  
```js
//Deletes a subcalendar
client.deleteSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000'}).then(res => console.log(res));
```
<a name="Teamjs+getAccessKeysCollection"></a>

### teamjs.getAccessKeysCollection(calendarOrOptions) ⇒ <code>Promise.&lt;Array&gt;</code>
Fetches a calendar's access keys collection.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array containing all access keys.  

| Param | Type | Description |
| --- | --- | --- |
| calendarOrOptions | <code>string</code> \| <code>Object</code> | Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}. |

**Example**  
```js
//Single parameter calendar provided
client.getAccessKeysCollection('a_calendar_Id').then(res => console.log(res));

//Options parameter provided
client.getAccessKeysCollection({calendar: 'a_calendar_Id', password: 'password'}).then(res => console.log(res));
```
<a name="Teamjs+getAccessKey"></a>

### teamjs.getAccessKey([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Fetches a single access key by Id.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The object containing the access key.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | An object representing the options provided. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the access key. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the access key. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to fetch the access key from. |
| [options.accessKey] | <code>string</code> | Required. The access key Id to fetch. |

**Example**  
```js
//Fetch a single access key
client.getAccessKey({calendar: 'a_calendar_Id', accessKey: '0000'}).then(res => console.log(res));
```
<a name="Teamjs+createAccessKey"></a>

### teamjs.createAccessKey([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a access key with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The newly created access key.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to create the access key. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the access key. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the access key. |
| [options.calendar] | <code>string</code> | Required. The calendar Id to create the access key in. |
| [options.data] | <code>Object</code> | Required. The data to create the access key with, supports `name` {string}, `active` {boolean}, `admin` {boolean}, `shareType` {string}, `role` {string}, `subcalendarPermissions` {Object}, and `requirePassword` {string} (see https://apidocs.teamup.com/#access-key-data-structure for variable explanations). |

**Example**  
```js
//Creates an access key
client.createAccessKey({calendar: 'a_calendar_Id', data: {name: 'My Access Key', admin: true}}).then(res => console.log(res));
```
<a name="Teamjs+updateAccessKey"></a>

### teamjs.updateAccessKey([options]) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates an existing access key with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - The updated access key.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to update the access key. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.lang] | <code>string</code> | defaults to default language. The language to use when receving the access key. |
| [options.timezone] | <code>string</code> | defaults to default timezone. The timezone to use when receiving the access key. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the access key to update. |
| [options.accessKey] | <code>string</code> | Required. The access key Id of the access key to update. |
| [options.data] | <code>Object</code> | Required. The data to update the access key with, supports `name` {string}, `active` {boolean}, `admin` {boolean}, `shareType` {string}, `role` {string}, `subcalendarPermissions` {Object}, and `requirePassword` {string} (see https://apidocs.teamup.com/#access-key-data-structure for variable explanations). |

**Example**  
```js
//Updates an access key
client.updateAccessKey({calendar: 'a_calendar_Id', accessKey: '0000', 'data: {name: 'New Name', admin: false}}).then(res => console.log(res));
```
<a name="Teamjs+deleteAccessKey"></a>

### teamjs.deleteAccessKey([options]) ⇒ <code>Promise.&lt;(Boolean\|Object)&gt;</code>
Deletes an access key with provided options.

**Kind**: instance method of [<code>Teamjs</code>](#Teamjs)  
**Returns**: <code>Promise.&lt;(Boolean\|Object)&gt;</code> - Returns true upon success, else returns the response.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Required. Options provided to delete the access key. |
| [options.password] | <code>string</code> | defaults to defult password. A password to provide to access the calendar. |
| [options.calendar] | <code>string</code> | Required. The calendar Id of the access key to delete. |
| [options.accessKey] | <code>string</code> | Required. The access key Id of the access key to delete. |

**Example**  
```js
//Deletes an access key
client.deleteAccessKey({calendar: 'a_calendar_Id', accessKey: '0000'}).then(res => console.log(res));
```
