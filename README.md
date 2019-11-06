## WAF-JS <br> *Simple WAF to integrate with Node.js web systems* 
---

[![Build Status](https://travis-ci.org/undertuga/WAF-JS.svg?branch=master)](https://travis-ci.org/undertuga/WAF-JS)
[![Coverage Status](https://coveralls.io/repos/github/undertuga/WAF-JS/badge.svg?branch=master)](https://coveralls.io/github/undertuga/WAF-JS?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/undertuga/WAF-JS/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/wafjs)](https://www.npmjs.com/package/wafjs)
[![node](https://img.shields.io/node/v/wafjs)](https://nodejs.org/en/download/)
[![Gitter](https://badges.gitter.im/WAF-JS/community.svg)](https://gitter.im/WAF-JS/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

---

#### Description

***WAF-JS*** is a simple WAF developed for basic protection on Node.JS web systems, providing basic bot detection, HTTP method checking and some HTTP headers analysis.
With a simple package install and passing some arguments, it can check if you want to continue handling the request, or simply drop it, log it or redirect it somewhere else.

It can be configurable by passing the allowed / desirable HTTP request methods and content types, and it also makes it possible to extend the current bot signatures.

---

#### Instalation
In order to install ***WAF-JS*** package, simply run: <br>
***``npm install wafjs --save``***

---

#### Available Methods
- ***isBotCheck({'user-agent'})***
Based on pre-defined rules / signatures (with the possibility of extending them), and taking the ``user-agent`` field from the request headers, it tries to check of the request is from a known bot / crawler / spider, etc.. Receives the ***user-agent***  as argument and returns a boolean value (if bot: ***true*** | not bot: ***false***)

- ***extendBotSigs({signatures})*** 
Allows the extension of pre-defined bot / crawlers, spiders, etc... signatures. Receives an array of signatures to be added to the pre-defined ones.

- ***removeBotSig({signature})***
Removes a signature from the list.

- ***reqCheck({request method}, {content-type})***
Checks the request, analysing the HTTP request method and content type, and matching it with the given config (allowed methods & content types).
Receives the request method and request headers ***content-type*** property and returns a boolean value (valid / allowed request: ***true*** | invalid / forbidden request: ***false***)

- ***wafChecks({user-agent}, {request method}, {content-type})***
Performs both checks (bot and requests) returning a boolean value as response, according with the validity of the request components.
Receives the request headers ***user-agent*** property, the request method and the request headers ***content-type*** property as parameters.
Returns a boolean (not a bot AND valid request: ***true*** | is bot OR invalid request: ***false***)

---

#### Configuration & Usage
The following arguments are required to be passed to  ***WAFJS***
-  Configuration object containing the ***allowedMethods*** & ***contentTypes***

**example of base config:** 
```javascript

const baseConfig = {
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'], // allowed / desired HTTP methods
  contentTypes: ['application/json', 'multipart/form-data'] // allowed / desired content-types
}

```

The ***wafjs*** package exports a class (***WAFJS***), wich can be instantiated as follows:
```javascript
// package requirement
const { WAFJS } = require('wafjs') 

// declaring new WAFJS class instance
let _wafjs = new WAFJS(baseConfig)

// usage example | bot check
if(_wafjs.isBotCheck(req.headers['user-agent'])){
  res.statusCode = 403
  res.end()
}


// usage example | extend bot signatures
_wafjs.extendBotSigs(['newSig#1', 'newSig#2'])


// usage example | remove signature
_wafjs.removeBotSig('newSig#1')


// usage example | request check
if(_wafjs.reqCheck(req.method, req.headers['content-type'])){
  res.statusCode = 403
  res.end()
}


// usage example | waf checks
if(_wafjs.wafChecks(req.headers['user-agent'], req.method, req.headers['content-type'])){
  res.statusCode = 403
  res.end()
}
````

---

#### ExpressJS integration example
***WAFJS*** can easily be integrated into ExpressJS as middleware, analysing the request before any further handling by the web system:
```javascript
  // WAF middleware validation & request id injection on every request
  express.use(async (req, res, next) => {
    if(_wafjs.reqCheck(req.method, req.headers['content-type']))
      res.status(403).send()
  });
```

---