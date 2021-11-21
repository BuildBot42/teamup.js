const fetch = require('node-fetch');

class Teamupjs {

  /** Intializes a new client with provided options.
  * @param {Object} [options] Options object for configuration.
  * @param {string} [options.token] Required. Your API key for https://api.teamup.com
  * @param {string} [options.defPassword] Optional. A default password to use when operating on calendars.
  * @param {string} [options.defLang] defaults to `en_GB`. A default languge to use when operating on calendars.
  * @param {string} [options.defTimezone] defaults to `UTC`. A default timezone to use when operating on calendars.
  * @param {boolean} [options.verifyToken] defaults to `true`. Whether or not to verify the API key upon intialization.
  * @example
  * const Teamupjs = require('team.js');
  * //Client with default options and no extra defaults
  * const client = new Teamupjs({
  *   token: 'YOUR_API_KEY_HERE',
  * });
  */
  constructor(options = {}) {

    //Error if invalid/no token provided
    if(!options.token || typeof options.token !== 'string') throw new Error('Please provide a valid (string) API key in your intialization.');

    //Declare the remaining variables:
    this._token = options.token;
    this._defPassword = typeof options.defPassword === 'string' ? options.defPassword : null;
    this._defLang = typeof options.defLang === 'string' ? options.defLang : 'en_GB';
    this._defTimezone = typeof options.defTimezone === 'string' ? options.defTimezone : 'UTC';

    //Check the token's validity
    if(options.check !== false) {
      fetch('https://api.teamup.com/check-access', {
        headers: {
          'Teamup-Token': this._token
        }
      }).then(res => {
        if(res.status !== 200) throw new Error('Bad API key provided. Received status code ' + res.status + '; "' + res.statusText + '"')
      })
    }
  }

  /*
  * Internal method for verifying option objects.
  */
  _checkObjectString(obj) {
    let expectedObject = {
      calendar: 'String',
      password: 'String',
      lang: 'String',
      timezone: 'String',
      subcalendarIds: 'Array',
      startDate: 'Date',
      endDate: 'Date',
      event: 'String',
      icf: 'Boolean',
      allDay: 'Boolean',
      title: 'String',
      who: 'String',
      location: 'String',
      notes: 'String',
      rrule: 'String',
      data: 'Object',
      redit: 'String',
      version: 'String',
      modifiedSince: 'Date',
      query: 'String',
      subcalendar: 'String',
      name: 'String',
      active: 'Boolean',
      color: 'Integer',
      overlap: 'Boolean',
      accessKey: 'String',
      admin: 'Boolean',
      shareType: 'String',
      role: 'String',
      subcalendarPermissions: 'Object',
      requirePassword: 'Boolean'
    }
    Object.keys(expectedObject).forEach(k => {
      if(typeof obj[k] !== 'undefined' && obj[k] !== null) {
        if(obj[k].constructor.name !== expectedObject[k]) throw new Error('Invalid type provided, expected type ' + expectedObject[k] + ', received type ' + typeof obj[k])
      }
    })
  }

