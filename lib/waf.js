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
    this.botCheckRegex = () => new RegExp(`(${this.botSigs.join('|')})`, 'i')
  }


  
  botCheck(){
    return this.botCheckRegex().test(this.userAgent)
  }

  extendBotSigs(signatures){
    this.botSigs = [...new Set(this.botSigs.concat(signatures))]
  }

  removeBotSig(signature){
    delete this.botSigs(signature)
  }


  
  reqCheck(){
   return (this.allowedMethods.indexOf(this.reqMethod) < 0 || this.allowedContentTypes.indexOf(this.contentTypes) < 0)
    ? false
    : true
  }

  wafChecks(){
    return (this.botCheck() && this.reqCheck()) ? true : false
  }


}

module.exports.WAFJS = WAFJS