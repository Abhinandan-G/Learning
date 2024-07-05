"use strict"

const { Sequelize } = require('sequelize');
const {Note} = require('./models');
const {getHandler,postHandler,updateHandler,deleteHandler}= require('./handlers');
exports.configureRoutes= (server)=>{
    return server.route([
            {
                method: 'GET',
                path: '/find/all',
                 handler: getHandler
            },
            {
                method : 'GET',
                path : '/cache',
                handler : async function(request,response){
                        return response.reply("Reload to check whether it is from cache").code(200);

                },
                options : {

                        cache :{
                                expiresIn : 300 * 1000,
                                privacy : 'private' 
                        }
                }
            },
            {
                    method : 'POST',
                    path: '/send',
                    handler: postHandler
                    },
            {
            method: 'PATCH',
            path : '/update/{id}',
             handler : updateHandler
        },
        {
            method : 'DELETE',
            path : '/delete/{id}',
             handler : deleteHandler 
        },
        ])
}