  /** Fetches a calendar's configuration.
  * @param {string|Object} calendarOrOptions Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}.
  * @return {Promise<Object>} The object representing the calendar's configuration.
  * @example
  * //Single parameter calendar provided
  * client.getCalendarConfiguration('a_calendar_Id').then(res => console.log(res));
  *
  * //Options paramter provided
  * client.getCalendarConfiguration({calendar: 'a_calendar_Id', password: 'thePassword'}).then(res => console.log(res));
  */
  async getCalendarConfiguration(calendarOrOptions = {}) {
    if(typeof calendarOrOptions !== 'object' && typeof calendarOrOptions !== 'string') throw new Error('Expected type string/object, received type ' + typeof options)
    if(typeof calendarOrOptions === 'string') {
      calendarOrOptions = {
        calendar: calendarOrOptions,
      }
    }

    calendarOrOptions.password = calendarOrOptions.password || this._defPassword,
    calendarOrOptions.lang = calendarOrOptions.lang || this._defLang,
    calendarOrOptions.timezone = calendarOrOptions.timezone || this._defTimezone,
    calendarOrOptions.calendar = calendarOrOptions.calendar || false;

    this._checkObjectString(calendarOrOptions)

    let res = await fetch('https://api.teamup.com/' + calendarOrOptions.calendar + '/configuration?lang=' + calendarOrOptions.lang + '&tz=' + calendarOrOptions.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': calendarOrOptions.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.configuration || res;

  }

  /** Fetches a calendar's events collection.
  * @param {string|Object} calendarOrOptions Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, `timezone` {string}, `subcalendarIds` {Integer[]}, `startDate` {Date}, and `endDate` {Date}; requires `calendar` {string}.
  * @return {Promise<Array>} An array containing all queried events.
  * @example
  * //Single parameter calendar provided
  * client.getEventsCollection('a_calendar_Id').then(res => console.log(res));
  *
  * //Options parameter provided
  * client.getEventsCollection({calendar: 'a_calendar_Id', startDate: new Date(), endDate: new Date()}).then(res => console.log(res));
  */
  async getEventsCollection(calendarOrOptions = {}) {
    if(typeof calendarOrOptions !== 'object' && typeof calendarOrOptions !== 'string') throw new Error('Expected type string/object, received type ' + typeof options)
    if(typeof calendarOrOptions !== 'object') {
      calendarOrOptions = {
        calendar: calendarOrOptions,
      }
    }

    calendarOrOptions.password = calendarOrOptions.password || this._defPassword,
    calendarOrOptions.lang = calendarOrOptions.lang || this._defLang,
    calendarOrOptions.timezone = calendarOrOptions.timezone || this._defTimezone,
    calendarOrOptions.subcalendarIds = calendarOrOptions.subcalendarIds || [],
    calendarOrOptions.startDate = calendarOrOptions.startDate || new Date(),
    calendarOrOptions.endDate = calendarOrOptions.endDate || new Date(new Date().getTime() + 86400000),
    calendarOrOptions.calendar = calendarOrOptions.calendar || false


    this._checkObjectString(calendarOrOptions)

    calendarOrOptions.subcalendarIds = calendarOrOptions.subcalendarIds.join('&subcalendarId[]=');

    if(calendarOrOptions.subcalendarIds !== '') calendarOrOptions.subcalendarIds = '&subcalendarId[]=' + calendarOrOptions.subcalendarIds

    let res = await fetch('https://api.teamup.com/' + calendarOrOptions.calendar + '/events?lang=' + calendarOrOptions.lang
    + '&tz=' + calendarOrOptions.timezone
    + calendarOrOptions.subcalendarIds
    + '&startDate=' + calendarOrOptions.startDate.getFullYear() + '-' + (calendarOrOptions.startDate.getMonth() + 1) + '-' + calendarOrOptions.startDate.getDate()
    + '&endDate=' + calendarOrOptions.endDate.getFullYear() + '-' + (calendarOrOptions.endDate.getMonth() + 1) + '-' + calendarOrOptions.endDate.getDate(), {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': calendarOrOptions.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.events || res;

  }

  /** Fetches a single event by Id.
  * @param {Object} [options] An object representing the options provided.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the event.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the event.
  * @param {string} [options.calendar] Required. The calendar Id to fetch the event from.
  * @param {string} [options.event] Required. The event Id to fetch.
  * @param {boolean} [options.icf] defaults to false. Whether or not to return the calendar in iCalendar format.
  * @return {Promise<Object>|Promise<String>} The object containing the event, or the stringified event in iCalendar format.
  * @example
  * //Get single event
  * client.getEvent({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));
  *
  * //Get single event in iCalendar format
  * client.getEvent({calendar: 'a_calendar_Id', event: '0000', icf: true}).then(res => console.log(res));
  */
  async getEvent(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.event = options.event || false,
    options.icf = options.icf || false

    this._checkObjectString(options)
    if(options.icf) {
      let res = await fetch('https://teamup.com/' + options.calendar + '/events/' + options.event + '.ics?lang=' + options.lang + '&tz=' + options.timezone, {
        headers: {
          'Teamup-Token': this._token,
          'Teamup-Password': options.password
        }
      })
      .catch(err => {
        throw err;
      })
      res = await res.text();
      return res;
    }
    else {
      let res = await fetch('https://api.teamup.com/' + options.calendar + '/events/' + options.event + '?lang=' + options.lang + '&tz=' + options.timezone, {
        headers: {
          'Teamup-Token': this._token,
          'Teamup-Password': options.password
        }
      })
      .catch(err => {
        throw err;
      })
      res = await res.json();
      return res.event || res;
    }
  }

  /** Creates an event with provided options.
  * @param {Object} [options] Required. Options provided to create the event.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the event.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the event.
  * @param {string} [options.calendar] Required. The calendar Id to create the event in.
  * @param {Object} [options.data] Required. The data to create the event with, supports `subcalendarIds` {Integer[]}, `startDate` {Date}, `endDate` {Date}, `allDay` {boolean}, `title` {string}, `who` {string}, `location` {string}, `notes` {string}, and `rrule` {string} (view https://apidocs.teamup.com/#event-data-structure for variable explanations).
  * @return {Promise<Object>} The newly created event.
  * @example
  * //Creates an event
  * client.createEvent({calendar: 'a_calendar_Id', data: {title: 'New Event', subcalendarIds: [111, 222, 333]}}).then(res => console.log(res));
  */
  async createEvent(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'POST',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.event || res;
  }

  /** Updates an existing event with provided options.
  * @param {Object} [options] Required. Options provided to update the event.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the event.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the event.
  * @param {string} [options.calendar] Required. The calendar Id of the event to update.
  * @param {string} [options.event] Required. The event Id of the event to update.
  * @param {Object} [options.data] Required. The data to update the event with, supports `subcalendarIds` {Integer[]}, `startDate` {Date}, `endDate` {Date}, `allDay` {boolean}, `title` {string}, `who` {string}, `location` {string}, `notes` {string}, `rrule` {string}, and `redit` {string} (view https://apidocs.teamup.com/#event-data-structure for variable explanations).
  * @return {Promise<Object>} The updated event.
  * @example
  * //Updates an event
  * client.updateEvent({calendar: 'a_calendar_Id', event: '0000', 'data: {title: 'New Event', subcalendarIds: [111, 222, 333]}}).then(res => console.log(res));
  */
  async updateEvent(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.event = options.event || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events/' + options.event + '?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'PUT',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.event || res;
  }

  /** Deletes an event with provided options.
  * @param {Object} [options] Required. Options provided to delete the event.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the response.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the response.
  * @param {string} [options.calendar] Required. The calendar Id of the event to delete.
  * @param {string} [options.event] Required. The event Id of the event to delete.
  * @param {string} [options.version] Requierd. The latest version string (see https://apidocs.teamup.com/#delete-event for more).
  * @param {string} [options.redit] defaults to `single`. How to handle deleting recurring events (see https://apidocs.teamup.com/#delete-event for more).
  * @return {Promise<String>} The undo-id.
  * @example
  * //Deletes an event
  * client.deleteEvent({calendar: 'a_calendar_Id', event: '0000', version: 'abc123'}).then(res => console.log(res));
  */
  async deleteEvent(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.event = options.event || false,
    options.version = options.version || false,
    options.redit = options.redit || 'singe'

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events/' + options.event + '?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'DELETE',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.undo_id || res;
  }

  /** Gets a list of recently changed events.
  * @param {Object} [options] Required. Options to determine return value.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the events.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the events.
  * @param {string} [options.calendar] Required. The calendar Id of the events to fetch.
  * @param {Date} [options.modifiedSince] defaults to seven days ago. Events modified within this time frame are returned (maxium of 30 days, see https://apidocs.teamup.com/#get-events-changed for more).
  * @return {Promise<Array>} An array containing the modified since events.
  * @example
  * //Fetch reecently updated events from the past day
  * client.getModifiedSinceEvents({calendar: 'a_calendar_Id', modifiedSince: new Date(new Date().getTime() - 86400000)}).then(res => console.log(res));
  */
  async getModifiedSinceEvents(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.modifiedSince = options.modifiedSince || new Date(new Date().getTime() - 604800000)

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events?modifiedSince=' + Number(options.modifiedSince) / 1000 + '&lang=' + options.lang + '&tz=' + options.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.events || res;
  }

  /** Searches for events with a query string.
  * @param {Object} [options] Required. Options to determine return value.
  * @param {String} [options.password] defaults to default password. A password to provide to access the calendar.
  * @param {String} [options.lang] defaults to default language. The language to use when receiving the events.
  * @param {String} [options.timezone] defaults to default timezone. The timezone to use when receiving the events.
  * @param {String} [options.calendar] Required. The calendar Id to search.
  * @param {String} [options.query] Required. The query to use when searching the calendar.
  * @param {Date} [options.startDate] defaults to seven days ago. The start date to use (see https://apidocs.teamup.com/#search-events for more).
  * @param {Date} [options.endDate] defaults to seven days in the future.The end date to use (see https://apidocs.teamup.com/#search-events for more).
  * @param {Integer[]} Optional. An array of subcalendar Ids to use (see https://apidocs.teamup.com/#search-events for more).
  * @return {Promise<Array>} An array containing all queried events.
  * @example
  * //Searches for events in subcalendar 111 with query `example`
  * client.searchEvents({calendar: 'a_calendar_Id', query: 'example', subcalendarIds: [111]}).then(res => console.log(res));
  */
  async searchEvents(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.subcalendarIds = options.subcalendarIds || [],
    options.startDate = options.startDate || new Date(new Date().getTime() - 604800000),
    options.endDate = options.endDate || new Date(new Date().getTime() + 604800000),
    options.calendar = options.calendar || false,
    options.query = options.query || false;

    this._checkObjectString(options)

    options.subcalendarIds = options.subcalendarIds.join('&subcalendarId[]=');

    if(options.subcalendarIds !== '') options.subcalendarIds = '&subcalendarId[]=' + options.subcalendarIds

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events?query=' + options.query + '&lang=' + options.lang + '&tz=' + options.timezone + '&startDate=' + options.startDate + '&endDate=' + options.endDate + options.subcalendarIds, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.events || res;
  }

  /** Gets the event history of a specific event.
  * @param {Object} [options] An object representing the options provided.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the event.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the event.
  * @param {string} [options.calendar] Required. The calendar Id to fetch the event from.
  * @param {string} [options.event] Required. The event Id to fetch.
  * @return {Promise<Object>} The object containing the event history.
  * @example
  * //Gets an event's history
  * client.getEventHistory({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));
  */
  async getEventHistory(options = {}) {
    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.event = options.event || false;

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events/' + options.event + '/history?lang=' + options.lang + '&tz=' + options.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res;
  }

  /** Gets the auxiliary information of an event.
  * @param {Object} [options] An object representing the options provided.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the event.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the event.
  * @param {string} [options.calendar] Required. The calendar Id to fetch the event from.
  * @param {string} [options.event] Required. The event Id to fetch.
  * @return {Promise<Object>} The object containing the event history.
  * @example
  * //Gets an event's auxiliary information
  * client.getEventAux({calendar: 'a_calendar_Id', event: '0000'}).then(res => console.log(res));
  */
  async getEventAux(options = {}) {
    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.event = options.event || false;

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/events/' + options.event + '/aux?lang=' + options.lang + '&tz=' + options.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res;
  }

  /** Fetches a calendar's subcalendars collection.
  * @param {string|Object} calendarOrOptions Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}.
  * @return {Promise<Array>} An array containing all subcalendars.
  * @example
  * //Single parameter calendar provided
  * client.getSubcalendarsCollection('a_calendar_Id').then(res => console.log(res));
  *
  * //Options parameter provided
  * client.getSubcalendarsCollection({calendar: 'a_calendar_Id', lang: 'de'}).then(res => console.log(res));
  */
  async getSubcalendarsCollection(calendarOrOptions = {}) {
    if(typeof calendarOrOptions !== 'object' && typeof calendarOrOptions !== 'string') throw new Error('Expected type string/object, received type ' + typeof options)
    if(typeof calendarOrOptions !== 'object') {
      calendarOrOptions = {
        calendar: calendarOrOptions,
      }
    }

    calendarOrOptions.password = calendarOrOptions.password || this._defPassword,
    calendarOrOptions.lang = calendarOrOptions.lang || this._defLang,
    calendarOrOptions.timezone = calendarOrOptions.timezone || this._defTimezone,
    calendarOrOptions.calendar = calendarOrOptions.calendar || false


    this._checkObjectString(calendarOrOptions)

    let res = await fetch('https://api.teamup.com/' + calendarOrOptions.calendar + '/subcalendars?lang=' + calendarOrOptions.lang + '&tz=' + calendarOrOptions.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': calendarOrOptions.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.subcalendars || res;
  }

  /** Fetches a single subcalendar by Id.
  * @param {Object} [options] An object representing the options provided.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the subcalendar.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the subcalendar.
  * @param {string} [options.calendar] Required. The calendar Id to fetch the subcalendar from.
  * @param {string} [options.subcalendar] Required. The subcalendar Id to fetch.
  * @return {Promise<Object>} The object containing the subcalendar.
  * @example
  * //Fetch a single subcalendar
  * client.getSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000'}).then(res => console.log(res));
  */
  async getSubcalendar(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.subcalendar = options.subcalendar || false,

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/subcalendars/' + options.subcalendar + '?lang=' + options.lang + '&tz=' + options.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })
    res = await res.json();
    return res.subcalendar || res;
  }

  /** Creates a subcalendar with provided options.
  * @param {Object} [options] Required. Options provided to create the subcalendar.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the subcalendar.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the subcalendar.
  * @param {string} [options.calendar] Required. The calendar Id to create the subcalendar in.
  * @param {Object} [options.data] Required. The data to create the subcalendar with, supports `name` {string}, `active` {string}, `color` {Integer}, and `overlap` {boolean} (see https://apidocs.teamup.com/#sub-calendar-data-structure for variable explanations).
  * @return {Promise<Object>} The newly created subcalendar.
  * @example
  * //Creates an subcalendar
  * client.createSubcalendar({calendar: 'a_calendar_Id', data: {name: 'My Subcalendar'}}).then(res => console.log(res));
  */
  async createSubcalendar(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/subcalendars?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'POST',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.subcalendar || res;
  }

  /** Updates an existing subcalendar with provided options.
  * @param {Object} [options] Required. Options provided to update the subcalendar.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the subcalendar.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the subcalendar.
  * @param {string} [options.calendar] Required. The calendar Id of the subcalendar to update.
  * @param {string} [options.subcalendar] Required. The event Id of the subcalendar to update.
  * @param {Object} [options.data] Required. The data to update the subcalendar with, supports `name` {string}, `active` {string}, `color` {Integer}, and `overlap` {boolean} (see https://apidocs.teamup.com/#sub-calendar-data-structure for variable explanations).
  * @return {Promise<Object>} The updated subcalendar.
  * @example
  * //Updates a subcalendar
  * client.updateSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000', 'data: {name: 'New Name'}}).then(res => console.log(res));
  */
  async updateSubcalendar(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.subcalendar = options.subcalendar || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/subcalendars/' + options.subcalendar + '?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'PUT',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.subcalendar || res;
  }

  /** Deletes a subcalendar with provided options.
  * @param {Object} [options] Required. Options provided to delete the subcalendar.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.calendar] Required. The calendar Id of the subcalendar to delete.
  * @param {string} [options.subcalendar] Required. The subcalendar Id of the subcalendar to delete.
  * @return {Promise<Boolean|Object>} Returns true upon success, else returns the response.
  * @example
  * //Deletes a subcalendar
  * client.deleteSubcalendar({calendar: 'a_calendar_Id', subcalendar: '0000'}).then(res => console.log(res));
  */
  async deleteSubcalendar(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.calendar = options.calendar || false,
    options.subcalendar = options.subcalendar || false

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/subcalendars/' + options.subcalendar, {
      method: 'DELETE',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })
    if(res.status == 204) return true;

    //Else
    res = await res.json();
    return res
  }

  /** Fetches a calendar's access keys collection.
  * @param {string|Object} calendarOrOptions Either a calendar Id, or options. If options, supports `password` {string}, `lang` {string}, and `timezone` {string}; requires `calendar` {string}.
  * @return {Promise<Array>} An array containing all access keys.
  * @example
  * //Single parameter calendar provided
  * client.getAccessKeysCollection('a_calendar_Id').then(res => console.log(res));
  *
  * //Options parameter provided
  * client.getAccessKeysCollection({calendar: 'a_calendar_Id', password: 'password'}).then(res => console.log(res));
  */
  async getAccessKeysCollection(calendarOrOptions = {}) {
    if(typeof calendarOrOptions !== 'object' && typeof calendarOrOptions !== 'string') throw new Error('Expected type string/object, received type ' + typeof options)
    if(typeof calendarOrOptions !== 'object') {
      calendarOrOptions = {
        calendar: calendarOrOptions,
      }
    }

    calendarOrOptions.password = calendarOrOptions.password || this._defPassword,
    calendarOrOptions.lang = calendarOrOptions.lang || this._defLang,
    calendarOrOptions.timezone = calendarOrOptions.timezone || this._defTimezone,
    calendarOrOptions.calendar = calendarOrOptions.calendar || false


    this._checkObjectString(calendarOrOptions)

    let res = await fetch('https://api.teamup.com/' + calendarOrOptions.calendar + '/keys?lang=' + calendarOrOptions.lang + '&tz=' + calendarOrOptions.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': calendarOrOptions.password
      }
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.keys || res;
  }

  /** Fetches a single access key by Id.
  * @param {Object} [options] An object representing the options provided.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the access key.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the access key.
  * @param {string} [options.calendar] Required. The calendar Id to fetch the access key from.
  * @param {string} [options.accessKey] Required. The access key Id to fetch.
  * @return {Promise<Object>} The object containing the access key.
  * @example
  * //Fetch a single access key
  * client.getAccessKey({calendar: 'a_calendar_Id', accessKey: '0000'}).then(res => console.log(res));
  */
  async getAccessKey(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.accessKey = options.accessKey || false,

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/keys/' + options.accessKey + '?lang=' + options.lang + '&tz=' + options.timezone, {
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })
    res = await res.json();
    return res.key || res;
  }

