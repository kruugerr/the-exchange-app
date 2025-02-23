const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserInterest = sequelize.define('UserInterest', {
    user_interest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    interest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'interests',
            key: 'interest_id'
        }
    }
}, {
    tableName: 'user_interests',
    timestamps: false
});

module.exports = UserInterest;