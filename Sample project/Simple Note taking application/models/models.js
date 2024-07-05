const {Sequelize,DataTypes, Model,} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/abhinandang')

const HapiPostgresConnection = require('hapi-postgres-connection');

class Note extends Model {}

        Note.init(
            {
              notes_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
              },
              notes_title: {
                type: DataTypes.STRING,
              },
              notes_description: {
                type: DataTypes.TEXT,
              }
            },
            {
              sequelize,
              modelName: 'Note',
              tableName: 'noteTakingApp',
              
            },
          );

          //Note.sync();
module.exports = {
    Note
}
