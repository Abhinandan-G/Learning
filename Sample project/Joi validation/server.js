"use strict"

const hapi = require('hapi');
const { validateSchema } = require('./validateSchema');
const { error } = require('console');
const Joi = require('joi');
const {configureRoutes} = require ('./routes');


const user = {
    username : "elon musk",
    password: "@Zxy!987Elon",
    confirm_password : '@Zxy!987Elon',
    dob : '12.12.1992',
    email: 'elonmusk@gmail.com',
}

function joiValidation(){
let result = validateSchema(user);
if(result.error){
    console.log(error);
}
else{ console.log("validated successfully");}
//console.log(result);
}

joiValidation();

const server = new hapi.Server();

const main = async () => {
    await configureRoutes(server)
    await server.start()
  
    return server
  }

  main()


function joiAssert(){

    Joi.assert(2,Joi.number(),"not a number");
    
}

joiAssert();


