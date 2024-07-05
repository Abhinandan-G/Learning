"use strict"

const { Sequelize } = require('sequelize');
 const {Note} = require('./Models/models');
const {getHandler,postHandler,updateHandler,deleteHandler}= require('./Handlers/handlers');
exports.configureRoutes= (server)=>{
    return server.route([
            {
                method: 'GET',
                path: '/find/all',
                 handler: getHandler
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