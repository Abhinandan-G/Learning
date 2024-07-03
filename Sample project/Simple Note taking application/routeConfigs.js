"use strict"

const { Sequelize } = require('sequelize');
const {Note} = require('./models');
exports.configureRoutes= (server)=>{
    return server.route([
            {
                method: 'GET',
                path: '/find/all',
                handler: async function (request, reply) {
                    try{
                    const result = await Note.findAll();
                    console.log(result);
                    return reply.response(result);
                    }
                    catch(err){
                        console.log(err);
                        console.log("Internal server error, Unable to connect and fetch the data");
                        return reply.response('Internal Server Error, Unable to connect and fetch the data ').code(500);
                    }
                }
            },{
                    method : 'POST',
                    path: '/send',
                    handler: async function(request,reply){
            
                        try{
                            let Payload  = request.payload; 
                            const new_note = await Note.create({
                                notes_id : Payload.notes_id,
                                notes_title: Payload.notes_title,
                                notes_description: Payload.notes_description
                            });
            
                            console.log("Data inserted succesfully");
                            //return reply({message:"Data inserted successfully",code:200});
                            return reply.response(new_note).code(200);
            
                        }
                        catch(err){
                            console.log(err);
                            console.log("error in post method");
                        }
                        
                        //reply("data inserted succesfully").code(200);
                    },
            },{
            method: 'PATCH',
            path : '/update/{id}',
            handler : async function (request,reply){
                try{
                    let id = request.params.id;
                    let Payload = request.payload;
                    //console.log(The type of the parameter is ${typeof(values[0])});
                    const [updated]=await Note.update(
                        { notes_description: Payload.notes_description },
                        {
                          where: {
                            notes_id: id,
                          },
                        },
                      );
    
                      if(updated){
                      console.log("Data updated succesfully");
                       return reply.response({message : "Data updated succesfully"}).code(202);
                      }
                      else{
                        console.log("Problem in updating the data");
                        // return h.response({message: "Problem in updating the data"}).code(404);
                      }
                    //   return h.response("Data updated successfully");
    
                }
                catch(err){
                    console.log("error in updating the data");
                    console.log(err);
                }
    
                //return { result: 1 }
                // h({status:200}).code(200)
                
            }
        },
        {
            method : 'DELETE',
            path : '/delete/{id}',
            handler : async function(request,reply ){
                try{
                    let id = request.params.id;
                    // let values = [id];
                    Note.destroy({
                        where: {
                          notes_id: id,
                        }
                      });
    
                      console.log("Data deleted -- soft delete executed successfully");
                      reply.response({message:"Data deleted succesfully",code:200});
                }
                catch(err){
                    console.log(err);
                    console.log("error while deleting the data");
                }
    
            }
        },

        
        
        ])
}