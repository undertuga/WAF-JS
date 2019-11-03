'use strict'

class WAFJS{

  constructor(config, requestMethod, requestHeaders){

    // loading signatures file
    const { signatures } = require ('./signatures.json')
    
    // declaring holders for request related data
    this.reqMethod = requestMethod || ''
    this.userAgent = requestHeaders['user-agent'] || ''
    this.contentType = requestHeaders['content-type'] || ''

    // declaring holders for config related data
    this.allowedMethods = config.allowedMethods
    this.allowedContentTypes = config.contentTypes
    this.botSigs = signatures

    // declaring base regex expression to check bot signatures
    this.isBotCheckRegex = () => new RegExp(`(${this.botSigs.join('|')})`, 'i')
  }


  
  isBotCheck(){
    return this.isBotCheckRegex().test(this.userAgent)
  }

  extendBotSigs(signatures){
    this.botSigs = [...new Set(this.botSigs.concat(signatures))]
  }

  removeBotSig(signature){
    this.botSigs = this.botSigs.filter(sig => sig !== signature)
  }


  
  reqCheck(){
   return (this.allowedMethods.indexOf(this.reqMethod) < 0 || this.allowedContentTypes.indexOf(this.contentType) < 0)
    ? false
    : true
  }

  wafChecks(){
    return (!this.isBotCheck() && this.reqCheck()) ? true : false
  }
}
module.exports.WAFJS = WAFJS