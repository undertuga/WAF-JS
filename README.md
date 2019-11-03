## WAF-JS <br> *Simple WAF to integrate with Node.js web systems* 
---

[![Build Status](https://travis-ci.org/undertuga/WAF-JS.svg?branch=master)](https://travis-ci.org/undertuga/WAF-JS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/undertuga/WAF-JS/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/wafjs)
![node](https://img.shields.io/node/v/wafjs)

---

#### Description

*WAF-JS* is a simple WAF developed for basic protection on Node.JS systems, providing basic bot detection, HTTP method checking and some HTTP Headers analysis.
With a simple package install and passing some arguments, it can check if you want to continue handling the request, or simply drop it, log it or redirect it somewhere else.

It can be configurable by passing the allowed / desirable HTTP Methods and Content Types, and it also makes it possible to extend the current bot signatures.

---

#### Instalation
In order to install WAF-JS package, simply run: <br>
*``npm install wafjs --save``*

---