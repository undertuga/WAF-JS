## WAF-JS <br> *Simple WAF to integrate with Node.js web systems* 
---

[![Build Status](https://travis-ci.org/undertuga/WAF-JS.svg?branch=master)](https://travis-ci.org/undertuga/WAF-JS)
[![Coverage Status](https://coveralls.io/repos/github/undertuga/WAF-JS/badge.svg?branch=master)](https://coveralls.io/github/undertuga/WAF-JS?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/undertuga/WAF-JS/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/wafjs)
![node](https://img.shields.io/node/v/wafjs)

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
- ***botCheck()***
Based on pre-defined rules / signatures (with the possibility of extending them), and taking the ``user-agent`` field from the request headers, it tries to check of the request is from a known bot / crawler / spider, etc.. 

- ***extendBotSigs({signatures})*** 
Allows the extensions of pre-defined bot / crawlers, spiders, etc... signatures. Receives an array of signatures to be added to the pre-defined ones.

- ***removeBotSig({signature})***
Removes a signature from the list.

- ***reqCheck()***
Checks the request, analysing the HTTP request method and content type, and matching it with the given config (allowed methods & content types).

- ***wafChecks()***
Performs both checks (bot and requests) returning a boolean value as response, according with the validity of the request components.

---

#### Configuration & Usage
The following arguments are required to be passed to  ***WAFJS***
1. Config object containing the ***allowedMethods*** & ***contenTypes***

**example of base config:** 
```

const baseConfig = {
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  contentTypes: ['application/json', 'multipart/form-data']
}

```

2. The request HTTP method of the current / request to be checked
3. HTTP request headers object, containing the ***user-agent*** & ***content-type*** properties 

The ***wafjs*** package exports a class (***WAFJS***), wich can be instantiated as follows:
```
// package requirement
const { WAFJS } = require('wafjs) 

// class instantiation
let _wafJS = new WAFJS()

````

---

*** This documentation is not complete and is currently under development***

---