  /** Creates a access key with provided options.
  * @param {Object} [options] Required. Options provided to create the access key.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the access key.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the access key.
  * @param {string} [options.calendar] Required. The calendar Id to create the access key in.
  * @param {Object} [options.data] Required. The data to create the access key with, supports `name` {string}, `active` {boolean}, `admin` {boolean}, `shareType` {string}, `role` {string}, `subcalendarPermissions` {Object}, and `requirePassword` {string} (see https://apidocs.teamup.com/#access-key-data-structure for variable explanations).
  * @return {Promise<Object>} The newly created access key.
  * @example
  * //Creates an access key
  * client.createAccessKey({calendar: 'a_calendar_Id', data: {name: 'My Access Key', admin: true}}).then(res => console.log(res));
  */
  async createAccessKey(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/keys?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'POST',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.key || res;
  }

  /** Updates an existing access key with provided options.
  * @param {Object} [options] Required. Options provided to update the access key.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.lang] defaults to default language. The language to use when receving the access key.
  * @param {string} [options.timezone] defaults to default timezone. The timezone to use when receiving the access key.
  * @param {string} [options.calendar] Required. The calendar Id of the access key to update.
  * @param {string} [options.accessKey] Required. The access key Id of the access key to update.
  * @param {Object} [options.data] Required. The data to update the access key with, supports `name` {string}, `active` {boolean}, `admin` {boolean}, `shareType` {string}, `role` {string}, `subcalendarPermissions` {Object}, and `requirePassword` {string} (see https://apidocs.teamup.com/#access-key-data-structure for variable explanations).
  * @return {Promise<Object>} The updated access key.
  * @example
  * //Updates an access key
  * client.updateAccessKey({calendar: 'a_calendar_Id', accessKey: '0000', 'data: {name: 'New Name', admin: false}}).then(res => console.log(res));
  */
  async updateAccessKey(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options)

