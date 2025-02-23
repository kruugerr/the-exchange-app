const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ExchangeRequirement = sequelize.define('ExchangeRequirement', {
    exchange_requirement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    exchange_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exchanges',
            key: 'exchange_id'
        }
    },
    requirement_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'requirements',
            key: 'requirement_id'
        }
    }
}, {
    tableName: 'exchange_requirements',
    timestamps: false
});

module.exports = ExchangeRequirement;