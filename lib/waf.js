'use strict'

class WAFJS{

  constructor(config){

    // loading signatures file
    const { signatures } = require ('./signatures.json')

    // declaring holders for config related data
    this.allowedMethods = config.allowedMethods
    this.allowedContentTypes = config.contentTypes
    this.botSigs = signatures

    // declaring base regex expression to check bot signatures
    this.isBotCheckRegex = () => new RegExp(`(${this.botSigs.join('|')})`, 'i')
  }


  
  isBotCheck(userAgent){
    return this.isBotCheckRegex().test(userAgent)
  }

  extendBotSigs(signatures){
    this.botSigs = [...new Set(this.botSigs.concat(signatures))]
  }

  removeBotSig(signature){
    this.botSigs = this.botSigs.filter(sig => sig !== signature)
  }


  
  reqCheck(requestMethod, contentType){
   return !(this.allowedMethods.indexOf(requestMethod) < 0 || this.allowedContentTypes.indexOf(contentType) < 0)
  }

  wafChecks(userAgent, requestMethod, contentType){
    return (!this.isBotCheck(userAgent) && this.reqCheck(requestMethod, contentType))
  }
}
module.exports.WAFJS = WAFJS