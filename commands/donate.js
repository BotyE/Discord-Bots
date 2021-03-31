const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
var paypal = require('paypal-rest-sdk');

const qiwiApi = new QiwiBillPaymentsAPI("eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6ImNnYXBvNi0wMCIsInVzZXJfaWQiOiI3OTk5MjMzMDc3NSIsInNlY3JldCI6IjIzMzIwYmRkMWI5YzBiODEzY2Y1MTI3ZTgzYzg4NTg1NGJiODE1MWZmNWE1ZGI1YmMwNjc1MWM4MmQyZTI5NDMifX0=");
const Discord = require("discord.js");
const fs= require("fs");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
//    'client_id': 'AfIyA27YJEJcVfFdPNGfqNjvo3BcKCPpG-9T4aTWM_iPO8vT-Je_9k13qrtjMpn1agqiJPczcRWQjAG8',
'client_id': 'AfYEzso-SqjBzUKtIkBAZNEcnU9ifHj4pNcrz4jC-vBgQIr8uNSpfCTgfemcbVvnryrie1he9x5TJbjH',
'client_secret': 'EJlvGRFnXsRRN2a6SlBP-C1gCSvNVttQgPC_X7TngYYax4WeqXptshTxf9lJuJlZy4xGK6mYqd9pR-DJ'
    //'client_secret': 'EPkx-KbSN6MsIt_MEmrD2OzRUM8ogv35qzSk0ivewPDv8PHbHwa_tjkfBQ0Erd9_BiTVmk5IBCertkq9'
  });

module.exports.run = async (bot,message,args) =>{
  //  if(!args[0] || !args[1])
    //    return;
    let amount, number;
    let public = '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPpZh3EmVad5jpRLHFwcv7fMdAqYL5YZgj2ntLPoXEsKh28Gxmr6cRnfbRszdqv6nue3TAQUDSnYaFXxL6t27DX7wDAM66FgKycd9uggqHc'
          let mess = await  message.author.send(`Спасибо за то, что решили вложиться копейкой!`)
      amount=Number(args[0]);
      message.author.send(`Сумма вложения: ${amount}`);
            var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+'+10:00';
            billId = qiwiApi.generateId();
            const lifetime = qiwiApi.getLifetimeByDay(1);
            const fields = {
                amount: amount,
                currency: 'RUB',
                comment: message.author.tag,
                expirationDateTime: lifetime
            };
            console.log(fields)
            qiwiApi.createBill( billId, fields ).then( data => {
                console.log(data) 
                message.author.send(data.payUrl)
          });
/*
          var payReq = {
            "intent": "SALE",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://return.url",
                "cancel_url": "http://cancel.url"
            },
            "transactions": [
                {
                    "amount": {
                        "currency": "RUB",
            "total": "100.00"
                    }
                }
             ]
      };
        
        paypal.payment.create(payReq, function(error, payment){
            var links = {};
          
            if(error){
              console.error(JSON.stringify(error));
            } else {
              // Capture HATEOAS links
              payment.links.forEach(function(linkObj){
                links[linkObj.rel] = {
                  href: linkObj.href,
                  method: linkObj.method
                };
              })
          
              // If the redirect URL is present, redirect the customer to that URL
              if (links.hasOwnProperty('approval_url')){
                console.log(links['approval_url'].href);
              } else {
                console.error('no redirect URI present');
              }
            }
          });*/
    
}
            
module.exports.help = {
    name: "donate"
}