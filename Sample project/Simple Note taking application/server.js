'use strict';

require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const Hapi = require('hapi');
const { Pool } = require('pg');
const HapiPostgresConnection = require('hapi-postgres-connection');

const init = async () => {
    const server = new Hapi.Server();
    server.connection({
        port: 8000,
        host: 'localhost'
    });

    try {
        const pool = new Pool({
            connectionString: 'postgres://postgres:postgres@localhost:5432/abhinandang'
        });

    }
    catch (err) {
        console.error('Failed to register hapi-postgres-connection plugin:', err);
        return
    }

    // -------- get the details with the specific id -----------
    server.route({
        method: 'GET',
        path: '/{id}',
        handler: async function (request, h) {
            const pool = new Pool({
                connectionString: 'postgres://postgres:postgres@localhost:5432/abhinandang'
            });
            const client = await pool.connect();
            let {id} = request.params;
            //console.log(id);
            const query = 'SELECT * FROM notes where notes_id = $1';
            const values = [id];

            try {
                const result = await client.query(query,values);//, values);
                //console.log(result);
                return h.response(result['rows']).code(200);
            } catch (err) {
                console.log(err);
                return h.response('Internal Server Error').code(500);
            }
        }
    });

    // --------------- get all the note details ------------------

    server.route({
        method: 'GET',
        path: '/all',
        handler: async function (request, h) {
            const pool = new Pool({
                connectionString: 'postgres://postgres:postgres@localhost:5432/abhinandang'
            });
            const client = await pool.connect();
            let {id} = request.params;
            //console.log(id);
            const query = 'SELECT * FROM notes';

            try {
                const result = await client.query(query);//, values);
                //console.log(result);
                return h.response(result['rows']).code(200);
            } catch (err) {
                console.log(err);
                return h.response('Internal Server Error').code(500);
            }
        }
    });

 // ---------------------------- insert new values ------------------------------

    server.route({
        method: 'POST',
        path: '/sender',
        handler: async function (request, h) {
            console.log("inside post route");
            const pool = new Pool({
                connectionString: 'postgres://postgres:postgres@localhost:5432/abhinandang'
            });
    
            const {notes_id , notes_title , notes_description} = request.payload; 
            const query = 'INSERT INTO notes (notes_id, notes_title, notes_description) VALUES ($1, $2, $3)';
            const values = [notes_id, notes_title, notes_description];

            //console.log("The recieved values in the payload are ",values[0]," ",values[1]," ",values[2]);
    
            try {
                const client = await pool.connect();
                const result = await client.query(query, values);
                await client.release();

                console.log("query executed");
    
             return h.response('Data inserted successfully').code(201);
            } catch (err) {
                console.error('Error executing query:', err);
                return h.response('Internal Server Error').code(500);
            }
        }
    });

    // ------------------------------ delete by id ----------------------------------

    server.route({
        method: 'DELETE',
        path: '/delete/{id}',
        handler: async function (request, h) {
            console.log("inside post route");
            const pool = new Pool({
                connectionString: 'postgres://postgres:postgres@localhost:5432/abhinandang'
            });

            let {id} = request.params;
    
            const query = 'DELETE from notes where notes_id = $1';
            const values = [id];

            //console.log("The recieved values in the payload are ",values[0]," ",values[1]," ",values[2]);
    
            try {
                const client = await pool.connect();
                const result = await client.query(query,values);
                await client.release();

                console.log("query executed");
    
             return h.response('Data deleted successfully').code(201);
            } catch (err) {
                console.error('Error executing query:', err);
                return h.response('Internal Server Error').code(500);
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
