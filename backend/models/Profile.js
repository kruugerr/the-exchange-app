const {DataTypes} = require('sequelize');
const sequalize = require('../config/db');

const Profile = sequalize.define('Profile', {
    profile_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'user_id'
        }
    },
    bio:{
        type: DataTypes.TEXT,   
    },
    profile_picture:{
        type:DataTypes.STRING(255)
    }
},{
    tableName: 'profiles',
    timeStamps: false
});

module.exports = Profile;