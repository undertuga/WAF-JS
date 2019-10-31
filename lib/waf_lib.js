'use strict'

import botSignatures from './signatures.json'

class WAFJS{

  constructor(config, request){
    
    // declaring holders for request related data
    this.reqMethod = request.method
    this.userAgent = request.headers['user-agent'] || ''
    this.contentType = request.headers['content-type'] || ''

    // declaring holders for config related data
    this.allowedMethods = config.allowedMethods
    this.allowedContentTypes = config.contentTypes
    this.botSigs = botSignatures.signatures

    // declaring base regex expression to check bot signatures
    const botCheckRegex = () => new RegExp(`(${this.botSigs.join('|')})`, 'i')
  }


  
  botCheck(){
    let isBot = botCheckRegex()
    return isBot.test()
  }

  extendBotSigs(signature){

  }

  removeBotSig(signature){

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