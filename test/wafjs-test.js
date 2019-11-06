'use strict'

const { expect } = require('chai')
const  { WAFJS } = require('../lib/waf.js')

const baseConfig = {
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  contentTypes: ['application/json', 'multipart/form-data']
}

const allowedReqHeaders = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:70.0) Gecko/20100101 Firefox/70.0',
  'content-type': 'application/json' 
}

const forbidenReqHeaders = {
  'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
  'content-type': 'application/zip'
}

// ESLINT RULE
/*global it*/

/* BOT CHECK TESTS */
it('Bot Check Test - Allowed BOT', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let res = _WAFJS.isBotCheck(allowedReqHeaders['user-agent'])
  expect(res).to.be.equal(false)
  done()
})

it('Bot Check Test - Forbiden BOT', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let res = _WAFJS.isBotCheck(forbidenReqHeaders['user-agent'])
  expect(res).to.be.equal(true)
  done()
})
/* --- */



/* EXTEND BOT SIGS CHECK TEST */
it('Extend Bot Signatures Test', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  _WAFJS.extendBotSigs(['TESTBOTSIG'])
  let sigIndex = _WAFJS.botSigs.indexOf('TESTBOTSIG')
  expect(sigIndex).to.be.gte(0)
  done()
})
/* --- */



/* REMOVE BOT SIG CHECK TEST */
it('Remove Bot Signature Test', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  _WAFJS.removeBotSig('siege')
  let sigIndex = _WAFJS.botSigs.indexOf('siege')
  expect(sigIndex).to.be.lt(0)
  done()
})



/* REQUEST CHECK TESTS */
it('Request Check Test (Valid Method & Valid Content Type)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let reqStatus = _WAFJS.reqCheck('GET', allowedReqHeaders['content-type'])
  expect(reqStatus).to.be.equal(true)
  done()
})

it('Request Check Test (Invalid Method & Valid Content Type)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let reqStatus = _WAFJS.reqCheck('PUT', allowedReqHeaders['content-type'])
  expect(reqStatus).to.be.equal(false)
  done()
})

it('Request Check Test (Valid Method & Invalid Content Type)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let reqStatus = _WAFJS.reqCheck('POST', forbidenReqHeaders['content-type'])
  expect(reqStatus).to.be.equal(false)
  done()
})

it('Request Check Test (Invalid Method & Invalid Content Type)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let reqStatus = _WAFJS.reqCheck('OPTIONS', forbidenReqHeaders['content-type'])
  expect(reqStatus).to.be.equal(false)
  done()
})

it('Request Check Test (Empty Method & Empty Headers)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let reqStatus = _WAFJS.reqCheck('', '')
  expect(reqStatus).to.be.equal(false)
  done()
})
/* --- */



/* WAF CHECKS TESTS */
it('WAF Checks Aggregator Test (Not bot & Allowed Method & Valid Headers)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let wafCheckStatus = _WAFJS.wafChecks(allowedReqHeaders['user-agent'], 'PATCH', allowedReqHeaders['content-type'])
  expect(wafCheckStatus).to.be.equal(true)
  done()
})

it('WAF Checks Aggregator Test (Not bot & Invalid Method & Valid Headers)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let wafCheckStatus = _WAFJS.wafChecks(allowedReqHeaders['user-agent'], 'PUT', allowedReqHeaders['content-type'])
  expect(wafCheckStatus).to.be.equal(false)
  done()
})

it('WAF Checks Aggregator Test (Is bot & Invalid Method & Invalid Headers)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let wafCheckStatus = _WAFJS.wafChecks(forbidenReqHeaders['user-agent'], 'PUT', forbidenReqHeaders['content-type'])
  expect(wafCheckStatus).to.be.equal(false)
  done()
})

it('WAF Checks Aggregator Test (Is bot & Valid Method & Invalid Headers)', (done) => {
  let _WAFJS = new WAFJS(baseConfig)
  let wafCheckStatus = _WAFJS.wafChecks(forbidenReqHeaders['user-agent'], 'POST', forbidenReqHeaders['content-type'])
  expect(wafCheckStatus).to.be.equal(false)
  done()
})
/* --- */