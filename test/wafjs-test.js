'use strict'

const { expect } = require('chai')
const  { WAFJS } = require('../lib/waf.js')

const baseConfig = {
  allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  contentTypes: ['application/json', 'multipart/form-data']
}

const  allowedReqHeaders = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:70.0) Gecko/20100101 Firefox/70.0',
  'content-type': 'application/json' 
}

const forbidenReqHeaders = {
  'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
  'content-type': 'application/zip'
}

/* BOT CHECK TESTS */
it('Bot Check Test - Allowed BOT', (done) => {
  let _WAFJS = new WAFJS(baseConfig, 'GET', allowedReqHeaders)
  let res = _WAFJS.botCheck()
  expect(res).to.be.equal(false)
  done()
})

it('Bot Check Test - Forbiden BOT', (done) => {
  let _WAFJS = new WAFJS(baseConfig, 'GET', forbidenReqHeaders)
  let res = _WAFJS.botCheck()
  expect(res).to.be.equal(true)
  done()
})
/* --- */


