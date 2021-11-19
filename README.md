# teamup.js
A simple Node.js wrapper for https://api.teamup.com.

Currently under construction! This is v0 of a package created originally for personal use and is still being worked on. Please report any bugs, issues, etc., [here](https://github.com/BuildBot42/teamup.js/issues). 

## documentation
Find the full documentation [here](docs.md). *Generated with [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).*

## installation
`npm i teamup.js`

## quick set up
```js
const Teamupjs = require('teamup.js');
const client = new Teamupjs({
  token: 'api_key',
});
```
