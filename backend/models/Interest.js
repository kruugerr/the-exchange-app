const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Interest = sequelize.define('Interest', {
    interest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    interest_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'interests',
    timestamps: false
});

module.exports = Interest;