    options.password = options.password || this._defPassword,
    options.lang = options.lang || this._defLang,
    options.timezone = options.timezone || this._defTimezone,
    options.calendar = options.calendar || false,
    options.accessKey = options.accessKey || false,
    options.data = options.data || false

    this._checkObjectString(options)
    this._checkObjectString(options.data)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/keys/' + options.accessKey + '?lang=' + options.lang + '&tz=' + options.timezone, {
      method: 'PUT',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      },
      body: JSON.stringify(options.data)
    })
    .catch(err => {
      throw err;
    })

    res = await res.json();
    return res.key || res;
  }

  /** Deletes an access key with provided options.
  * @param {Object} [options] Required. Options provided to delete the access key.
  * @param {string} [options.password] defaults to defult password. A password to provide to access the calendar.
  * @param {string} [options.calendar] Required. The calendar Id of the access key to delete.
  * @param {string} [options.accessKey] Required. The access key Id of the access key to delete.
  * @return {Promise<Boolean|Object>} Returns true upon success, else returns the response.
  * @example
  * //Deletes an access key
  * client.deleteAccessKey({calendar: 'a_calendar_Id', accessKey: '0000'}).then(res => console.log(res));
  */
  async deleteAccessKey(options = {}) {
    if(typeof options !== 'object') throw new Error('Expected type object, received type ' + typeof options);

    options.password = options.password || this._defPassword,
    options.calendar = options.calendar || false,
    options.accessKey = options.accessKey || false;

    this._checkObjectString(options)

    let res = await fetch('https://api.teamup.com/' + options.calendar + '/keys/' + options.accessKey, {
      method: 'DELETE',
      headers: {
        'Teamup-Token': this._token,
        'Teamup-Password': options.password
      }
    })
    .catch(err => {
      throw err;
    })
    if(res.status == 204) return true;

    //Else
    res = await res.json();
    return res;
  }

}

module.exports = Teamupjs;
